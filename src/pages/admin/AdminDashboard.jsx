import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { LogOut, Plus, Edit2, Trash2, Image as ImageIcon, Upload } from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('services');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', shortDescription: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, activeTab));
      const fetchedItems = [];
      querySnapshot.forEach((doc) => {
        fetchedItems.push({ id: doc.id, ...doc.data() });
      });
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  function openModal(item = null) {
    if (item) {
      setEditId(item.id);
      setFormData({ 
        title: item.title || item.author || '', 
        description: item.description || item.text || '', 
        shortDescription: item.shortDescription || item.service || '' 
      });
    } else {
      setEditId(null);
      setFormData({ title: '', description: '', shortDescription: '' });
    }
    setSelectedFile(null);
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);
    
    try {
      let imageUrl = editId ? items.find(i => i.id === editId)?.image : null;

      if (selectedFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('image', selectedFile);
        
        const response = await fetch(`https://api.imgbb.com/1/upload?key=09066887ddd518027024cc3a43b0f356`, {
          method: 'POST',
          body: formDataUpload
        });
        
        const data = await response.json();
        if (data.success) {
          imageUrl = data.data.url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      const itemData = {
        ...formData,
        ...(imageUrl && { image: imageUrl }),
        updatedAt: new Date().toISOString()
      };

      if (editId) {
        await updateDoc(doc(db, activeTab, editId), itemData);
      } else {
        itemData.createdAt = new Date().toISOString();
        await addDoc(collection(db, activeTab), itemData);
      }

      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving document:", error);
      alert("Error saving item. Check console for details.");
    }
    
    setUploading(false);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, activeTab, id));
        fetchData();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  }

  return (
    <div style={{minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '80px'}}>
      {/* Sidebar / Header */}
      <div style={{background: 'rgba(0,0,0,0.5)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
        <div>
          <h2 style={{margin: 0}}>Admin Dashboard</h2>
          <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Logged in as {currentUser?.email}</span>
        </div>
        <button onClick={handleLogout} className="btn btn-outline" style={{padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div style={{display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '2rem', gap: '2rem'}}>
        {/* Navigation */}
        <div style={{width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <button 
            onClick={() => setActiveTab('services')}
            className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-outline'}`}
            style={{textAlign: 'left', justifyContent: 'flex-start'}}
          >
            Manage Services
          </button>
          <button 
            onClick={() => setActiveTab('galleries')}
            className={`btn ${activeTab === 'galleries' ? 'btn-primary' : 'btn-outline'}`}
            style={{textAlign: 'left', justifyContent: 'flex-start'}}
          >
            Manage Galleries
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-outline'}`}
            style={{textAlign: 'left', justifyContent: 'flex-start'}}
          >
            Manage Reviews
          </button>
        </div>

        {/* Content Area */}
        <div style={{flex: 1}} className="glass">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
            <h3 style={{textTransform: 'capitalize', margin: 0}}>{activeTab}</h3>
            <button onClick={() => openModal()} className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Plus size={16} /> Add New
            </button>
          </div>

          <div style={{padding: '0 1.5rem 1.5rem'}}>
            {loading ? (
              <p>Loading data...</p>
            ) : items.length === 0 ? (
              <p style={{color: 'var(--text-secondary)'}}>No items found in {activeTab}.</p>
            ) : (
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                    <th style={{padding: '1rem', color: 'var(--text-secondary)'}}>Image</th>
                    <th style={{padding: '1rem', color: 'var(--text-secondary)'}}>Title/Author</th>
                    <th style={{padding: '1rem', color: 'var(--text-secondary)'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                      <td style={{padding: '1rem'}}>
                        {item.image ? (
                          <img src={item.image} alt={item.title || item.author} style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px'}} />
                        ) : (
                          <div style={{width: '50px', height: '50px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <ImageIcon size={20} color="rgba(255,255,255,0.3)" />
                          </div>
                        )}
                      </td>
                      <td style={{padding: '1rem', fontWeight: 'bold'}}>{item.title || item.author}</td>
                      <td style={{padding: '1rem'}}>
                        <button onClick={() => openModal(item)} style={{background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', marginRight: '1rem'}}>
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer'}}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'}}>
          <div className="glass" style={{width: '100%', maxWidth: '600px', borderRadius: 'var(--radius-lg)', maxHeight: '90vh', overflowY: 'auto'}}>
            <div style={{padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 style={{margin: 0}}>{editId ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h3>
              <button onClick={() => setShowModal(false)} style={{background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.5rem'}}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} style={{padding: '1.5rem'}}>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)'}}>Title / Author Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  style={{width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'white'}}
                />
              </div>
              
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)'}}>Short Description / Subtitle</label>
                <input 
                  type="text" 
                  value={formData.shortDescription}
                  onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                  style={{width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'white'}}
                />
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)'}}>Full Description / Review Text</label>
                <textarea 
                  required
                  rows="5"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  style={{width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'white', fontFamily: 'inherit'}}
                />
              </div>

              <div style={{marginBottom: '2rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)'}}>Upload Media (Image/Video)</label>
                <div style={{position: 'relative'}}>
                  <input 
                    type="file" 
                    accept="image/*,video/*"
                    onChange={e => setSelectedFile(e.target.files[0])}
                    id="admin-file-upload"
                    style={{display: 'none'}}
                  />
                  <label htmlFor="admin-file-upload" className="btn btn-outline" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', cursor: 'pointer'}}>
                    <Upload size={18} /> {selectedFile ? selectedFile.name : 'Choose File from Computer'}
                  </label>
                </div>
              </div>

              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" disabled={uploading} className="btn btn-primary">
                  {uploading ? 'Saving & Uploading...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

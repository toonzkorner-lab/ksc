import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { services } from '../data/services';
import './GalleryDetail.css';

export default function GalleryDetail() {
  const { id } = useParams();
  const service = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return <Navigate to="/galleries" replace />;
  }

  const isVideo = service.image?.endsWith('.quicktime');

  return (
    <div className="gallery-detail-page">
      <div className="page-header">
        <div className="container">
          <Link to="/galleries" className="back-link">
            <ArrowLeft size={20} /> Back to Galleries
          </Link>
          <h1 className="page-title animate-fade-in">{service.title} <span className="text-gradient-accent">Gallery</span></h1>
        </div>
      </div>

      <section className="gallery-detail-content">
        <div className="container">
          <div className="gallery-grid-large">
            {/* Main Showcase Image */}
            <div className="gallery-large-item animate-fade-in glass">
              {isVideo ? (
                <video src={service.image} autoPlay loop muted playsInline className="gallery-large-media" />
              ) : (
                <img src={service.image} alt={service.title} className="gallery-large-media" />
              )}
            </div>
            
            {/* If we had more images for this service, we would map them here */}
            {/* For now, we just display the primary media */}
            <div className="gallery-placeholder-item glass animate-fade-in" style={{animationDelay: '0.1s'}}>
               <div className="placeholder-content">
                 <ImageIcon size={48} className="text-accent mb-4" />
                 <h3>More photos coming soon</h3>
                 <p>We are currently updating our portfolio.</p>
               </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to={`/services/${service.id}`} className="btn btn-primary btn-lg">
              View Service Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

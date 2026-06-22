import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { services } from '../data/services';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="https://landing-page-app-hero-images.s3.amazonaws.com/media/22590a0f-31d5-4ed2-a174-356524fe1863.jpeg" 
            alt="King Services Concrete Logo" 
            style={{ maxHeight: '50px', width: 'auto', borderRadius: '4px' }} 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-desktop">
          <Link to="/" className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
          
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button 
              className="nav-link dropdown-btn"
              onClick={() => {
                setServicesOpen(!servicesOpen);
              }}
            >
              Services <ChevronDown size={16} />
            </button>
            
            <div className={`dropdown-menu ${servicesOpen ? 'dropdown-open' : ''}`}>
              <div className="dropdown-content glass">
                {services.map(service => (
                  <Link 
                    key={service.id} 
                    to={service.path} 
                    className="dropdown-item"
                    onClick={() => {
                      setServicesOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/about" className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link>
          <Link to="/galleries" className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Galleries</Link>
          <Link to="/reviews" className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Reviews</Link>
          
          <div className="nav-cta-group ml-auto" style={{display: 'flex', gap: '0.5rem'}}>
            <a href="sms:18303966535" className="btn btn-outline">
              Text Us Now
            </a>
            <a href="tel:18303966535" className="btn btn-primary">
              Call Us Now
            </a>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="navbar-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`navbar-mobile ${isOpen ? 'mobile-open' : ''} glass`}>
        <div className="mobile-nav-content">
          <Link to="/" className="mobile-nav-link" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Home
          </Link>
          <div className="mobile-nav-item">
            <button 
              className="mobile-nav-link dropdown-toggle"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              Services <ChevronDown size={20} className={mobileServicesOpen ? 'rotate-180' : ''} />
            </button>
            {mobileServicesOpen && (
              <div className="mobile-dropdown-content">
                {services.map(service => (
                  <Link 
                    key={service.id} 
                    to={service.path} 
                    className="mobile-dropdown-item"
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/about" className="mobile-nav-link" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>About</Link>
          <Link to="/galleries" className="mobile-nav-link" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Galleries</Link>
          <Link to="/reviews" className="mobile-nav-link" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Reviews</Link>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem'}}>
            <a href="sms:18303966535" className="btn btn-outline" style={{width: '100%'}}>Text Us Now</a>
            <a href="tel:18303966535" className="btn btn-primary" style={{width: '100%'}}>Call Us Now</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

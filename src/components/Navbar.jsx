import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { services } from '../data/services';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          KING<span>SERVICES</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-desktop">
          <Link to="/" className="nav-link">Home</Link>
          
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button 
              className="nav-link nav-dropdown-btn"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services <ChevronDown size={16} />
            </button>
            
            <div className={`dropdown-menu glass ${servicesOpen ? 'dropdown-open' : ''}`}>
              <div className="dropdown-content">
                {services.map(service => (
                  <Link 
                    key={service.id} 
                    to={service.path}
                    className="dropdown-item"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/about" className="nav-link">About</Link>
          <Link to="/galleries" className="nav-link">Galleries</Link>
          <Link to="/reviews" className="nav-link">Reviews</Link>
          
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
      <div className={`navbar-mobile glass ${isOpen ? 'mobile-open' : ''}`}>
        <div className="mobile-nav-content">
          <Link to="/" className="mobile-nav-link">Home</Link>
          <div className="mobile-nav-dropdown">
            <button className="mobile-nav-link dropdown-toggle" onClick={() => setServicesOpen(!servicesOpen)}>
              Services <ChevronDown size={20} className={servicesOpen ? 'rotate-180' : ''} />
            </button>
            {servicesOpen && (
              <div className="mobile-dropdown-content">
                {services.map(service => (
                  <Link key={service.id} to={service.path} className="mobile-dropdown-item">
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/about" className="mobile-nav-link">About</Link>
          <Link to="/galleries" className="mobile-nav-link">Galleries</Link>
          <Link to="/reviews" className="mobile-nav-link">Reviews</Link>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem'}}>
            <a href="sms:18303966535" className="btn btn-outline" style={{width: '100%'}}>Text Us Now</a>
            <a href="tel:18303966535" className="btn btn-primary" style={{width: '100%'}}>Call Us Now</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

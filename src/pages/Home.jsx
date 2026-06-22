import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Phone, Mail, MapPin } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {/* We can use one of the scraped hero images as a background. */}
        <div className="hero-background" style={{backgroundImage: `url('https://landing-page-app-hero-images.s3.amazonaws.com/media/22590a0f-31d5-4ed2-a174-356524fe1863.jpeg')`}}></div>
        <div className="hero-overlay"></div>
        <div className="container hero-container animate-fade-in">
          <h1 className="hero-title">
            King Services <br />
            <span className="text-gradient-accent">Concrete & Construction</span>
          </h1>
          <p className="hero-subtitle">
            Premier concrete, construction, and landscaping solutions in Seguin, TX. Experience unmatched craftsmanship and operational excellence from the ground up.
          </p>
          <div className="hero-cta">
            <a href="sms:18303966535" className="btn btn-outline btn-lg" style={{backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'var(--text-primary)', color: 'var(--text-primary)'}}>
              Text Us Now
            </a>
            <a href="tel:18303966535" className="btn btn-primary btn-lg">
              Call Us Now
            </a>
            <Link to="/services" className="btn btn-outline btn-lg">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features bg-surface">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item glass">
              <div className="feature-icon"><Star size={32} /></div>
              <h3>Uncompromising Quality</h3>
              <p>We source premium materials and employ proven industry techniques to guarantee superior, lasting results on every project.</p>
            </div>
            <div className="feature-item glass">
              <div className="feature-icon"><Shield size={32} /></div>
              <h3>Trusted Reliability</h3>
              <p>Fully licensed and committed to transparency, we operate with the highest standards of safety and professionalism.</p>
            </div>
            <div className="feature-item glass">
              <div className="feature-icon"><Clock size={32} /></div>
              <h3>Efficient Execution</h3>
              <p>Your time is valuable. We minimize disruptions and maximize productivity to deliver projects flawlessly on schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="services-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our <span className="text-gradient">Core Services</span></h2>
            <p className="section-desc">Comprehensive structural and logistical solutions engineered for success.</p>
          </div>
          
          <div className="services-grid">
            {services.slice(0, 6).map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-outline btn-lg">
              View All Capabilities <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box glass">
            <h2>Ready to initiate your next project?</h2>
            <p>Connect with our specialists today for a comprehensive consultation and transparent estimate.</p>
            
            <div className="cta-contact-info mt-6">
              <div className="contact-item">
                <Phone size={24} className="text-accent" />
                <a href="tel:18303966535">(830) 396-6535</a>
              </div>
              <div className="contact-item">
                <Mail size={24} className="text-accent" />
                <a href="mailto:kingservices830@gmail.com">kingservices830@gmail.com</a>
              </div>
              <div className="contact-item">
                <MapPin size={24} className="text-accent" />
                <span>500 SH-46 South, Seguin, TX 78155</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

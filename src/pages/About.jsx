import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import './About.css';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="about-header">
        <div className="container">
          <h1 className="animate-fade-in">About <span className="text-gradient-accent">King Services</span></h1>
          <p className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            Your trusted partner for premium concrete, construction, and landscaping in Seguin, TX.
          </p>
        </div>
      </div>

      <section className="about-content-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text-content animate-fade-in">
              <h2>Our Story & Commitment</h2>
              <p>
                Based in the heart of Seguin, TX, King Services has grown into a premier construction and logistics firm dedicated to transforming residential and commercial properties. We specialize in high-end concrete construction, robust metal buildings, and comprehensive material transport.
              </p>
              <p>
                Driven by a commitment to excellence and our community, our highly skilled team approaches every project with meticulous attention to detail. We pride ourselves on operating with the highest standards of safety, transparency, and professionalism. Whether you are a homeowner looking to enhance your property's value or a local contractor in need of reliable equipment and labor, we have the resources to ensure your project's success.
              </p>
              
              <ul className="mt-6" style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 className="text-accent" size={20} /> Licensed & Insured Professionals
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 className="text-accent" size={20} /> Premium Materials & Craftsmanship
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 className="text-accent" size={20} /> On-Time & On-Budget Delivery
                </li>
              </ul>
            </div>
            
            <div className="about-image-container animate-fade-in" style={{animationDelay: '0.2s'}}>
              <img 
                src="https://landing-page-app-hero-images.s3.amazonaws.com/media/22590a0f-31d5-4ed2-a174-356524fe1863.jpeg" 
                alt="King Services Team at Work" 
                className="about-image"
              />
              <div className="about-image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <h3>Our Mission</h3>
              <p>To provide an all-encompassing suite of top-tier construction and logistical services that empower our clients to build stronger, more beautiful, and highly functional spaces. We strive to be the most reliable and efficient partner in the industry.</p>
            </div>
            <div className="mv-card">
              <h3>Our Vision</h3>
              <p>To set the standard for construction excellence in South Texas by continuously innovating our practices, investing in our people, and delivering unparalleled value and satisfaction to every client we serve.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-primary btn-lg">
              Explore Our Capabilities <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

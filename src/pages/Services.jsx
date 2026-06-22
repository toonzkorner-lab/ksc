import { useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import './Services.css';

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">Our <span className="text-gradient-accent">Services</span></h1>
          <p className="page-subtitle animate-fade-in" style={{animationDelay: '0.1s'}}>
            Comprehensive solutions tailored to your needs. From foundational concrete work to finishing touches.
          </p>
        </div>
      </div>

      <section className="services-content">
        <div className="container">
          <div className="services-grid-full">
            {services.map((service, index) => (
              <div key={service.id} className="animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-box glass">
            <h2>Not sure what you need?</h2>
            <p>Give us a call and we'll help you figure out the best solution for your property.</p>
            <a href="tel:555-555-5555" className="btn btn-primary btn-lg mt-6">
              Contact Us Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

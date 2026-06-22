import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { services } from '../data/services';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // To properly handle rendering quicktime as video or image
  const isVideo = service.image?.endsWith('.quicktime');

  return (
    <div className="service-detail-page">
      <div className="service-detail-header">
        <div className="container">
          <Link to="/services" className="back-link">
            <ArrowLeft size={20} /> Back to Services
          </Link>
          <h1 className="animate-fade-in">{service.title}</h1>
        </div>
      </div>

      <section className="service-detail-content">
        <div className="container">
          <div className="service-detail-grid">
            <div className="service-main-info animate-fade-in">
              <div className="service-image-large">
                {isVideo ? (
                  <video 
                    src={service.image} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="service-media"
                  />
                ) : (
                  <img src={service.image} alt={service.title} className="service-media" />
                )}
              </div>
              <div className="service-description-box glass mt-8">
                <h2>About This Service</h2>
                <p className="service-full-description">
                  {service.description}
                </p>
                <div className="service-benefits mt-6">
                  <h3>Why Choose King Services?</h3>
                  <ul className="benefits-list">
                    <li><CheckCircle2 className="text-accent" size={20} /> Professional and reliable execution.</li>
                    <li><CheckCircle2 className="text-accent" size={20} /> Use of premium materials and equipment.</li>
                    <li><CheckCircle2 className="text-accent" size={20} /> Commitment to complete customer satisfaction.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="service-sidebar animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="sidebar-contact glass">
                <h3>Need {service.title}?</h3>
                <p>Contact us today to get a free estimate and discuss your project details.</p>
                
                <div className="sidebar-cta-group mt-6">
                  <a href="tel:18303966535" className="btn btn-primary btn-block">
                    Call Us Now
                  </a>
                  <a href="sms:18303966535" className="btn btn-outline btn-block mt-4">
                    Text Us Now
                  </a>
                </div>
              </div>

              <div className="sidebar-more-services mt-8 glass">
                <h3>Other Services</h3>
                <ul className="more-services-list">
                  {services.filter(s => s.id !== id).slice(0, 5).map(s => (
                    <li key={s.id}>
                      <Link to={s.path}>{s.title}</Link>
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="view-all-link mt-4">View All Services <ArrowLeft size={16} style={{transform: 'rotate(180deg)'}} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import './ServiceCard.css';

export default function ServiceCard({ service }) {
  const IconComponent = Icons[service.icon] || Icons.Wrench;

  return (
    <Link to={service.path} className="service-card glass animate-fade-in">
      <div className="service-icon-wrapper">
        <IconComponent size={32} className="service-icon" />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.description}</p>
      <div className="service-link-text">
        Learn more <Icons.ArrowRight size={16} className="service-arrow" />
      </div>
    </Link>
  );
}

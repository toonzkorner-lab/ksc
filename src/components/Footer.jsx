import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { services } from '../data/services';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & About */}
          <div className="footer-col">
            <Link to="/" className="footer-logo">
              KING<span>SERVICES</span>
            </Link>
            <p className="footer-desc">
              Premier concrete and construction company in Seguin, TX. Delivering exceptional and reliable services for all your commercial and residential needs.
            </p>
            <div className="social-links">
              {/* Removed Facebook icon due to lucide-react brand icon removal */}
              <a href="https://www.facebook.com/193403997718136" target="_blank" rel="noreferrer" className="social-icon text-sm font-bold">
                FB
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              {services.slice(0, 6).map(service => (
                <li key={service.id}>
                  <Link to={service.path}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">More Services</h3>
            <ul className="footer-links">
              {services.slice(6).map(service => (
                <li key={service.id}>
                  <Link to={service.path}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="contact-info">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>500 SH-46 South<br />Seguin, TX 78155</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <a href="tel:18303966535">(830) 396-6535</a>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <a href="mailto:kingservices830@gmail.com">kingservices830@gmail.com</a>
              </li>
              <li>
                <Clock size={18} className="contact-icon" />
                <span>Mon-Fri: 8am - 6pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} King Services. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="https://tlp-legal.s3.us-east-2.amazonaws.com/Customer+Privacy+Policy+-+20260513.html" target="_blank" rel="noreferrer">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

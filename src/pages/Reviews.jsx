import { useEffect } from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../data/reviews';
import './Reviews.css';

export default function Reviews() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="reviews-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">Customer <span className="text-gradient-accent">Reviews</span></h1>
          <p className="page-subtitle animate-fade-in" style={{animationDelay: '0.1s'}}>
            See what our clients have to say about working with King Services Concrete.
          </p>
        </div>
      </div>

      <section className="reviews-content">
        <div className="container">
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card glass animate-fade-in" style={{animationDelay: `${(index % 4) * 0.1}s`}}>
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} className="star-icon" fill="currentColor" />
                  ))}
                </div>
                <blockquote className="review-text">
                  "{review.text}"
                </blockquote>
                <div className="review-footer">
                  <div className="review-author">{review.author}</div>
                  {review.service && (
                    <div className="review-service">{review.service}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

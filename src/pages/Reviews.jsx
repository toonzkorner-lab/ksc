import { useState, useEffect } from 'react';
import { Star, Upload, Image as ImageIcon, X } from 'lucide-react';
import { reviews as initialReviews } from '../data/reviews';
import './Reviews.css';

export default function Reviews() {
  const [reviewList, setReviewList] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Create an object URL to preview the image
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      author: name,
      rating: rating,
      text: text,
      image: selectedImage
    };
    
    // Prepend the new review so it appears at the top
    setReviewList([newReview, ...reviewList]);
    setIsSubmitted(true);
    
    // Reset form
    setName('');
    setRating(5);
    setText('');
    setSelectedImage(null);
    
    // Hide form after a few seconds
    setTimeout(() => {
      setShowForm(false);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="reviews-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">Customer <span className="text-gradient-accent">Reviews</span></h1>
          <p className="page-subtitle animate-fade-in" style={{animationDelay: '0.1s'}}>
            See what our clients have to say about working with King Services Concrete.
          </p>
          <button 
            className="btn btn-primary mt-6 animate-fade-in" 
            style={{animationDelay: '0.2s'}}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Leave a Review'}
          </button>
        </div>
      </div>

      <section className="reviews-content">
        <div className="container">
          
          {showForm && (
            <div className="review-form-container glass animate-fade-in mb-12">
              {isSubmitted ? (
                <div className="text-center p-8">
                  <h3 className="text-accent mb-4">Thank You!</h3>
                  <p>Your review has been successfully submitted and added to our page.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="review-form">
                  <h3 className="mb-6">Share Your Experience</h3>
                  
                  <div className="form-group">
                    <label>Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John D."
                      className="form-control"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Rating</label>
                    <div className="rating-selector">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          size={28}
                          className={`cursor-pointer ${star <= (hoverRating || rating) ? 'text-accent' : 'text-gray'}`}
                          fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Review</label>
                    <textarea 
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows="4" 
                      placeholder="Tell us about your project and your experience..."
                      className="form-control"
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label>Upload a Photo of Your Project (Optional)</label>
                    <div className="file-upload-wrapper">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        id="review-image-upload"
                        className="file-input-hidden"
                      />
                      <label htmlFor="review-image-upload" className="btn btn-outline btn-block file-upload-btn">
                        <Upload size={18} className="mr-2" style={{marginRight: '8px'}} /> Choose Image
                      </label>
                    </div>
                    
                    {selectedImage && (
                      <div className="image-preview mt-4">
                        <img src={selectedImage} alt="Preview" className="preview-img" />
                        <button 
                          type="button" 
                          className="btn-remove-image"
                          onClick={() => setSelectedImage(null)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-block mt-4">Submit Review</button>
                </form>
              )}
            </div>
          )}

          <div className="reviews-grid">
            {reviewList.map((review, index) => (
              <div key={index} className="review-card glass animate-fade-in" style={{animationDelay: `${(index % 4) * 0.1}s`}}>
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} className="star-icon" fill="currentColor" />
                  ))}
                </div>
                <blockquote className="review-text">
                  "{review.text}"
                </blockquote>
                
                {review.image && (
                  <div className="review-image-container mb-4">
                    <img src={review.image} alt="Project completed by King Services" className="review-project-img" />
                  </div>
                )}
                
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

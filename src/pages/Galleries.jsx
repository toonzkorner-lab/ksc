import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, ArrowRight } from 'lucide-react';
import './Galleries.css';

export default function Galleries() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleries = [
    { id: 'concrete-construction', title: 'Concrete Construction', image: 'https://d3p2r6ofnvoe67.cloudfront.net/fit-in/800x800/filters:format(jpg)/filters:strip_exif()/filters:no_upscale()/media/bb3c867c-5b8b-44b9-8e85-62c1d9b75bca.quicktime' },
    { id: 'metal-buildings', title: 'Metal Buildings', image: 'https://d3p2r6ofnvoe67.cloudfront.net/fit-in/800x800/filters:format(jpg)/filters:strip_exif()/filters:no_upscale()/media/4e424c73-b222-404b-8099-2f08de463601.jpeg' },
    { id: 'lawn-landscaping', title: 'Lawn & Landscaping', image: 'https://landing-page-app-hero-images.s3.amazonaws.com/media/71d6c24b-e72d-470b-911f-268807de8a22.jpeg' },
    { id: 'trucking', title: 'Trucking & Hauling', image: 'https://d3p2r6ofnvoe67.cloudfront.net/fit-in/800x800/filters:format(jpg)/filters:strip_exif()/filters:no_upscale()/media/6936c4ff-b855-4b2b-b042-83463a75dbfd.quicktime' },
    { id: 'masonry', title: 'Masonry', image: 'https://d3p2r6ofnvoe67.cloudfront.net/fit-in/800x800/filters:format(jpg)/filters:strip_exif()/filters:no_upscale()/media/462bbcad-0807-4ddc-9062-7a23bf02ab4f.jpeg' },
    { id: 'picnic-tables', title: 'Picnic Tables & Woodwork', image: 'https://d3p2r6ofnvoe67.cloudfront.net/fit-in/800x800/filters:format(jpg)/filters:strip_exif()/filters:no_upscale()/media/59f0bbfb-816b-4a66-8959-f51284a36300.jpg' },
    { id: 'totes-barrels', title: 'Totes & Barrels', image: 'https://d3p2r6ofnvoe67.cloudfront.net/fit-in/800x800/filters:format(jpg)/filters:strip_exif()/filters:no_upscale()/media/3c8084b3-804f-4e72-87cb-eab6995af137.quicktime' }
  ];

  return (
    <div className="galleries-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">Our <span className="text-gradient-accent">Work</span></h1>
          <p className="page-subtitle animate-fade-in" style={{animationDelay: '0.1s'}}>
            Take a look at some of our recent projects and see the quality of our work firsthand.
          </p>
        </div>
      </div>

      <section className="galleries-content">
        <div className="container">
          <div className="galleries-grid">
            {galleries.map((gallery, index) => (
              <div key={gallery.id} className="gallery-card glass animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="gallery-image-wrapper">
                  <img src={gallery.image} alt={gallery.title} className="gallery-image" />
                  <div className="gallery-overlay">
                    <Image size={48} className="gallery-icon" />
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>{gallery.title}</h3>
                  <Link to={`/galleries/${gallery.id}`} className="gallery-link">
                    View Gallery <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

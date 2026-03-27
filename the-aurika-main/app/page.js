'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThreeDJewelry from '@/components/ThreeDJewelry';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?featured=true&limit=4');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="dot"></span>
              Find Your Spark
            </div>
            <h1 className="hero-title">
              Discover the <br/> <span className="accent">Art of Elegance</span>
            </h1>
            <p className="hero-subtitle">
              Meticulously handcrafted contemporary and classical jewelry. Every piece tells a story of unparalleled craftsmanship and timeless luxury.
            </p>
            <div className="hero-cta-group">
              <Link href="/products" className="btn-primary">
                Explore Collection
              </Link>
              <Link href="/about" className="btn-outline">
                Our Story
              </Link>
            </div>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-floating-card card-1">
              <div className="card-label">Bestseller</div>
              <div className="card-value">22K <small>Gold</small></div>
            </div>
            
            <div className="hero-image-frame">
              {/* Using 3D Model here! */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, mixBlendMode: 'screen' }}>
                 <ThreeDJewelry type="ring" />
              </div>
              <img src="/images/hero_jewelry.png" alt="THE AURIKA Luxury Jewelry" />
            </div>
            
            <div className="hero-floating-card card-2">
              <div className="card-label">Since</div>
              <div className="card-value">2025</div>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-section">
        <div className="marquee-track">
          {[...Array(10)].map((_, i) => (
            <div className="marquee-item" key={i}>
              <span>FIND YOUR SPARK</span>
              <div className="divider"></div>
              <span>THE AURIKA</span>
              <div className="divider"></div>
              <span>LUXURY REDEFINED</span>
              <div className="divider"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Curated Selects</div>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          
          <div className="categories-grid">
            <Link href="/products?category=Necklaces" className="category-card">
              <img src="/images/gold_necklace.png" alt="Necklaces" />
              <div className="category-card-content">
                <h3>Necklaces</h3>
                <p>Timeless Elegance</p>
              </div>
            </Link>
            <Link href="/products?category=Rings" className="category-card">
              <img src="/images/diamond_ring.png" alt="Rings" />
              <div className="category-card-content">
                <h3>Rings</h3>
                <p>Eternal Promise</p>
              </div>
            </Link>
            <Link href="/products?category=Earrings" className="category-card">
              <img src="/images/gold_earrings.png" alt="Earrings" />
              <div className="category-card-content">
                <h3>Earrings</h3>
                <p>Delicate Grace</p>
              </div>
            </Link>
            <Link href="/products?category=Sets" className="category-card">
              <img src="/images/pendant_set.png" alt="Sets" />
              <div className="category-card-content">
                <h3>Bridal Sets</h3>
                <p>Royal Heritage</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-banner">
        <div className="featured-banner-inner">
          <div className="featured-banner-image" style={{ position: 'relative' }}>
             {/* Another 3D component */}
             <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
               <ThreeDJewelry type="diamond" />
             </div>
          </div>
          <div className="featured-banner-content">
            <div className="section-label" style={{ color: 'var(--gold-light)' }}>The Masterpiece</div>
            <h2>Uncompromising Quality & Craftsmanship</h2>
            <p>
              At THE AURIKA, we source only the finest ethically mined diamonds, pearls, and precious metals. Every creation is born from a meticulous design process, ensuring each detail reflects our commitment to perfection and your extraordinary moments.
            </p>
            <div className="featured-stats">
              <div className="featured-stat">
                <div className="stat-number">22K</div>
                <div className="stat-label">Purity Gold</div>
              </div>
              <div className="featured-stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Ethical Gems</div>
              </div>
              <div className="featured-stat">
                <div className="stat-number">Life</div>
                <div className="stat-label">Time Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Signature Pieces</div>
            <h2 className="section-title">New & Trending</h2>
            <p className="section-subtitle">Discover our most adored designs that capture the essence of modern luxury blended with classical heritage.</p>
          </div>
          
          <div className="products-grid">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="product-card skeleton" style={{ height: '400px' }}></div>
              ))
            ) : (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-card-image">
                    {product.newArrival && (
                      <div className="product-card-badges">
                        <span className="product-badge new">New</span>
                      </div>
                    )}
                    <Link href={`/products/${product.slug}`}>
                      <img src={product.images[0]} alt={product.name} />
                    </Link>
                    <div className="product-card-actions">
                      <button className="product-action-btn" title="Add to Wishlist">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="product-card-body">
                    <div className="product-card-category">{product.category}</div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="product-card-name" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{product.name}</h3>
                    </Link>
                    <div className="product-card-rating">
                      <div className="stars">{'★'.repeat(Math.floor(product.rating))}</div>
                      <span className="review-count">({product.reviewCount})</span>
                    </div>
                    <div className="product-card-price">
                      <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.comparePrice > product.price && (
                        <span className="price-compare">₹{product.comparePrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                  <div className="product-card-footer">
                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/products" className="btn-outline">View Entire Collection</Link>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Legacy</div>
            <h2 className="section-title">Client Stories</h2>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Finding my spark was easy with THE AURIKA. The diamond ring I purchased is an absolute masterpiece. The craftsmanship and brilliance are unparalleled. Customer service was incredibly helpful throughout."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">A</div>
                <div className="testimonial-info">
                  <div className="name">Ananya Sharma</div>
                  <div className="location">New Delhi</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "I ordered the Royal Heritage Necklace for my wedding. The piece looks exactly as pictured, if not better. It feels heavy, royal, and completely authentic. Will definitively shop here again."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">R</div>
                <div className="testimonial-info">
                  <div className="name">Rhea Kapoor</div>
                  <div className="location">Mumbai</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The pearl drop earrings I bought are my new everyday luxury. The packaging was beautiful and making the payment process seamless. THE AURIKA truly knows how to make jewelry feel premium."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">P</div>
                <div className="testimonial-info">
                  <div className="name">Priya Patel</div>
                  <div className="location">Dehradun</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section section">
        <div className="container">
          <div className="newsletter-inner">
            <h2>Join the Inner Circle</h2>
            <p>Subscribe to our newsletter for exclusive early access to new collections, special private events, and styling inspiration.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

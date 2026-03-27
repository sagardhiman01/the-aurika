'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <Link href="/" className="nav-logo">
            <div className="nav-logo-text">
              <span style={{textAlign: 'center', marginBottom: '2px'}}>THE</span>
              AURIKA
            </div>
          </Link>
          
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products?category=Necklaces">Necklaces</Link></li>
            <li><Link href="/products?category=Rings">Rings</Link></li>
            <li><Link href="/products?category=Earrings">Earrings</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          
          <div className="nav-actions">
            {user ? (
              <div style={{ position: 'relative', display: 'flex', gap: '10px' }}>
                <Link href="/account" className="nav-action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="nav-action-btn" title="Admin Panel">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="12" y1="3" x2="12" y2="21"></line>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                    </svg>
                  </Link>
                )}
                <button onClick={logout} className="nav-action-btn" title="Logout">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </div>
            ) : (
              <Link href="/login" className="nav-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            )}
            
            <button className="nav-action-btn" onClick={() => setIsOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-header">
          <div className="nav-logo-text" style={{ fontSize: '1.2rem' }}>
            <span style={{textAlign: 'left', marginBottom: '2px', fontSize: '0.6rem'}}>THE</span>
            AURIKA
          </div>
          <button className="cart-close" onClick={() => setMobileMenuOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li><Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
          <li><Link href="/products?category=Necklaces" onClick={() => setMobileMenuOpen(false)}>Necklaces</Link></li>
          <li><Link href="/products?category=Rings" onClick={() => setMobileMenuOpen(false)}>Rings</Link></li>
          <li><Link href="/products?category=Earrings" onClick={() => setMobileMenuOpen(false)}>Earrings</Link></li>
          <li><Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link></li>
          <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </>
  );
}

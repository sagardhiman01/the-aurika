import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>THE AURIKA</h3>
          <p>
            Find Your Spark. Elevating everyday luxury with meticulously handcrafted jewelry 
            that celebrates life's most precious moments.
          </p>
          <div className="footer-social">
            <a href="https://instagram.com/the_aurika_" target="_blank" rel="noopener noreferrer">Ig</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Fb</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Pt</a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link href="/products?newArrival=true">New Arrivals</Link></li>
            <li><Link href="/products?category=Necklaces">Necklaces & Pendants</Link></li>
            <li><Link href="/products?category=Rings">Rings & Bands</Link></li>
            <li><Link href="/products?category=Earrings">Earrings</Link></li>
            <li><Link href="/products?category=Bracelets">Bracelets & Cuffs</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/sustainability">Sustainability</Link></li>
            <li><Link href="/stores">Find a Store</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/shipping">Shipping & Returns</Link></li>
            <li><Link href="/care">Jewelry Care</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} THE AURIKA. All rights reserved. 28, Indira Nagar Colony Rd, Vasant Vihar, Indra Nagar Colony, Dehradun, Uttarakhand 248006</p>
        <div className="footer-payment">
          <span>Razorpay</span>
          <span>Visa</span>
          <span>Mastercard</span>
          <span>UPI</span>
        </div>
      </div>
    </footer>
  );
}

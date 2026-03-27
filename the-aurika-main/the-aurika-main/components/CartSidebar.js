'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartSidebar() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart ({cart.reduce((a, c) => a + c.quantity, 0)})</h3>
          <button className="cart-close" onClick={() => setIsOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">✨</div>
              <h4>Your cart is empty</h4>
              <p>Discover our beautiful collection and find your spark.</p>
              <button 
                className="btn-outline" 
                style={{marginTop: '1.5rem'}}
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.name} />
                  ) : (
                    <div style={{width:'100%', height:'100%', backgroundColor:'#eee'}}></div>
                  )}
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <div className="item-price">₹{item.price.toLocaleString('en-IN')}</div>
                  <div className="cart-item-quantity">
                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item._id)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="label">Subtotal</span>
              <span className="amount">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <p style={{fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '1rem'}}>
              Shipping and taxes calculated at checkout.
            </p>
            <Link href="/checkout" onClick={() => setIsOpen(false)} style={{display: 'block'}}>
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

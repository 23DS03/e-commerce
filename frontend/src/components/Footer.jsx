import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-content">
      <div className="footer-brand">
        <Link to="/" className="footer-logo">ShopZone</Link>
        <p>Everyday shopping, made simple.</p>
        <p className="footer-payment">Secure checkout with Razorpay</p>
      </div>

      <nav className="footer-column" aria-label="Shop">
        <h2>Shop</h2>
        <Link to="/shop">Browse products</Link>
        <Link to="/cart">Shopping cart</Link>
        <Link to="/profile">My account &amp; orders</Link>
      </nav>

      <nav className="footer-column" aria-label="Customer service">
        <h2>Customer service</h2>
        <Link to="/faq">FAQs</Link>
        <Link to="/support">Contact support</Link>
        <Link to="/return">Returns &amp; refunds</Link>
      </nav>

      <nav className="footer-column" aria-label="About ShopZone">
        <h2>About</h2>
        <Link to="/about">About us</Link>
        <Link to="/disclaimer">Disclaimer</Link>
      </nav>
    </div>

    <div className="footer-bottom">
      <span>&copy; {new Date().getFullYear()} ShopZone. All rights reserved.</span>
      <div className="footer-contact">
        <a href="mailto:shopzone@gmail.com">shopzone@gmail.com</a>
        <a href="tel:+918989154798">+91 89891 54798</a>
      </div>
    </div>
  </footer>
);

export default Footer;

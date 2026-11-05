import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/support.css';

const CustomerSupport = () => (
  <main className="help-page support-page">
    <header className="help-header">
      <p className="help-eyebrow">SHOPZONE CUSTOMER CARE</p>
      <h1>How can we help?</h1>
      <p>Reach out to us or find the right place to manage your order.</p>
    </header>

    <section className="support-options" aria-label="Customer support options">
      <article className="support-card">
        <span className="support-icon" aria-hidden="true">@</span>
        <h2>Email support</h2>
        <p>For order or payment questions, include your order ID and a short description of the issue.</p>
        <a className="support-action" href="mailto:shopzone@gmail.com?subject=ShopZone%20Customer%20Support">
          shopzone@gmail.com
        </a>
      </article>

      <article className="support-card">
        <span className="support-icon" aria-hidden="true">☎</span>
        <h2>Call us</h2>
        <p>Call our customer-support number for help with your shopping or order.</p>
        <a className="support-action" href="tel:+918989154798">+91 89891 54798</a>
      </article>

      <article className="support-card">
        <span className="support-icon" aria-hidden="true">▤</span>
        <h2>Order history</h2>
        <p>Sign in to review your orders and the latest status available for each one.</p>
        <Link className="support-action" to="/profile">View my orders</Link>
      </article>

      <article className="support-card">
        <span className="support-icon" aria-hidden="true">?</span>
        <h2>Quick answers</h2>
        <p>Find help with checkout, payments, delivery and returns in our FAQs.</p>
        <Link className="support-action" to="/faq">Browse FAQs</Link>
      </article>
    </section>

    <p className="help-callout">
      Looking to shop? <Link to="/shop">Browse all products</Link>.
    </p>
  </main>
);

export default CustomerSupport;

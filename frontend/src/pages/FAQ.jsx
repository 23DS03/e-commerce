import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/support.css';

const questions = [
  {
    question: 'How do I place an order?',
    answer: 'Browse products, add the items you want to your cart, then sign in and complete checkout with your shipping address and payment.'
  },
  {
    question: 'Do I need an account to check out?',
    answer: 'Yes. Sign in or create an account before placing an order.'
  },
  {
    question: 'How can I check my order status?',
    answer: 'Sign in and open My account & orders to view your order history and the status shown for each order.',
    link: { to: '/profile', label: 'View my orders' }
  },
  {
    question: 'Which payment method can I use?',
    answer: 'Checkout uses Razorpay. If a payment fails, try again. If you were charged but do not see a completed order, contact customer support with your payment and order details.'
  },
  {
    question: 'Where can I find the return and refund details?',
    answer: 'Please review the Returns & Refunds policy for eligibility and refund information.',
    link: { to: '/return', label: 'Read the return policy' }
  },
  {
    question: 'How long will delivery take?',
    answer: 'Delivery timelines are not currently listed on the website. Contact support with your order details for help.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'Email shopzone@gmail.com and include your order ID when asking about an existing order.',
    link: { href: 'mailto:shopzone@gmail.com', label: 'Email customer support' }
  }
];

const FAQ = () => (
  <main className="help-page">
    <header className="help-header">
      <p className="help-eyebrow">WE’RE HERE TO HELP</p>
      <h1>Frequently asked questions</h1>
      <p>Quick answers about shopping, payments, orders and returns.</p>
    </header>

    <section className="faq-list" aria-label="Frequently asked questions">
      {questions.map(({ question, answer, link }) => (
        <details className="faq-item" key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
          {link && (link.to
            ? <Link to={link.to}>{link.label}</Link>
            : <a href={link.href}>{link.label}</a>)}
        </details>
      ))}
    </section>

    <p className="help-callout">
      Still need help? <Link to="/support">Contact customer support</Link>.
    </p>
  </main>
);

export default FAQ;

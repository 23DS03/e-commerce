import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { apiUrl } from '../api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(apiUrl('/api/products'));
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-banner">
        <div className="hero-copy">
          <span className="hero-eyebrow">YOUR EVERYDAY SHOPPING, REIMAGINED</span>
          <h1>Welcome to <span>ShopZone</span></h1>
          <p>Discover the best products at unbeatable prices.</p>
          <Link to="/shop" className="btn hero-cta">Explore the shop</Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <svg viewBox="0 0 320 280" role="presentation">
            <defs>
              <linearGradient id="cartGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#45e0c1" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <circle cx="166" cy="138" r="118" fill="rgba(69,224,193,0.08)" />
            <path d="M56 59h28l23 128h126l27-91H96" fill="none" stroke="url(#cartGradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115 153h128" stroke="url(#cartGradient)" strokeWidth="9" strokeLinecap="round" />
            <circle cx="130" cy="218" r="13" fill="#45e0c1" />
            <circle cx="220" cy="218" r="13" fill="#38bdf8" />
            <path d="M137 111h27V83h29v28h27v28h-27v28h-29v-28h-27z" fill="#f4f7fb" opacity=".94" />
          </svg>
        </div>
      </div>
      <h2>Featured Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
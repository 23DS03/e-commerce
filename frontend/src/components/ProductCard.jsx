import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/product.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <p className="product-category">{product.category} · {product.gender || 'Unisex'}</p>
        <h3>{product.name}</h3>
        <div className="product-pricing">
          <p className="price">₹{Number(product.price).toFixed(2)}</p>
          {product.discountPercentage > 0 && (
            <>
              <p className="original-price">₹{Number(product.originalPrice ?? product.price).toFixed(2)}</p>
              <span className="discount-badge">{product.discountPercentage}% OFF</span>
            </>
          )}
        </div>
        <Link to={`/product/${product._id}`} className="btn">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;
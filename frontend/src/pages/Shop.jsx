import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { apiUrl } from '../api';
import '../styles/product.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(apiUrl('/api/products'));
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Could not load products.');
        }
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError('Products could not be loaded. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))].sort();
  const [category, setCategory] = useState('All categories');
  const [gender, setGender] = useState('All');
  const filteredProducts = products.filter((product) => (
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All categories' || product.category === category) &&
    (gender === 'All' || (product.gender || 'Unisex') === gender)
  ));

  return (
    <div className="shop-container">
      <h2>All Products</h2>
      <div className="shop-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="shop-filter"
        >
          <option value="All categories">All categories</option>
          {categories.map((productCategory) => (
            <option key={productCategory} value={productCategory}>{productCategory}</option>
          ))}
        </select>
        <select
          aria-label="Filter by gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="shop-filter"
        >
          <option value="All">All genders</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div role="alert">{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
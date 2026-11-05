import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import { apiUrl } from '../api';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const getResponseData = async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong. Please try again.');
    }
    return data;
  };

  const saveOrder = async (paymentId) => {
    const response = await fetch(apiUrl('/api/orders'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId
      })
    });
    await getResponseData(response);
    dispatch(clearCart());
    navigate('/ordersuccess');
  };

  const handlePayment = async () => {
    if (!window.Razorpay) {
      setError('Payment window could not be loaded. Check your connection and try again.');
      return;
    }
    if (!user?.token) {
      setError('Your login session is missing. Please log in again.');
      return;
    }
    if (!cartItems.length || !Number.isFinite(totalPrice) || totalPrice <= 0) {
      setError('Your cart is empty or the total is invalid.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const orderResponse = await fetch(apiUrl('/api/payment/order'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ amount: totalPrice })
      });
      const orderData = await getResponseData(orderResponse);

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Order payment',
        order_id: orderData.id,
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await fetch(apiUrl('/api/payment/verify'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify(paymentResponse)
            });
            await getResponseData(verifyResponse);
            await saveOrder(paymentResponse.razorpay_payment_id);
          } catch (paymentError) {
            console.error(paymentError);
            setError(paymentError.message || 'Payment was received but could not be confirmed. Please contact support.');
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: address.fullName,
          email: user.email
        },
        theme: { color: '#45e0c1' },
        modal: {
          ondismiss: () => setIsSubmitting(false)
        }
      });

      razorpay.on('payment.failed', (event) => {
        setError(event.error?.description || 'Payment failed. Please try again.');
        setIsSubmitting(false);
      });
      razorpay.open();
    } catch (paymentError) {
      console.error(paymentError);
      setError(paymentError.message || 'Could not start payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
          <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
          <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
          <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            {error && <p role="alert">{error}</p>}
            <button type="submit" className="btn" disabled={isSubmitting || !cartItems.length}>
              {isSubmitting ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

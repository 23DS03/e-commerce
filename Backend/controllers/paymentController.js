const Razorpay = require('razorpay');
const crypto = require('crypto');

const createOrder = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: 'A valid payment amount is required.' });
    }
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: 'Payment gateway is not configured.' });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
    };
    
    const order = await instance.orders.create(options);
    res.json({ ...order, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error('Razorpay order creation failed:', error.message);
    res.status(500).json({ message: 'Could not initialize payment. Please try again.' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(400).json({ message: 'Payment verification details are incomplete.' });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const receivedSignature = Buffer.from(razorpay_signature, 'hex');
    const expectedSignature = Buffer.from(expectedSign, 'hex');
    if (
      receivedSignature.length === expectedSignature.length &&
      crypto.timingSafeEqual(receivedSignature, expectedSignature)
    ) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error('Razorpay payment verification failed:', error.message);
    res.status(500).json({ message: 'Could not verify payment. Please contact support if you were charged.' });
  }
};

module.exports = { createOrder, verifyPayment };
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
 connectDB();

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:3001'
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials:true,
}));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.urlencoded({extended: true}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/anlytics', require('./routes/analyticsRoutes'))



app.get("/", (req, res)=>{
    res.send("API is running...");
})


app.listen(process.env.PORT, () =>{
    console.log(`Server is started on port ${process.env.PORT}`);
})
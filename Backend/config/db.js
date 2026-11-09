const mongoose = require('mongoose')
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected successfully");
}


module.exports = connectDB;
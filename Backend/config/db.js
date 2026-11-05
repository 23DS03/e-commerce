const mongoose = require('mongoose')
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully");

    }catch(err){
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}


module.exports = connectDB;
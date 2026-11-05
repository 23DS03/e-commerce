const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@shopzone.com';
    const adminPassword = 'password123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    const adminUser = await User.findOneAndUpdate(
      { email: adminEmail },
      {
        $setOnInsert: {
          name: 'Admin User',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin'
        }
      },
      { returnDocument: 'after', upsert: true }
    );

    const makeProducts = (category, entries, imageUrl, basePrice, priceStep) =>
      entries.map((entry, index) => ({
        name: entry.name,
        description: entry.description,
        price: Number((basePrice + index * priceStep).toFixed(2)),
        category,
        gender: entry.gender || 'Unisex',
        stock: 8 + ((index * 7) % 28),
        imageUrl,
        ratings: Number((4.1 + (index % 9) / 10).toFixed(1)),
        numReviews: 8 + index * 3
      }));

const products = [
  {
    "id": 1,
    "name": "Men's Casual Shirt",
    "description": "Men's Casual Shirt: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 25% demo discount.",
    "category": "mens-shirts",
    "brand": "",
    "price": 974,
    "originalPrice": 1299,
    "discountPercentage": 25,
    "offerPrice": 974,
    "offerLabel": "25% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT71Z-pVeLk8Yh0vsvHwsRhKIzhQlIuWyOtnRpAFYlXbg&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-shirt/1.webp"
    ]
  },
  {
    "id": 2,
    "name": "Men's Formal Shirt",
    "description": "Men's Formal Shirt: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "mens-shirts",
    "brand": "",
    "price": 1279,
    "originalPrice": 1599,
    "discountPercentage": 20,
    "offerPrice": 1279,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://rukminim2.flixcart.com/image/1280/1280/xif0q/shirt/b/x/f/s-lipi-lf-2-0-4-180-blue-vdlooks-original-imahqmfwr3q2wbwg.jpeg?q=90",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-shirt/1.webp"
    ]
  },
  {
    "id": 3,
    "name": "Men's Running Shoes",
    "description": "Men's Running Shoes: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 30% demo discount.",
    "category": "mens-shoes",
    "brand": "",
    "price": 1749,
    "originalPrice": 2499,
    "discountPercentage": 30,
    "offerPrice": 1749,
    "offerLabel": "30% OFF",
    "currency": "INR",
    "image": "https://images.meesho.com/images/products/968304489/oyedp_512.avif?width=512",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/black-shoes/1.webp"
    ]
  },
  {
    "id": 4,
    "name": "Men's Wrist Watch",
    "description": "Men's Wrist Watch: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 15% demo discount.",
    "category": "mens-watches",
    "brand": "",
    "price": 1699,
    "originalPrice": 1999,
    "discountPercentage": 15,
    "offerPrice": 1699,
    "offerLabel": "15% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv8IBOwCovD6UBi-pY6rDuN0gnmcuqziymbC82QcCVJw&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp"
    ]
  },
  {
    "id": 5,
    "name": "Iron",
    "description": "Iron: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 35% demo discount.",
    "category": "home-appliances",
    "brand": "",
    "price": 649,
    "originalPrice": 999,
    "discountPercentage": 35,
    "offerPrice": 649,
    "offerLabel": "35% OFF",
    "currency": "INR",
    "image": "https://impexstore.com/cdn/shop/files/FABRIKAFG2028.jpg?v=1792993306&width=1780",
    "images": [
      "https://cdn.dummyjson.com/product-images/home-appliances/iron/1.webp"
    ]
  },
  {
    "id": 6,
    "name": "Women's Summer Dress",
    "description": "Women's Summer Dress: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 25% demo discount.",
    "category": "womens-dresses",
    "brand": "",
    "price": 1649,
    "originalPrice": 2199,
    "discountPercentage": 25,
    "offerPrice": 1649,
    "offerLabel": "25% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Lc2lLIfEPARsELDIsSDM4ZzMKSNOlm-Mae3k7LhjPA&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-dresses/blue-summer-dress/1.webp"
    ]
  },
  {
    "id": 7,
    "name": "Women's Evening Dress",
    "description": "Women's Evening Dress: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "womens-dresses",
    "brand": "",
    "price": 2799,
    "originalPrice": 3499,
    "discountPercentage": 20,
    "offerPrice": 2799,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://suzyshier.com/cdn/shop/files/28.4_0ff75073-e4e7-4c83-810c-492f783c3ad3.jpg?v=1790535966&width=1200",
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-dresses/black-womens-dress/1.webp"
    ]
  },
  {
    "id": 8,
    "name": "Men Blazer",
    "description": "Women's Handbag: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 30% demo discount.",
    "category": "men casual dresses",
    "brand": "",
    "price": 4999,
    "originalPrice": 5999,
    "discountPercentage": 10,
    "offerPrice": 4999,
    "offerLabel": "10% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf1Z_zULLTlmBWKyXXNtYu4xTJ20F9_XLIs6WMZpS7MwKsPHRgFfX2r74j&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-bags/black-handbag/1.webp"
    ]
  },
  {
    "id": 9,
    "name": "Women's Jewellery Set",
    "description": "Women's Jewellery: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "womens-jewellery",
    "brand": "",
    "price": 1199,
    "originalPrice": 1499,
    "discountPercentage": 20,
    "offerPrice": 1199,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://assets-jiocdn.ajio.com/medias/sys_master/root/20241103/vaXr/672745bbf9b8ef490bf93b65/-1117Wx1400H-700682453-gold-MODEL.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-jewellery/gold-earrings/1.webp"
    ]
  },
  {
    "id": 10,
    "name": "men jeans ",
    "description": "Men's Jeans: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 25% demo discount.",
    "category": "straight fit jeans",
    "brand": "",
    "price": 974,
    "originalPrice": 1299,
    "discountPercentage": 25,
    "offerPrice": 974,
    "offerLabel": "25% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZVsG3WWbDx6HJns8PlhAHQARQcR8j43cqZeefFeHvQg&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-shoes/black-heels/1.webp"
    ]
  },
  {
    "id": 11,
    "name": "Smartphone 128GB",
    "description": "Smartphone 128GB: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 15% demo discount.",
    "category": "smartphones",
    "brand": "",
    "price": 15299,
    "originalPrice": 17999,
    "discountPercentage": 15,
    "offerPrice": 15299,
    "offerLabel": "15% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPi2Q6v2MoFazvjkqX1aUmJQ2ZOQrPtrfpleU1skdmA&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13/1.webp"
    ]
  },
  {
    "id": 12,
    "name": "Smartphone 256GB",
    "description": "Smartphone 256GB: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 18% demo discount.",
    "category": "smartphones",
    "brand": "",
    "price": 20499,
    "originalPrice": 24999,
    "discountPercentage": 18,
    "offerPrice": 20499,
    "offerLabel": "18% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN8871mR10ZXP07ugqArfYhg_qhdic2nmdRBJesJceQg&s",
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp"
    ]
  },
  {
    "id": 13,
    "name": "Android 5G Phone",
    "description": "Android 5G Phone: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "smartphones",
    "brand": "",
    "price": 17599,
    "originalPrice": 21999,
    "discountPercentage": 20,
    "offerPrice": 17599,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtwElrpcdD1wZ1cq9MwOkMyABZlha81iKhY3CFSmRkw&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp"
    ]
  },
  {
    "id": 14,
    "name": "vivo Smartphone",
    "description": "Budget Smartphone: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 12% demo discount.",
    "category": "smartphones",
    "brand": "",
    "price": 8799,
    "originalPrice": 9999,
    "discountPercentage": 12,
    "offerPrice": 8799,
    "offerLabel": "12% OFF",
    "currency": "INR",
    "image": "",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-6y9ByNK8DIh8M_IfhtebO_149MhFUnXDbDE7iJEew&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp"
    ]
  },
  {
    "id": 15,
    "name": "Mixer Grinder",
    "description": "Mixer Grinder: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 10% demo discount.",
    "category": "home-appliances",
    "brand": "",
    "price": 4499,
    "originalPrice": 6999,
    "discountPercentage": 20,
    "offerPrice": 4499,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRTtwKs4MK2WgI5JiQ3c_sOr_BCr1j1cJTtiu0jRLgSIX6KA4-T12O9OuQTMdHKA2EfYaqWLFIVdon-vJ1nLYsZ5owiXKe4EDxWQAK5lDleYiUNlpF-FGj2Hw",
    "images": [
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp"
    ]
  },
  {
    "id": 16,
    "name": "Wireless Headphones",
    "description": "Wireless Headphones: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 30% demo discount.",
    "category": "mobile-accessories",
    "brand": "",
    "price": 2099,
    "originalPrice": 2999,
    "discountPercentage": 30,
    "offerPrice": 2099,
    "offerLabel": "30% OFF",
    "currency": "INR",
    "image": "https://media-ik.croma.com/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/316749_0_oPT3hFQDdU.png?updatedAt=1753957654373",
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp"
    ]
  },
  {
    "id": 17,
    "name": "Fast Charger",
    "description": "Fast Charger: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "mobile-accessories",
    "brand": "",
    "price": 799,
    "originalPrice": 999,
    "discountPercentage": 20,
    "offerPrice": 799,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://ubonindia.com/cdn/shop/files/ch910_best_charger_fast_charger_ubon_india_4.jpg?v=1779857150&width=1200",
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/galaxy-charger/1.webp"
    ]
  },
  {
    "id": 18,
    "name": "Kids clothes",
    "description": "Kids clothes: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 25% demo discount.",
    "category": "clothing",
    "brand": "",
    "price": 374,
    "originalPrice": 499,
    "discountPercentage": 25,
    "offerPrice": 374,
    "offerLabel": "25% OFF",
    "currency": "INR",
    "image": "https://m.media-amazon.com/images/I/71RDI4OaB9L._AC_UY1100_.jpg",
    "images": [
      "https://m.media-amazon.com/images/I/71RDI4OaB9L._AC_UY1100_.jpg"
    ]
  },
  {
    "id": 19,
    "name": "MacBook Pro Laptop",
    "description": "MacBook Pro Laptop: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 10% demo discount.",
    "category": "laptops",
    "brand": "",
    "price": 134999,
    "originalPrice": 149999,
    "discountPercentage": 10,
    "offerPrice": 134999,
    "offerLabel": "10% OFF",
    "currency": "INR",
    "image": "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc5/MacBook-Ultra.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/macbook-pro/1.webp"
    ]
  },
  {
    "id": 20,
    "name": "Asus Zenbook Laptop",
    "description": "Asus Zenbook Laptop: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 15% demo discount.",
    "category": "laptops",
    "brand": "",
    "price": 76499,
    "originalPrice": 89999,
    "discountPercentage": 15,
    "offerPrice": 76499,
    "offerLabel": "15% OFF",
    "currency": "INR",
    "image": "https://m.media-amazon.com/images/I/71niV7tf9hL._AC_UF1000,1000_QL80_.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro/1.webp"
    ]
  },
  {
    "id": 21,
    "name": "Slim Notebook Laptop",
    "description": "Slim Notebook Laptop: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 18% demo discount.",
    "category": "laptops",
    "brand": "",
    "price": 57399,
    "originalPrice": 69999,
    "discountPercentage": 18,
    "offerPrice": 57399,
    "offerLabel": "18% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEVMcSfNLkxvXGNaP24ajbnGanVjh2wg7utEQMcqVHg&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro/1.webp"
    ]
  },
  {
    "id": 22,
    "name": "LED TV 32-inch",
    "description": "LED TV 32-inch: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "televisions",
    "brand": "",
    "price": 11999,
    "originalPrice": 14999,
    "discountPercentage": 20,
    "offerPrice": 11999,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWB2n_Cm4Vgi4y713-M1EjAx04tM1VihqdJ5NIuYegow&s=10",
    "images": [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1"
    ]
  },
  {
    "id": 23,
    "name": "LED TV 43-inch",
    "description": "LED TV 43-inch: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 22% demo discount.",
    "category": "televisions",
    "brand": "",
    "price": 21059,
    "originalPrice": 26999,
    "discountPercentage": 22,
    "offerPrice": 21059,
    "offerLabel": "22% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx-c-O5ZD7ci-LF48TLMdIVzug2uG6_AUVtOOZVS4_vA&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/televisions/led-tv-43-inch/1.webp"
    ]
  },
  {
    "id": 24,
    "name": "LED TV 55-inch 4K",
    "description": "LED TV 55-inch 4K: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 18% demo discount.",
    "category": "televisions",
    "brand": "",
    "price": 35259,
    "originalPrice": 42999,
    "discountPercentage": 18,
    "offerPrice": 35259,
    "offerLabel": "18% OFF",
    "currency": "INR",
    "image": "https://images.jdmagicbox.com/quickquotes/images_main/kfc-television-03-03-2020-tvsfzarwehp7ftgg-182649045-100he7ox.jpg",
    "images": [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1"
    ]
  },
  {
    "id": 25,
    "name": "Ceiling Fan",
    "description": "Ceiling Fan: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 25% demo discount.",
    "category": "kitchen-accessories",
    "brand": "",
    "price": 974,
    "originalPrice": 1299,
    "discountPercentage": 25,
    "offerPrice": 974,
    "offerLabel": "25% OFF",
    "currency": "INR",
    "image": "https://www.fybros.com/uploads/_resized/1000/product/1783689232_487371b6d34cbc2a7d84.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/frying-pan/1.webp"
    ]
  },
  {
    "id": 26,
    "name": "Kitchen Knife",
    "description": "Kitchen Knife: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "kitchen-accessories",
    "brand": "",
    "price": 799,
    "originalPrice": 999,
    "discountPercentage": 20,
    "offerPrice": 799,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/1.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/1.webp"
    ]
  },
  {
    "id": 27,
    "name": "Rod ",
    "description": "Electric Kettle: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 15% demo discount.",
    "category": "rod",
    "brand": "",
    "price": 1529,
    "originalPrice": 1799,
    "discountPercentage": 15,
    "offerPrice": 1529,
    "offerLabel": "15% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWBcj7Jx_TdEyOTJi4lDBttTQ90NspCtIFKX_lJquXg&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-kettle/1.webp"
    ]
  },
  {
    "id": 28,
    "name": "Lunch Box",
    "description": "Lunch Box: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 30% demo discount.",
    "category": "kitchen-accessories",
    "brand": "",
    "price": 489,
    "originalPrice": 699,
    "discountPercentage": 30,
    "offerPrice": 489,
    "offerLabel": "30% OFF",
    "currency": "INR",
    "image": "https://m.media-amazon.com/images/I/718AHaSk36L._AC_UF894,1000_QL80_.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/1.webp"
    ]
  },
  {
    "id": 29,
    "name": "Water Bottle",
    "description": "Reusable Water Bottle: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "kitchen-accessories",
    "brand": "",
    "price": 399,
    "originalPrice": 499,
    "discountPercentage": 20,
    "offerPrice": 399,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMkho7W8fLMfbVy1hm9yGOZu2UXZnN9C2Z7LO5LBm2A&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/water-bottle/1.webp"
    ]
  },
  {
    "id": 30,
    "name": "Suit set",
    "description": "Suit set: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 7% demo discount.",
    "category": "beauty",
    "brand": "",
    "price": 771,
    "originalPrice": 829,
    "discountPercentage": 7,
    "offerPrice": 771,
    "offerLabel": "7% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSBYQOTQPmh6bu5P8E4kXnlw_tZadsbqhP_7RwxtqhjQ&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/suit-set/1.webp"
    ]
  },
  {
    "id": 31,
    "name": "t-shirt",
    "description": "t-shirt: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 18% demo discount.",
    "category": "t-shirts",
    "brand": "",
    "price": 1360,
    "originalPrice": 1659,
    "discountPercentage": 18,
    "offerPrice": 1360,
    "offerLabel": "18% OFF",
    "currency": "INR",
    "image": "https://freecultr.com/cdn/shop/files/CarbonBlack_MossGreen_RustOrange_1.jpg?v=1786088090&width=900",
    "images": [
      "https://cdn.dummyjson.com/product-images/t-shirts/black-t-shirt/1.webp"
    ]
  },
  {
    "id": 32,
    "name": "kurta pajama",
    "description": "kurta pajama: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 10% demo discount.",
    "category": "mens-shirts",
    "brand": "",
    "price": 1120,
    "originalPrice": 1244,
    "discountPercentage": 10,
    "offerPrice": 1120,
    "offerLabel": "10% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRStVZxRBrvO25-R6dWCdGvsSmEoI-xSJO40kN_tt_zA&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/kurta-pajama/1.webp"
    ]
  },
  {
    "id": 33,
    "name": "Red Lipstick",
    "description": "Red Lipstick: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 15% demo discount.",
    "category": "beauty",
    "brand": "",
    "price": 917,
    "originalPrice": 1079,
    "discountPercentage": 15,
    "offerPrice": 917,
    "offerLabel": "15% OFF",
    "currency": "INR",
    "image": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp"
    ]
  },
  {
    "id": 34,
    "name": "Air conditioner",
    "description": "Air conditioner: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 11% demo discount.",
    "category": "home-appliances",
    "brand": "",
    "price": 59699,
    "originalPrice": 46999,
    "discountPercentage": 20,
    "offerPrice": 11933,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image":"https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/platform/extensions/cms-blog/free/original/1xAFdIYNX-files",
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp"
    ]
  },
  {
    "id": 35,
    "name": "Face Cream",
    "description": "Face Cream: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 15% demo discount.",
    "category": "skin-care",
    "brand": "",
    "price": 849,
    "originalPrice": 999,
    "discountPercentage": 15,
    "offerPrice": 849,
    "offerLabel": "15% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcL5OrPplRPvO6cf8jJ0wjHtzCDLSetV6YNKTsa5TGw&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/skin-care/face-cream/1.webp"
    ]
  },
  {
    "id": 36,
    "name": "Facial Cleanser",
    "description": "Facial Cleanser: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 10% demo discount.",
    "category": "skin-care",
    "brand": "",
    "price": 629,
    "originalPrice": 699,
    "discountPercentage": 10,
    "offerPrice": 629,
    "offerLabel": "10% OFF",
    "currency": "INR",
    "image": "https://m.media-amazon.com/images/I/61KFTaS6njL._SL1500_.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/skin-care/face-wash/1.webp"
    ]
  },
  {
    "id": 37,
    "name": "Women's Wrist Watch",
    "description": "Women's Wrist Watch: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "womens-watches",
    "brand": "",
    "price": 1839,
    "originalPrice": 2299,
    "discountPercentage": 20,
    "offerPrice": 1839,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://m.media-amazon.com/images/I/71B9Kz-L-NL._SX679_.jpg",
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic/1.webp"
    ]
  },
  {
    "id": 38,
    "name": "Women's Shoulder Bag",
    "description": "Women's Shoulder Bag: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 25% demo discount.",
    "category": "womens-bags",
    "brand": "",
    "price": 1199,
    "originalPrice": 1599,
    "discountPercentage": 25,
    "offerPrice": 1199,
    "offerLabel": "25% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbjRzXRmPtTYZUH-4ZlqJIevKm5xlJwdOjLIa6e3MebQ&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-bags/green-satchel/1.webp"
    ]
  },
  {
    "id": 39,
    "name": "Women's Heels",
    "description": "Women's Heels: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "womens-shoes",
    "brand": "",
    "price": 1599,
    "originalPrice": 1999,
    "discountPercentage": 20,
    "offerPrice": 1599,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwFb9wYvoH1l5mGGSozIA9Y1fmt8cRP8sK-7-2dWo8Q&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/womens-shoes/black-heels/1.webp"
    ]
  },
  {
    "id": 40,
    "name": "Men's Wallet",
    "description": "Men's Wallet: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "accessories",
    "brand": "",
    "price": 639,
    "originalPrice": 799,
    "discountPercentage": 20,
    "offerPrice": 639,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxd4KMrzvO6LXxSrc6baP41lbEpCC9TPIYvH96LLasrg&s=10",
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxd4KMrzvO6LXxSrc6baP41lbEpCC9TPIYvH96LLasrg&s=10"
    ]
  },
  {
    "id": 41,
    "name": "Travel Backpack",
    "description": "Travel Backpack: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 25% demo discount.",
    "category": "accessories",
    "brand": "",
    "price": 1349,
    "originalPrice": 1799,
    "discountPercentage": 25,
    "offerPrice": 1349,
    "offerLabel": "25% OFF",
    "currency": "INR",
    "image": "https://carrypro.in/cdn/shop/files/1_c3f04536-93c6-4280-aace-40a31712615e.jpg?v=1782130141&width=1755",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    ]
  },
  {
    "id": 42,
    "name": "Bluetooth Speaker",
    "description": "Bluetooth Speaker: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "mobile-accessories",
    "brand": "",
    "price": 1999,
    "originalPrice": 2499,
    "discountPercentage": 20,
    "offerPrice": 1999,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    "images": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    ]
  },
  {
    "id": 43,
    "name": "Power Bank 20000mAh",
    "description": "Power Bank 20000mAh: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 18% demo discount.",
    "category": "mobile-accessories",
    "brand": "",
    "price": 1639,
    "originalPrice": 1999,
    "discountPercentage": 18,
    "offerPrice": 1639,
    "offerLabel": "18% OFF",
    "currency": "INR",
    "image": "https://zyrontech.com.au/cdn/shop/files/powaflex-20000mah-power-bank-941913.jpg?v=1726767719&width=2048",
    "images": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    ]
  },
  {
    "id": 44,
    "name": "Microwave Oven",
    "description": "Microwave Oven: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 15% demo discount.",
    "category": "kitchen-accessories",
    "brand": "",
    "price": 6799,
    "originalPrice": 7999,
    "discountPercentage": 15,
    "offerPrice": 6799,
    "offerLabel": "15% OFF",
    "currency": "INR",
    "image": "https://www.electrolux.in/globalassets/support/faq/microwave-faq-640x640.jpg?width=464",
    "images": [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba"
    ]
  },
  {
    "id": 45,
    "name": "Mixer Grinder",
    "description": "Mixer Grinder: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "kitchen-accessories",
    "brand": "",
    "price": 2799,
    "originalPrice": 3499,
    "discountPercentage": 20,
    "offerPrice": 2799,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://rukminim2.flixcart.com/image/1280/1280/xif0q/mixer-grinder-juicer/s/u/m/-original-imahg84uvgezvfhk.jpeg?q=90",
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/mixer-grinder/1.webp"
    ]
  },
  {
    "id": 46,
    "name": "Smart LED Bulb",
    "description": "Smart LED Bulb: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 25% demo discount.",
    "category": "home-decoration",
    "brand": "",
    "price": 524,
    "originalPrice": 699,
    "discountPercentage": 25,
    "offerPrice": 524,
    "offerLabel": "25% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZK_zc_iM4YeqNysaMY9H6YygeZXHEx9g3_IdKAgjhig&s",
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/smart-led-bulb/1.webp"
    ]
  },
  {
    "id": 47,
    "name": "Decorative Wall Clock",
    "description": "Decorative Wall Clock: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "home-decoration",
    "brand": "",
    "price": 799,
    "originalPrice": 999,
    "discountPercentage": 20,
    "offerPrice": 799,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAjNT3VZJ-taEv9-K0JATUwBVUwcv6WhDOqSn6MZowSw&s=10",
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/decorative-wall-clock/1.webp"
    ]
  },
  {
    "id": 48,
    "name": "Eau de Parfum",
    "description": "Eau de Parfum: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "fragrances",
    "brand": "",
    "price": 2399,
    "originalPrice": 2999,
    "discountPercentage": 20,
    "offerPrice": 2399,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://perfumesteal.in/cdn/shop/files/45_5588539c-a0e6-4d97-8897-84338d42b41e_490x.progressive.png.jpg?v=1764332035",
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp"
    ]
  },
  {
    "id": 49,
    "name": "Sofa Cushion Set",
    "description": "Sofa Cushion Set: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 15% demo discount.",
    "category": "home-decoration",
    "brand": "",
    "price": 1104,
    "originalPrice": 1299,
    "discountPercentage": 15,
    "offerPrice": 1104,
    "offerLabel": "15% OFF",
    "currency": "INR",
    "image": "https://ahdfurniture.com/wp-content/uploads/2025/09/Willowgrain-Wooden-Sofa-Set-1.webp",
    "images": [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
    ]
  },
  {
    "id": 50,
    "name": "Laptop Sleeve",
    "description": "Laptop Sleeve: a practical, stylish choice for everyday use. Ideal for home, work or gifting, with a value price and 20% demo discount.",
    "category": "accessories",
    "brand": "",
    "price": 719,
    "originalPrice": 899,
    "discountPercentage": 20,
    "offerPrice": 719,
    "offerLabel": "20% OFF",
    "currency": "INR",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKnLtDOYcc7QJvLRPwLs8XN7wDeKIi0-rM2ULCVxoyaQ&s=10",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    ]
  }
];

module.exports = products;

    const normalizedProducts = products.map((product) => ({
      name: product.name,
      description: product.description,
      originalPrice: product.originalPrice ?? product.offerPrice ?? product.price,
      discountPercentage: product.discountPercentage ?? 0,
      price: Number(((product.originalPrice ?? product.offerPrice ?? product.price) * (1 - (product.discountPercentage ?? 0) / 100)).toFixed(2)),
      category: product.category,
      gender: product.gender || 'Unisex',
      stock: product.stock ?? 10,
      imageUrl: product.image || (product.images && product.images[0]),
      ratings: product.rating ?? 0,
      numReviews: product.reviews ?? 0
    }));

    const seededProductNames = normalizedProducts.map(({ name }) => name);
    await Product.bulkWrite(normalizedProducts.map((product) => ({
      updateOne: {
        filter: { name: product.name },
        update: { $set: product },
        upsert: true
      }
    })));
    const removedProductResult = await Product.deleteMany({
      name: { $nin: seededProductNames }
    });
    const seededProductCount = await Product.countDocuments({ name: { $in: seededProductNames } });
    
    console.log('Data Imported Successfully!');
    console.log(`Seeded ${seededProductCount} products.`);
    console.log(`Removed ${removedProductResult.deletedCount} products not in the seed list.`);
    console.log(`Admin login email: ${adminUser.email}`);
    console.log(`Admin login password: ${adminPassword}`);
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

const getPriceDetails = (originalPrice, discountPercentage) => {
  const listPrice = Number(originalPrice);
  const discount = Number(discountPercentage);
  if (!Number.isFinite(listPrice) || listPrice <= 0) {
    return { error: 'Price must be greater than zero.' };
  }
  if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
    return { error: 'Discount must be between 0 and 100 percent.' };
  }
  return {
    originalPrice: listPrice,
    discountPercentage: discount,
    price: Number((listPrice * (1 - discount / 100)).toFixed(2))
  };
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, category, stock } = req.body;
    const priceDetails = getPriceDetails(req.body.originalPrice ?? req.body.price, req.body.discountPercentage ?? 0);
    if (priceDetails.error) {
      return res.status(400).json({ message: priceDetails.error });
    }
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }
    const product = new Product({
      name, description, category, stock, imageUrl, ...priceDetails
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const { name, description, category, stock } = req.body;
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.category = category ?? product.category;
      product.stock = stock ?? product.stock;
      if (req.body.price !== undefined || req.body.originalPrice !== undefined || req.body.discountPercentage !== undefined) {
        const priceDetails = getPriceDetails(
          req.body.originalPrice ?? req.body.price ?? product.originalPrice ?? product.price,
          req.body.discountPercentage ?? product.discountPercentage ?? 0
        );
        if (priceDetails.error) {
          return res.status(400).json({ message: priceDetails.error });
        }
        product.set(priceDetails);
      }

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        product.imageUrl = result.secure_url;
      }
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
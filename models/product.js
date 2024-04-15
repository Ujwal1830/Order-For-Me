import mongoose, { models } from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  rating: { type: Boolean,},
  sizes: [{
    size: {
      type: String,
    },
    price: {
      type: Number,
    }
  }],
}, { timestamps: true });

const Product = models.Product || mongoose.model('Product', productSchema);

export default Product;
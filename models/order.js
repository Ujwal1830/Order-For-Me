import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // Add any other fields specific to your order item
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  // Add any other fields specific to your order model
}, { timestamps: true });

const Order = models.Order || mongoose.model('Order', orderSchema);

export default Order;
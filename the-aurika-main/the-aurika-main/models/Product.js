import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  comparePrice: { type: Number },
  category: { 
    type: String, 
    required: true, 
    enum: ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Pendants', 'Sets', 'Bangles', 'Anklets']
  },
  material: { type: String, default: 'Gold' },
  purity: { type: String, enum: ['14K', '18K', '22K', '24K'], default: '22K' },
  weight: { type: String },
  images: [{ type: String }],
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: [String],
  sku: { type: String, unique: true },
}, { timestamps: true });

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';
import { NextResponse } from 'next/server';

const sampleProducts = [
  {
    name: 'Royal Heritage Necklace',
    slug: 'royal-heritage-necklace',
    description: 'Exquisite 22K gold necklace featuring intricate traditional craftsmanship with diamonds. A masterpiece that embodies the essence of Indian royalty, perfect for weddings and grand celebrations.',
    price: 185000,
    comparePrice: 215000,
    category: 'Necklaces',
    material: 'Gold',
    purity: '22K',
    weight: '45g',
    images: ['/images/gold_necklace.png'],
    inStock: true,
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 128,
    tags: ['wedding', 'bridal', 'traditional', 'diamond'],
    sku: 'AUR-NK-001',
  },
  {
    name: 'Celestial Diamond Ring',
    slug: 'celestial-diamond-ring',
    description: 'Stunning solitaire diamond ring set in 18K white gold. The brilliance of this ethically sourced diamond captures light from every angle, making it the perfect symbol of eternal love.',
    price: 95000,
    comparePrice: 120000,
    category: 'Rings',
    material: 'White Gold',
    purity: '18K',
    weight: '8g',
    images: ['/images/diamond_ring.png'],
    inStock: true,
    featured: true,
    bestSeller: true,
    newArrival: true,
    rating: 4.8,
    reviewCount: 96,
    tags: ['engagement', 'solitaire', 'diamond', 'love'],
    sku: 'AUR-RG-001',
  },
  {
    name: 'Pearl Drop Earrings',
    slug: 'pearl-drop-earrings',
    description: 'Elegant gold earrings with lustrous pearl drops and diamond accents. These timeless pieces blend contemporary design with classic sophistication, perfect for every occasion.',
    price: 42000,
    comparePrice: 55000,
    category: 'Earrings',
    material: 'Gold',
    purity: '22K',
    weight: '12g',
    images: ['/images/gold_earrings.png'],
    inStock: true,
    featured: true,
    newArrival: true,
    rating: 4.7,
    reviewCount: 74,
    tags: ['pearl', 'elegant', 'party', 'office'],
    sku: 'AUR-ER-001',
  },
  {
    name: 'Maharani Heritage Bracelet',
    slug: 'maharani-heritage-bracelet',
    description: 'Handcrafted 22K gold bracelet with intricate filigree work, adorned with rubies, sapphires, and diamonds. A regal statement piece inspired by Indian heritage artistry.',
    price: 125000,
    comparePrice: 150000,
    category: 'Bracelets',
    material: 'Gold',
    purity: '22K',
    weight: '35g',
    images: ['/images/gold_bracelet.png'],
    inStock: true,
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 85,
    tags: ['heritage', 'filigree', 'bridal', 'royal'],
    sku: 'AUR-BR-001',
  },
  {
    name: 'Enchanted Pearl Set',
    slug: 'enchanted-pearl-set',
    description: 'Complete jewelry set featuring a pendant necklace with matching earrings. 22K gold with diamond and pearl accents. The perfect gift for someone special.',
    price: 165000,
    comparePrice: 200000,
    category: 'Sets',
    material: 'Gold',
    purity: '22K',
    weight: '38g',
    images: ['/images/pendant_set.png'],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    rating: 5.0,
    reviewCount: 156,
    tags: ['set', 'pendant', 'pearl', 'gift', 'wedding'],
    sku: 'AUR-ST-001',
  },
  {
    name: 'Infinity Love Ring',
    slug: 'infinity-love-ring',
    description: 'Delicate 18K rose gold ring with infinity design, adorned with micro-pave diamonds. A symbol of eternal love and commitment.',
    price: 35000,
    comparePrice: 45000,
    category: 'Rings',
    material: 'Rose Gold',
    purity: '18K',
    weight: '5g',
    images: ['/images/diamond_ring.png'],
    inStock: true,
    newArrival: true,
    rating: 4.6,
    reviewCount: 45,
    tags: ['love', 'minimal', 'daily', 'rose gold'],
    sku: 'AUR-RG-002',
  },
  {
    name: 'Classic Gold Chain',
    slug: 'classic-gold-chain',
    description: 'Timeless 22K gold chain with a sophisticated rope design. Versatile enough for everyday elegance or formal occasions.',
    price: 78000,
    comparePrice: 90000,
    category: 'Necklaces',
    material: 'Gold',
    purity: '22K',
    weight: '25g',
    images: ['/images/gold_necklace.png'],
    inStock: true,
    rating: 4.5,
    reviewCount: 62,
    tags: ['chain', 'daily', 'classic', 'men'],
    sku: 'AUR-NK-002',
  },
  {
    name: 'Diamond Stud Earrings',
    slug: 'diamond-stud-earrings',
    description: 'Classic diamond studs set in 18K white gold. Each diamond is hand-selected for exceptional clarity and brilliance.',
    price: 55000,
    comparePrice: 68000,
    category: 'Earrings',
    material: 'White Gold',
    purity: '18K',
    weight: '4g',
    images: ['/images/gold_earrings.png'],
    inStock: true,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 112,
    tags: ['diamond', 'stud', 'classic', 'office'],
    sku: 'AUR-ER-002',
  },
];

export async function POST(request) {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    
    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@theaurika.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@theaurika.com',
        password: 'Admin@123',
        role: 'admin',
        phone: '+919837944411',
      });
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${products.length} products and admin user`,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

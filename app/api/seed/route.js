import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const sampleProducts = [
  { name: "Royal Heritage Necklace", slug: "royal-heritage-necklace", description: "Exquisite 22K gold necklace with intricate craftsmanship.", price: 185000, comparePrice: 215000, category: "Necklaces", material: "Gold", purity: "22K", weight: "45g", images: JSON.stringify(["/images/gold_necklace.png"]), inStock: true, featured: true, bestSeller: true, rating: 4.9, reviewCount: 128, sku: "AUR-NK-001" },
  { name: "Celestial Diamond Ring", slug: "celestial-diamond-ring", description: "Stunning solitaire diamond ring in 18K white gold.", price: 95000, comparePrice: 120000, category: "Rings", material: "White Gold", purity: "18K", weight: "8g", images: JSON.stringify(["/images/diamond_ring.png"]), inStock: true, featured: true, bestSeller: true, newArrival: true, rating: 4.8, reviewCount: 96, sku: "AUR-RG-001" },
  { name: "Pearl Drop Earrings", slug: "pearl-drop-earrings", description: "Elegant gold earrings with lustrous pearl drops.", price: 42000, comparePrice: 55000, category: "Earrings", material: "Gold", purity: "22K", weight: "12g", images: JSON.stringify(["/images/gold_earrings.png"]), inStock: true, featured: true, newArrival: true, rating: 4.7, reviewCount: 74, sku: "AUR-ER-001" },
  { name: "Maharani Heritage Bracelet", slug: "maharani-heritage-bracelet", description: "Handcrafted 22K gold bracelet with filigree work.", price: 125000, comparePrice: 150000, category: "Bracelets", material: "Gold", purity: "22K", weight: "35g", images: JSON.stringify(["/images/gold_bracelet.png"]), inStock: true, featured: true, bestSeller: true, rating: 4.9, reviewCount: 85, sku: "AUR-BR-001" },
  { name: "Enchanted Pearl Set", slug: "enchanted-pearl-set", description: "Complete jewelry set with pendant and matching earrings.", price: 165000, comparePrice: 200000, category: "Sets", material: "Gold", purity: "22K", weight: "38g", images: JSON.stringify(["/images/pendant_set.png"]), inStock: true, featured: true, newArrival: true, bestSeller: true, rating: 5.0, reviewCount: 156, sku: "AUR-ST-001" },
];

export async function POST() {
  try {
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.product.createMany({ data: sampleProducts });
    const adminExists = await prisma.user.findUnique({ where: { email: "admin@theaurika.com" } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("Admin@123", 12);
      await prisma.user.create({ data: { name: "Admin", email: "admin@theaurika.com", password: hashedPassword, role: "admin", phone: "+919837944411" } });
    }
    const count = await prisma.product.count();
    return NextResponse.json({ success: true, message: `Seeded ${count} products and admin user` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
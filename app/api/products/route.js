import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const bestSeller = searchParams.get("bestSeller");
    const newArrival = searchParams.get("newArrival");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") || "desc";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    let where = {};
    if (category) where.category = category;
    if (featured === "true") where.featured = true;
    if (bestSeller === "true") where.bestSeller = true;
    if (newArrival === "true") where.newArrival = true;
    if (search) where.OR = [{ name: { contains: search } }, { description: { contains: search } }];
    const total = await prisma.product.count({ where });
    const products = await prisma.product.findMany({ where, orderBy: { [sort]: order }, skip: (page - 1) * limit, take: limit });
    return NextResponse.json({ success: true, products, pagination: { total, page, pages: Math.ceil(total / limit) } });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await requireAdmin(request);
    const data = await request.json();
    if (!data.slug) data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (!data.sku) data.sku = "AUR-" + Date.now();
    const product = await prisma.product.create({ data });
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    if (error.message === "Authentication required" || error.message === "Admin access required") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
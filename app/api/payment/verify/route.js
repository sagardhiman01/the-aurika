import crypto from "crypto";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(request) {
  try {
    const user = await requireAuth(request);
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Razorpay not configured." }, { status: 400 });
    }
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = await request.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        shippingAddress: JSON.stringify(orderData.shippingAddress),
        paymentMethod: orderData.paymentMethod || "razorpay",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentStatus: "completed",
        subtotal: orderData.subtotal,
        shippingCharge: orderData.shippingCharge || 0,
        tax: orderData.tax || 0,
        totalAmount: orderData.totalAmount,
        status: "confirmed",
        isPaid: true,
        paidAt: new Date(),
        items: {
          create: orderData.items.map(item => ({
            productId: item.product, name: item.name,
            price: item.price, quantity: item.quantity, image: item.image
          }))
        }
      }
    });
    return NextResponse.json({ success: true, order: { id: order.id, status: order.status }, message: "Payment verified" });
  } catch (error) {
    if (error.message === "Authentication required") return NextResponse.json({ error: "Please login" }, { status: 401 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { requireAuth } from '@/lib/auth';

export async function POST(request) {
  try {
    const user = await requireAuth(request);
    await connectDB();
    
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderData 
    } = await request.json();

    // Verify payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Create order in database
    const order = await Order.create({
      user: user.id,
      ...orderData,
      paymentResult: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: 'completed',
      },
      isPaid: true,
      paidAt: new Date(),
      status: 'confirmed',
    });

    return NextResponse.json({
      success: true,
      order: { id: order._id, status: order.status },
      message: 'Payment verified and order placed successfully',
    });
  } catch (error) {
    if (error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Please login to proceed' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name_en: body.name_en,
        name_ar: body.name_ar,
        description_en: body.description_en,
        description_ar: body.description_ar,
        price: parseFloat(body.price),
        image: body.image,
      },
    });

    return NextResponse.json({ message: 'Product added successfully', data: product }, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

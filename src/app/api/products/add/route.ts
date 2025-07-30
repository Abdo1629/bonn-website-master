import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseConfig';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name_en || !data.name_ar) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await addDoc(collection(db, 'products'), data);

    return NextResponse.json({ message: 'Product added successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ message: 'Failed to add product' }, { status: 500 });
  }
}

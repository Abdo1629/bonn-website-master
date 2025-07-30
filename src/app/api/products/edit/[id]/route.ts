// src/app/api/products/edit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(req: NextRequest) {
  try {
    const { id, ...updatedData } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    const docRef = doc(db, "products", id);
    await updateDoc(docRef, updatedData);

    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}

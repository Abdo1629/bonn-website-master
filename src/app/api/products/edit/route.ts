import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Only PUT allowed" });
  }

  const { id } = req.query;
  const updatedData = req.body;

  try {
    const docRef = doc(db, "products", id as string);
    await updateDoc(docRef, updatedData);
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating product" });
  }
}

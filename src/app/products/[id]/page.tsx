// src/app/products/[id]/page.tsx
import path from 'path';
import fs from 'fs/promises';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type ProductType = {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: string;
  image: string;
};

// ✅ توليد الـ Static Params
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const fileData = await fs.readFile(filePath, 'utf-8');
  const products: ProductType[] = JSON.parse(fileData);

  return products.map((product) => ({
    id: product.id,
  }));
}

// ✅ قراءة الداتا حسب ID
async function getProductById(id: string): Promise<ProductType | null> {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const fileData = await fs.readFile(filePath, 'utf-8');
  const products: ProductType[] = JSON.parse(fileData);
  return products.find((p) => p.id === id) || null;
}

// ✅ صفحة المنتج
// لازم تكون async ومتاخد params بشكل صحيح
interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">
        {product.name_en} - {product.name_ar}
      </h1>
      <p className="mb-1">{product.description_en}</p>
      <p className="mb-1">{product.description_ar}</p>
      <p className="font-semibold mb-2">Price: {product.price}</p>
      <Image
        src={product.image}
        alt={product.name_en}
        width={256}
        height={256}
        className="object-cover rounded"
      />
    </div>
  );
}

"use client";

import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import path from 'path';
import fs from 'fs';
import { ParsedUrlQuery } from 'querystring';
import Image from "next/image";

type ProductType = {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: string;
  image: string;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function ProductPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!product) return <p>Product Not Found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">
        {product.name_en} - {product.name_ar}
      </h1>
      <p className="mb-1">{product.description_en}</p>
      <p className="mb-1">{product.description_ar}</p>
      <p className="font-semibold mb-2">Price: {product.price}</p>
      <Image src={product.image} alt={product.name_en} className="w-64 h-64 object-cover rounded" />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const products: ProductType[] = JSON.parse(fileData);

  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  product: ProductType | null;
}, Params> = async (context) => {
  const { id } = context.params!;
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const products: ProductType[] = JSON.parse(fileData);

  const product = products.find((p) => p.id === id) || null;

  return {
    props: {
      product,
    },
  };
};

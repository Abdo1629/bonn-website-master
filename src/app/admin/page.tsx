"use client";

import { useState } from 'react';

type Product = {
  id: string;
  name_en: string;
  name_ar: string;
  price: string;
  description_en: string;
  description_ar: string;
  image: string;
};

export default function AdminPage() {
  const [product, setProduct] = useState<Product>({
    id: '',
    name_en: '',
    name_ar: '',
    price: '',
    description_en: '',
    description_ar: '',
    image: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // تأكد إن المفتاح من نوع Product
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const res = await fetch('/api/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    alert(data.message || 'Product added!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      {(Object.keys(product) as (keyof Product)[]).map((key) => (
        <input
          key={key}
          className="block mb-2 w-full border p-2 rounded"
          name={key}
          placeholder={key}
          value={product[key]}
          onChange={handleChange}
        />
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Add
      </button>
    </form>
  );
}

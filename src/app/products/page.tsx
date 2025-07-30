"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import i18n from "../../i18n";
import { db } from "../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function AllProductsPage() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number | string;
  image: string;
  slug: string;
  brand?: string;
}

const [productsData, setProductsData] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProductsData(products);
    } catch (err) {
      console.error("Firestore fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  if (loading)
    return <div className="text-center py-10 text-[#003D99]">{t("loading")}...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        {t("error_loading_products") || "حدث خطأ أثناء تحميل المنتجات."}
      </div>
    );

  return (
    <section className="py-16 px-4 md:px-12 bg-[#F4F8FF] w-full">
      <h2 className="text-2xl font-bold text-[#0056D2] mb-8 text-center">
        {t("all_products_title") || "جميع المنتجات"}
      </h2>

      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {productsData.map((product) => (
          <Link href={`/products/${product.slug}`} key={product.id}>
            <div className="bg-white border border-[#E0E7FF] rounded-xl p-4 shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer h-full">
              <img
                src={product.image}
                alt={product.name_ar || product.name_en}
                className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm"
              />
              <h3 className="text-base font-semibold text-[#0056D2] mb-1 truncate">
                {isArabic ? product.name_ar : product.name_en}
              </h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {isArabic ? product.description_ar : product.description_en}
              </p>
              <p className="text-[#0056D2] font-bold text-sm">
                {parseFloat(String(product.price)).toFixed(2)}
 {isArabic ? "ر.س" : "SAR"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

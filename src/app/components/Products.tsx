"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import i18n from "../../i18n";
import { db } from "../lib/firebaseConfig";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// 1. Define Product Type
interface ProductType {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  image: string;
  bestSelling?: boolean;
  likes?: number;
}

export default function Products() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [productsData, setProductsData] = useState<ProductType[]>([]);
  const [likedProducts, setLikedProducts] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 2. Handle Likes
  const handleLike = async (productId: string) => {
    const isLiked = likedProducts[productId];
    const productRef = doc(db, "products", productId);

    try {
      await updateDoc(productRef, {
        likes: increment(isLiked ? -1 : 1),
      });

      setProductsData((prev) =>
        prev.map((product) =>
          product.id === productId
            ? {
                ...product,
                likes: (product.likes || 0) + (isLiked ? -1 : 1),
              }
            : product
        )
      );

      setLikedProducts((prev) => ({
        ...prev,
        [productId]: !isLiked,
      }));
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  // 3. Fetch Data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCol = collection(db, "products");
        const snapshot = await getDocs(productsCol);
        const products: ProductType[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            slug: data.slug,
            name_en: data.name_en,
            name_ar: data.name_ar,
            description_en: data.description_en,
            description_ar: data.description_ar,
            price: Number(data.price),
            image: data.image,
            bestSelling: data.bestSelling,
            likes: data.likes ?? 0, // important fallback
          };
        });

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
      <h2 className="text-2xl font-bold text-[#0056D2] mb-1 text-center">
        {t("products_title")}
      </h2>
      <p className="text-sm text-gray-500 capitalize mb-6 text-center">
        {t("brand_message") || "رحلة تستحق التجربة"}
      </p>

      {/* Scrollable Container */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {productsData.map((product) => (
          <Link href={`/products/${product.slug}`} key={product.id}>
            <div className="relative min-w-[250px] max-w-[250px] bg-white border border-[#E0E7FF] rounded-xl p-4 shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer h-full">

              {/* Best Seller */}
              {product.bestSelling && (
                <span className="absolute top-2 left-2 bg-[#FFD700] text-white text-xs font-bold px-2 py-1 rounded">
                  {isArabic ? "الأكثر مبيعًا" : "Best Seller"}
                </span>
              )}

              {/* Image */}
              <img
                src={product.image}
                alt={product.name_ar || product.name_en}
                className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm"
              />

              {/* Name */}
              <h3 className="text-base font-semibold text-[#0056D2] mb-1 truncate">
                {isArabic ? product.name_ar : product.name_en}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {isArabic ? product.description_ar : product.description_en}
              </p>

              {/* Price */}
              <p className="text-[#0056D2] font-bold text-sm mb-2">
                {product.price.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
              </p>

              {/* Like Count */}
              {/* Like Button + Count (new position) */}
<div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
  <button
    onClick={(e) => {
      e.preventDefault();
      handleLike(product.id);
    }}
    className="text-xl focus:outline-none"
  >
    {likedProducts[product.id] ? (
      <AiFillHeart className="text-red-500" />
    ) : (
      <AiOutlineHeart className="text-red-500 opacity-50 hover:opacity-100 transition" />
    )}
  </button>
  <span>{product.likes}</span>
</div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

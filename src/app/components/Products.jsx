"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import i18n from "../../i18n";

export default function BrandsProducts() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // حالة الخطأ

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        // تأكد إن الـ data فعلاً Array
        if (Array.isArray(data)) {
          setProductsData(data);
        } else if (Array.isArray(data.products)) {
          // لو رجعها جوا Object باسم products
          setProductsData(data.products);
        } else {
          console.error("Unexpected response:", data);
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // تقسيم المنتجات حسب البراند
  const groupedProducts = Array.isArray(productsData)
    ? productsData.reduce((acc, product) => {
        if (!acc[product.brand]) acc[product.brand] = [];
        acc[product.brand].push(product);
        return acc;
      }, {})
    : {};

  if (loading) return <div className="text-center py-10">{t("loading")}...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{t("error_loading_products") || "حدث خطأ أثناء تحميل المنتجات."}</div>;

  return (
    <section className="py-10 px-4 md:px-12">
{Object.entries(groupedProducts).map(([brandName, products], index) => (
  <div
    key={brandName}
    className={`mb-16 p-6 rounded-xl relative overflow-hidden shadow-xl group`}
  >
    {/* خلفية متحركة حسب الـ brand */}
    <div
      className={`absolute inset-0 z-0 opacity-20 animate-backgroundWave blur-2xl rounded-xl`}
      style={{
        background: brandName.includes("bonn")
          ? "linear-gradient(135deg, #0058d2, #78c7ff)"
          : brandName.includes("medix")
          ? "linear-gradient(135deg, #ff7e5f, #feb47b)"
          : "linear-gradient(135deg, #6a11cb, #2575fc)"
      }}
    />

    <h2 className="text-3xl font-bold text-white relative z-10 mb-6 drop-shadow-md">
      {brandName}
    </h2>

    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10"
    >
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <div className="bg-white rounded-md shadow-md p-4 hover:shadow-xl transition duration-300 cursor-pointer h-full">
            <img
              src={product.image}
              alt={product.name_ar || product.name_en}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-sm text-gray-500 mb-1">
              {isArabic ? product.description_ar : product.description_en}
            </p>
            <h3 className="font-semibold text-lg mb-1">
              {isArabic ? product.name_ar : product.name_en}
            </h3>
            <p className="text-[#4ca1ff] font-bold">
              {parseFloat(product.price).toFixed(2)} {isArabic ? "ر.س" : "SAR"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
))}

    </section>
  );
}

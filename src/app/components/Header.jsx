"use client";

import Fuse from 'fuse.js';
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Image from 'next/image';

export default function FactoryHeader() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  const factories = [
    {logo:" " , name: "Covix Care", color: "pink", glow: "glow-pink" },
    {logo:" " , name: "Rubin", color: "yellow", glow: "glow-yellow" },
    {logo:" " , name: "B1Care", color: "green", glow: "glow-green" },
    {logo:" " , name: "Le Visage Plus", color: "sky", glow: "glow-sky" },
    {logo:" " , name: "PuCare", color: "red", glow: "glow-red" },
    {logo:" " , name: "Luxury", color: "purple", glow: "glow-purple" },
  ];

  const navItems = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "products", path: "/products" },
    { key: "certifications", path: "/certifications" },
    { key: "contact", path: "/contact" },
  ];

  const mockProducts = [
    {
      name: { en: "Aloe Vera Face Cream", ar: "كريم وجه بالصبار" },
      slug: "aloe-vera-face-cream",
      image: "/images/products/aloe.jpg",
      price: 35,
      description: { en: "Hydrating cream with aloe", ar: "كريم مرطب بالصبار" },
    },
    {
      name: { en: "Keratin Hair Serum", ar: "سيروم كيراتين للشعر" },
      slug: "keratin-hair-serum",
      image: "/images/products/keratin.jpg",
      price: 50,
      description: { en: "Strengthens hair", ar: "يقوي الشعر ويمنع التقصف" },
    },
    {
      name: { en: "Men's Aftershave Balm", ar: "بلسم بعد الحلاقة للرجال" },
      slug: "mens-aftershave-balm",
      image: "/images/products/aftershave.jpg",
      price: 45,
      description: { en: "Soothing balm", ar: "بلسم مهدئ بعد الحلاقة" },
    }
  ];

  const fuse = new Fuse(mockProducts, {
    keys: ["name.en", "name.ar"],
    threshold: 0.4,
  });

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setSearchError("");
      return;
    }
    const results = fuse.search(searchTerm);
    if (results.length > 0) {
      setSearchResults(results.map((r) => r.item));
      setSearchError("");
    } else {
      setSearchResults([]);
      setSearchError(t("productNotFound"));
    }
  }, [searchTerm]);

  const handleSearchAction = () => {
    if (searchResults.length > 0) {
      router.push(`/products/${searchResults[0].slug}`);
      setSearchTerm("");
    } else {
      setSearchError(t("productNotFound"));
    }
  };

  const switchLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/90 backdrop-blur-md shadow-md" dir="ltr">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative">
        <div className="flex items-center gap-4 lg:gap-18">
<Link href="/" className="text-2xl font-bold text-[#0056D2]">
<Image src="/images/logo.png" alt="company logo" width="70" height="70"/>
</Link>

        {/*Search Bar */}
        <div className="max-[768px]:hidden relative">
            <div className="flex items-center gap-2">
              <div className="relative">
                <FaSearch
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-[#0056D2] cursor-pointer"
                  onClick={handleSearchAction}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchAction()}
                  placeholder={t("searchProduct")}
                  className="w-[250px] max-[850px]:w-[190px] pl-8 text-sm px-3 py-1 border border-[#0056D2] rounded hover:bg-[#0058d210] transition"
                />
              </div>
              
              <button
                onClick={switchLanguage}
                className=" w-[60px] h-[30px] rounded-sm text-[#0056D2] cursor-pointer border border-[#0056D2] hover:bg-[#0058d210] transition"
                aria-label="Switch Language"
              >
                  {i18n.language === "ar" ? "العربية" : "English"}
              </button>
            </div>
            {searchTerm && (
              <div className="absolute z-50 bg-white border border-gray-200 rounded shadow-md mt-1 w-[250px] max-[850px]:w-[190px] max-h-60 overflow-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
            <Link
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
              key={product.slug}
              href={`/products/${product.slug}`}
              className="flex items-center p-2 hover:bg-gray-100 transition"
            >
              <img
                src={product.image}
                alt={product.name[i18n.language]}
                className="w-10 h-10 rounded object-cover mr-2"
              />
              <div className="text-sm pr-5 pl-5">
                <div className="font-medium text-gray-900">{product.name[i18n.language]}</div>
                <div className="text-gray-500">{product.description[i18n.language]}</div>
                <div className="text-[#0056D2] font-bold mt-1">{product.price}  {i18n.language === "ar" ? "ر.س" : "SAR"}</div>
              </div>
            </Link>
                  ))
                ) : (
                  <div className="p-2 text-sm text-gray-600">{searchError}</div>
                )}
              </div>
            )}
          </div>
        </div>
        <nav className="hidden md:flex items-center lg:gap-6 md:gap-3">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.path}
              className={`relative font-medium transition-colors ${
                pathname === item.path
                  ? "text-[#0056D2] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#0056D2]"
                  : "text-gray-700 hover:text-[#0056D2]"
              } group`}
            >
              <span className="relative z-10">{t(item.key)}</span>
              <span className="absolute bottom-[-4] left-0 w-0 h-[2px] bg-[#0056D2] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}



          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => setBrandsOpen(!brandsOpen)}
          >
            
            <div className="flex flex-col items-center justify-center gap-[3px]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${brandsOpen ? "bg-[#0056D2]" : "bg-gray-700"}`}
                  animate={brandsOpen ? {
                    y: [0, -4, 0],
                    transition: { delay: i * 0.1, repeat: Infinity, duration: 0.6 }
                  } : {}}
                />
              ))}
            </div>
          </div>
        </nav>
        <AnimatePresence>
  {brandsOpen && (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.3 }}
      className="absolute right-[-20] top-full z-40 bg-white/90 p-4 rounded-xl shadow-xl w-[100%] mx-5"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {factories.map((factory) => (
          <Link
            key={factory.name}
            href={`/brands/${factory.name.toLowerCase()}`}
            className={`text-white text-sm text-center py-2 rounded-md relative overflow-hidden ${factory.glow}`}
            onClick={() => setIsOpen(false)}
          >
            {factory.name}
          </Link>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>
<button
  onClick={() => setIsOpen(!isOpen)}
  className="md:hidden text-gray-800 absolute top-6 right-4 z-50"
  aria-label="Toggle Menu"
>
  <motion.div
    initial={false}
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3 }}
  >
    {isOpen ? <IoCloseSharp size={36} /> : <HiOutlineMenuAlt3 size={36} />}
  </motion.div>
</button>

 {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-2xl z-40"
          >
<div className="flex items-center gap-3 px-6 pt-4">
  {/* Language Button */}
              <button
                onClick={switchLanguage}
                className=" w-[60px] h-[30px] rounded-sm text-[#0056D2] cursor-pointer border border-[#0056D2] hover:bg-[#0058d210] transition"
                aria-label="Switch Language"
              >
                  {i18n.language === "ar" ? "العربية" : "English"}
              </button>

  {/* Search Input */}
  <div className="relative flex-1">
    <FaSearch
      className="absolute left-2 top-1/2 -translate-y-1/2 text-[#0056D2] cursor-pointer"
      onClick={handleSearchAction}
    />
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearchAction()}
      placeholder={t("searchProduct")}
      className="w-full pl-8 text-sm px-3 py-1 border border-[#0056D2] rounded hover:bg-[#0058d24b] hover:text-white transition"
    />
    {searchTerm && (
      <div className="absolute z-50 bg-white border border-gray-200 rounded shadow-md mt-1 w-full max-h-60 overflow-auto">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <Link
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
              key={product.slug}
              href={`/products/${product.slug}`}
              className="flex items-center p-2 hover:bg-gray-100 transition"
            >
              <img
                src={product.image}
                alt={product.name[i18n.language]}
                className="w-10 h-10 rounded object-cover mr-2"
              />
              <div className="text-sm pr-5 pl-5">
                <div className="font-medium text-gray-900">{product.name[i18n.language]}</div>
                <div className="text-gray-500">{product.description[i18n.language]}</div>
                <div className="text-[#0056D2] font-bold mt-1">{product.price}  {i18n.language === "ar" ? "ر.س" : "SAR"}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-2 text-sm text-gray-600">{searchError}</div>
        )}
      </div>
    )}
  </div>
</div>



            <div className="flex flex-col p-6 space-y-4">
{navItems.map((item) => (
  <Link
    key={item.key}
    href={item.path}
    dir={i18n.language === "ar" ? "rtl" : "ltr"}
    className={`relative font-medium transition-colors flex items-center ${
      pathname === item.path
        ? "text-[#0056D2]"
        : "text-gray-700 hover:text-[#0056D2]"
    }`}
  >
    <span className="relative z-10">
      {t(item.key)}
      {pathname === item.path && (
        <span
          className={`absolute h-[2px] bg-[#0056D2] bottom-0 ${
            i18n.language === "ar" ? "right-0" : "left-0"
          } w-full`}
        ></span>
      )}
      {pathname !== item.path && (
        <span
          className={`absolute h-[2px] bg-[#0056D2] bottom-0 w-0 group-hover:w-full transition-all duration-300 ${
            i18n.language === "ar" ? "right-0" : "left-0"
          }`}
        ></span>
      )}
    </span>
  </Link>
))}


              <div className="grid grid-cols-2 gap-3 mt-4">
                {factories.map((factory) => (
                  <Link
                    key={factory.name}
                    href={`/brands/${factory.name.toLowerCase()}`}
                    className={`text-white text-sm text-center py-2 rounded-md relative overflow-hidden ${factory.glow}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {factory.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
}
"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200 mt-10" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700"
      >
        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <Image src="/images/logo.png" alt="company logo" width={80} height={80} />
          <p className="text-sm leading-relaxed">
            {t("footer.description", "Your trusted partner in quality healthcare and cosmetics manufacturing.")}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[#0056D2] font-semibold text-lg">{t("footer.links", "Quick Links")}</h3>
          <Link href="/" className="hover:text-[#0056D2] transition">{t("home")}</Link>
          <Link href="/about" className="hover:text-[#0056D2] transition">{t("about")}</Link>
          <Link href="/products" className="hover:text-[#0056D2] transition">{t("products")}</Link>
          <Link href="/certifications" className="hover:text-[#0056D2] transition">{t("certifications")}</Link>
          <Link href="/contact" className="hover:text-[#0056D2] transition">{t("contact")}</Link>
        </div>

        {/* Social & Language */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#0056D2] font-semibold text-lg">{t("footer.followUs", "Follow Us")}</h3>
          <div className="flex gap-4 text-white">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-[#0056D2] p-2 rounded-full hover:scale-110 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-[#0056D2] p-2 rounded-full hover:scale-110 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[#0056D2] p-2 rounded-full hover:scale-110 transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-[#0056D2] p-2 rounded-full hover:scale-110 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </motion.div>

      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-100">
        © {new Date().getFullYear()} Bonn Medical Industries. {t("footer.rights", "All rights reserved.")}.
      </div>
    </footer>
  );
}

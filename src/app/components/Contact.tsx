"use client";

import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

export default function ContactUs() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: t("options.general"),
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10" dir="ltr">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold mb-2">{t("title")}</h2>
        <p className="text-gray-600">{t("subtitle")}</p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid md:grid-cols-2 gap-8"
      >
        {/* Contact Info */}
        <div className="space-y-6" dir={isArabic ? "rtl" : "ltr"}>
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-xl mt-1 text-blue-600" />
            <div>
              <h4 className="font-semibold">{t("address")}</h4>
              <p>{t("theAddress")}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-xl mt-1 text-blue-600" />
            <div>
              <h4 className="font-semibold">{t("email")}</h4>
              <p>marketing@bonnmed.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaPhone className="text-xl mt-1 text-blue-600" />
            <div>
              <h4 className="font-semibold">{t("phone")}</h4>
              <p dir="ltr">+966 5803 47173</p>
            </div>
          </div>
          <div className="flex items-start gap-4 ">
            <FaClock className="text-xl mt-1 text-blue-600" />
            <div>
              <h4 className="font-semibold">{t("hours")}</h4>
              <p>{t("workingHours")}</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t("fullName")}
            required
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            dir={isArabic ? "rtl" : "ltr"}
          />
          <input
            type="email"
            name="email"
            placeholder={t("emailAddress")}
            required
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            dir={isArabic ? "rtl" : "ltr"}
          />
          <input
            type="tel"
            name="phone"
            placeholder={t("optionalPhone")}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            dir={isArabic ? "rtl" : "ltr"}
          />
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <option>{t("options.general")}</option>
            <option>{t("options.support")}</option>
            <option>{t("options.partner")}</option>
            <option>{t("options.other")}</option>
          </select>
          <textarea
            name="message"
            placeholder={t("message")}
            rows={5}
            required
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 resize-none"
            dir={isArabic ? "rtl" : "ltr"}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {t("send")}
          </button>
          {submitted && <p className="text-green-600" dir={isArabic ? "rtl" : "ltr"}>{t("submit.success")}</p>}
        </form>
      </motion.div>

      {/* Google Map */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full h-[300px]"
      >
        <iframe
          className="w-full h-full rounded-xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.877538141653!2d46.8650137!3d24.5934222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2fa6d811694f33%3A0x80ba3dbcf1f625f7!2z2YXYtdmG2Lkg2KjZiNmGINmE2YTYtdmG2KfYudin2Kog2KfZhNi32KjZitipIEJvbm4gTWVkaWNhbCBJbmR1c3RyaWVz!5e0!3m2!1sen!2seg!4v1753894716909!5m2!1sen!2seg"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
}

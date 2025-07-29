"use client";

import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import i18n from "../../i18n";

export default function HeroVideo() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({
      x: isArabic ? [0, -25, 14, 0] : [0, 25, -14, 0],
      transition: { duration: 0.8 },
    });
  };

  const handleHoverEnd = () => {
    controls.start({ x: 0 });
  };

  return (
    <>
          <div className="margin-top"></div>
    <div className="relative w-full h-[40vh] min-[768px]:h-[60vh] overflow-hidden mt-[65px]">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/promo1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      <div className="relative z-20 h-full  align-center flex flex-row items-center max-[768px]:justify-center px-6 gap-10 text-white">
    
        <motion.div
          className="w-full align-center justify-center flex flex-col max-[768px]:text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h4 className="text-base md:text-lg uppercase tracking-widest text-[#4ca1ff] font-semibold mb-[-11px] p-1">
            {t("video-subtitle")}
          </h4>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {isArabic ? "جمال مصنع Bonn" : "Beauty by Bonn Factory"}
          </h1>

          <p className="text-sm mb-6 max-w-xl">
            {isArabic
              ? "مصنع Bonn متخصص في تصنيع مستحضرات التجميل بأعلى معايير الجودة العالمية. نستخدم أحدث التقنيات لإنتاج منتجات فعالة وآمنة."
              : "Bonn factory specializes in producing cosmetics with top global quality standards. We use advanced technologies to ensure safety and performance."}
          </p>

          <motion.button
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            className="w-fit relative group overflow-hidden border-2 border-[#4ca1ff] text-[#4ca1ff] px-6 py-2 rounded-lg backdrop-blur-md cursor-pointer hover:bg-[#4ca1ff] hover:text-white transition-colors duration-300"
          >
            <motion.div
              className="absolute -z-10 w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-r from-[#4ca1ff44] to-[#0056d244] blur-2xl opacity-30"
              animate={{ x: ["-50%", "50%", "-50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              animate={controls}
              className="flex items-center justify-center gap-2 font-semibold"
            >
              {t("button")}
              {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
    </>
  );
}
"use client";

import AnimatedBackground from "../components/AnimatedBackground";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";
import visionAnimation from "../../animations/Vision.json";
import missionAnimation from "../../animations/Mission.json";
import AboutAnimation from "../../animations/About.json";
import innovationAnimation from "../../animations/Innovation.json";
import ResponsAnimation from "../../animations/Respons.json";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import {
  FaEye,
  FaBullseye,
  FaTasks,
  FaLightbulb,
  FaInfoCircle,
} from "react-icons/fa";

function useTypingEffect(texts: string[], typingSpeed = 100, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= texts.length) return;

    const currentText = texts[index];
    if (!deleting && subIndex === currentText.length) {
      setTimeout(() => setDeleting(true), pauseTime);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setDisplayText(currentText.substring(0, subIndex));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting]);

  return displayText;
}

export default function AboutUsPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const typingText = useTypingEffect([
    t("whoWeAre"),
    t("weAreDifferent"),
    t("bmiIsFuture"),
  ]);

  return (
    <>
      <Head>
        <title>
          {t("about.pageTitle") || "About Us | Bonn Medical Industries"}
        </title>
      </Head>
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="w-full mt-10 px-4 md:px-20 py-16 text-[#1A3351] bg-gradient-to-b from-[#DCEEFF]/70 via-white/30 to-white
"
      >
                 <AnimatedBackground />
        {/* Page Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#003D99] mb-24 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("about_title") || "About Us"}
        </motion.h2>

        <div className="space-y-24">
          {/* About Section */}
         <motion.div
  className="flex flex-col md:grid md:grid-cols-2 items-center md:gap-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
            {/* Text */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaInfoCircle className="text-3xl text-[#0056D2]" />
                <h2 className="text-5xl font-extrabold min-h-[48px] drop-shadow-md">
                  {typingText}
                  <span className="blinking-cursor">|</span>
                </h2>
              </div>
              <p className="text-lg leading-relaxed">{t("p1")}</p>
              <p className="text-lg leading-relaxed">{t("p2")}</p>
              <p className="text-lg leading-relaxed">{t("p3")}</p>
              <p className="text-lg leading-relaxed">{t("p4")}</p>
            </div>
            {/* Media */}
<div className="flex justify-center">
  <Lottie
    animationData={AboutAnimation}
    loop
    autoplay
    style={{ height: '450px', width: '450px' }}
  />
</div>


          </motion.div>

          {/* Vision Section */}
          <motion.div
  className="flex flex-col-reverse md:grid md:grid-cols-2 items-center md:gap-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
            {/* Media */}
<div className="flex justify-center">
  <Lottie
    animationData={visionAnimation}
    loop
    autoplay
    style={{ height: '450px', width: '450px' }}
  />
</div>


            {/* Text */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaEye className="text-4xl text-[#0056D2]" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  {t("visionTitle")}
                </h2>
              </div>
              <p className="text-lg leading-relaxed">{t("visionText")}</p>
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div
  className="flex flex-col md:grid md:grid-cols-2 items-center md:gap-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
            {/* Text */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaBullseye className="text-4xl text-[#0056D2]" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  {t("missionTitle")}
                </h2>
              </div>
              <p className="text-lg leading-relaxed">{t("missionText")}</p>
            </div>
            {/* Media */}
<div className="flex justify-center">
  <Lottie
    animationData={missionAnimation}
    loop
    autoplay
    style={{ height: '450px', width: '450px' }}
  />
</div>



          </motion.div>

          {/* Responsibilities Section */}
          <motion.div
  className="flex flex-col-reverse md:grid md:grid-cols-2 items-center md:gap-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
            {/* Media */}
<div className="flex justify-center">
  <Lottie
    animationData={ResponsAnimation}
    loop
    autoplay
    style={{ height: '450px', width: '450px' }}
  />
</div>



            {/* Text */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaTasks className="text-3xl text-[#0056D2]" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  {t("responsibilitiesTitle")}
                </h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>{t("responsibility1")}</li>
                <li>{t("responsibility2")}</li>
                <li>{t("responsibility3")}</li>
              </ul>
            </div>
          </motion.div>

          {/* Innovation Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Text */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaLightbulb className="text-3xl text-[#0056D2]" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  {t("innovationTitle")}
                </h2>
              </div>
              <p className="text-lg leading-relaxed">{t("innovationText")}</p>
            </div>
            {/* Media */}
<div className="flex justify-center">
  <Lottie
    animationData={innovationAnimation}
    loop
    autoplay
    style={{ height: '450px', width: '450px' }}
  />
</div>



          </motion.div>
        </div>
      </section>
    </>
  );
}

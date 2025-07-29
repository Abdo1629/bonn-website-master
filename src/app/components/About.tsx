"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useEffect , useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import clsx from "clsx";

const aboutImages = [
  "/images/bonn1.jpeg",
  "/images/bonn2.jpeg",
  "/images/bonn3.jpeg",
];

function CapabilityCard({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className="bg-[#F5F7FA] hover:bg-[#e4eaf1] transition rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md"
    >
      <h3 className="text-4xl font-extrabold text-[#0056D2] mb-2">
        {inView ? <CountUp end={value} duration={2} suffix={suffix} /> : "0"}
      </h3>
      <p className="text-sm text-[#003D99] font-medium">{label}</p>
    </div>
  );
}

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


export default function About() {
  
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollToImage = (index: number) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        left: scrollContainer.clientWidth * index,
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
  };

  const handleArrowClick = (dir: "next" | "prev") => {
    const newIndex =
      dir === "next"
        ? (activeIndex + 1) % aboutImages.length
        : (activeIndex - 1 + aboutImages.length) % aboutImages.length;
    scrollToImage(newIndex);
  };

          const typingText = useTypingEffect([
  t("whoWeAre"),
  t("weAreDifferent"),
  t("bmiIsFuture"),
]);


  return (
    <section className="w-full bg-gradient-to-br from-white to-[#F1F6FD] py-16 px-6 md:px-12">
      <div
        className=
          "flex flex-col-reverse md:flex-row items-center gap-10 md:flex-row-reverse"
      >
                {/* Carousel */}
        <div className="w-full md:w-1/2 relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory rounded-xl shadow-lg"
            style={{ scrollbarWidth: "none" }}
            onScroll={(e) => {
              const index = Math.round(
                e.currentTarget.scrollLeft / e.currentTarget.clientWidth
              );
              setActiveIndex(index);
            }}
          >
            {aboutImages.map((src, i) => (
              <div
                key={i}
                className="min-w-full h-80 snap-center relative"
              >
                <Image
                  src={src}
                  alt={`Slide ${i + 1}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => handleArrowClick("prev")}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white text-[#0056D2] p-2 rounded-full shadow hover:bg-gray-100"
            aria-label="Previous"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => handleArrowClick("next")}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white text-[#0056D2] p-2 rounded-full shadow hover:bg-gray-100"
            aria-label="Next"
          >
            <FaArrowRight />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {aboutImages.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToImage(i)}
                className={clsx(
                  "w-3 h-3 rounded-full",
                  i === activeIndex
                    ? "bg-[#0056D2]"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        </div>
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-[#003D99] space-y-6">
<h2 className="text-4xl font-extrabold min-h-[48px]">
  {typingText}
  <span className="blinking-cursor">|</span>
</h2>

          <p className="text-lg leading-relaxed text-[#1A3351]">
            {t("aboutParagraph1")}
          </p>
          <p className="text-lg leading-relaxed text-[#1A3351]">
            {t("aboutParagraph2")}
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CapabilityCard value={50} suffix="+" label={t("capability1")} />
            <CapabilityCard value={100000} suffix="+" label={t("capability2")} />
            <CapabilityCard value={100} suffix="%" label={t("capability3")} />
          </div>
        </div>
      </div>
    </section>
  );
}

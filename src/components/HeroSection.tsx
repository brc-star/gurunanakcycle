'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';

const heroImages = [
  { src: '/images/kids-cycle.jpg', alt: 'Mountain Bike' },
  { src: '/images/kids-ev.jpg', alt: 'Kids Electric Jeep' },
];

const trustBadges = {
  en: [
    { icon: '✅', text: '100% Genuine Brands' },
    { icon: '🔧', text: 'In-House Mechanic & EV Battery Support' },
    { icon: '💰', text: 'Best Showroom Price Guarantee' },
  ],
  hi: [
    { icon: '✅', text: '100% असली ब्रांड' },
    { icon: '🔧', text: 'इन-हाउस मैकेनिक और EV बैटरी सपोर्ट' },
    { icon: '💰', text: 'सर्वश्रेष्ठ शोरूम मूल्य गारंटी' },
  ],
};

const heroContent = {
  en: {
    headline: "Power Up Every Ride — From Mountain Trails to Kids' Dream EVs!",
    subtext: "Anupgarh's #1 Cycle & Kids EV Showroom — Trusted by 1000+ Families",
    ctaEv: 'Shop Kids EVs ⚡',
    ctaBike: 'Explore Bicycles 🚲',
  },
  hi: {
    headline: 'हर सवारी को पावर दें — माउंटेन ट्रेल्स से लेकर बच्चों के ड्रीम EVs तक!',
    subtext: 'अनूपगढ़ का #1 साइकिल और किड्स EV शोरूम — 1000+ परिवारों का भरोसा',
    ctaEv: 'किड्स EVs खरीदें ⚡',
    ctaBike: 'साइकिल देखें 🚲',
  },
};

export default function HeroSection() {
  const { language, setSelectedCategory } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const t = translations[language];
  const content = heroContent[language];
  const badges = trustBadges[language];

  const switchImage = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
      setIsFading(false);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(switchImage, 4000);
    return () => clearInterval(interval);
  }, [switchImage]);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E11D48]/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#84CC16]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Headline */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
                {content.headline}
              </h2>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
                {content.subtext}
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 shadow-sm"
                >
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button
                onClick={() => setSelectedCategory('Kids Electric Cars')}
                className="rounded-xl bg-[#E11D48] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#E11D48]/25 hover:bg-[#BE123C] active:scale-95 transition-all"
              >
                {content.ctaEv}
              </button>
              <button
                onClick={() => setSelectedCategory('Mountain & Gear Cycles')}
                className="rounded-xl bg-[#84CC16] px-6 py-3 text-sm sm:text-base font-bold text-slate-900 shadow-lg shadow-[#84CC16]/25 hover:bg-[#65A30D] active:scale-95 transition-all"
              >
                {content.ctaBike}
              </button>
            </div>
          </div>

          {/* Right: Image showcase */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-700">
              {heroImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    activeImage === idx
                      ? isFading
                        ? 'opacity-0'
                        : 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Dot indicators */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsFading(true);
                    setTimeout(() => {
                      setActiveImage(idx);
                      setIsFading(false);
                    }, 400);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeImage === idx
                      ? 'bg-[#E11D48] w-6'
                      : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

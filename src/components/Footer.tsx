'use client';

import React from 'react';
import { MapPin, Phone, Clock, Mail, MessageCircle, ExternalLink, ShieldCheck, Heart, Sparkles, Navigation } from 'lucide-react';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';

export default function Footer() {
  const { language, setSelectedCategory } = useStore();
  const t = translations[language];

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-slate-200 border-t border-slate-800">
      {/* Top Banner / Store Guarantee */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="text-2xl">🚲</span>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                {language === 'en' ? 'Pro Showroom Assembled' : 'शोरूम असेंबल्ड साइकिल'}
              </p>
              <p className="text-[11px] text-slate-400">100% Ride-Ready on Delivery</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                {language === 'en' ? 'EV Battery & Motor Lab' : 'EV बैटरी व मोटर सपोर्ट'}
              </p>
              <p className="text-[11px] text-slate-400">Guaranteed Genuine Spares</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="text-2xl">🚚</span>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                {language === 'en' ? 'Fast Regional Transit' : 'क्षेत्रीय फास्ट डिलीवरी'}
              </p>
              <p className="text-[11px] text-slate-400">Anupgarh, Ganganagar, Bikaner</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="text-2xl">🤝</span>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                {language === 'en' ? 'Direct WhatsApp Booking' : 'डायरेक्ट व्हाट्सएप बुकिंग'}
              </p>
              <p className="text-[11px] text-slate-400">Pay at Showroom or via UPI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🚲</span>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-white">
                  <span className="text-[#E11D48]">GURU NANAK</span> CYCLE
                </h3>
                <p className="text-[11px] text-[#84CC16] font-semibold">
                  गुरुनानक साइकिल स्टोर • Anupgarh
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {t.brandTagline}. Premier destination for Hero, pro MTBs, 12V 4x4 Jeep ride-ons, battery cruiser motorbikes, and toddler tricycles.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GST Registered Local Showroom</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#E11D48] pl-2.5">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('Mountain & Gear Cycles')}
                  className="hover:text-white transition-colors"
                >
                  🚵 {language === 'en' ? 'Mountain & Geared Bicycles' : 'माउंटेन व गियर साइकिल'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Kids Electric Cars')}
                  className="hover:text-white transition-colors"
                >
                  🚗 {language === 'en' ? 'Kids 4x4 Electric SUVs (12V)' : 'किड्स 12V इलेक्ट्रिक कारें'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Kids Electric Bikes')}
                  className="hover:text-white transition-colors"
                >
                  🏍️ {language === 'en' ? 'Kids Electric Cruiser Motorbikes' : 'किड्स इलेक्ट्रिक क्रूज़र बाइक'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Toddler Tricycles')}
                  className="hover:text-white transition-colors"
                >
                  🚲 {language === 'en' ? 'Toddler Tricycles & Walkers' : 'टॉडलर ट्राइसाइकिल और वॉकर'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('')}
                  className="hover:text-white transition-colors text-slate-300 font-semibold"
                >
                  ✨ {language === 'en' ? 'View Entire Flagship Catalog' : 'संपूर्ण कैटलॉग देखें'}
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom & Service Area */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#84CC16] pl-2.5">
              {language === 'en' ? 'Service Areas' : 'सेवा क्षेत्र'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'en'
                ? 'Instant Showroom Pickup in Anupgarh plus express delivery covering:'
                : 'अनूपगढ़ में तत्काल शोरूम पिकअप और निम्नलिखित क्षेत्रों में एक्सप्रेस डिलीवरी:'}
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Anupgarh', 'Raisinghnagar', 'Gharsana', 'Rawla', 'Vijaynagar', 'Suratgarh', 'Sri Ganganagar', 'Bikaner'].map((area) => (
                <span
                  key={area}
                  className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700"
                >
                  {area}
                </span>
              ))}
            </div>

            <div className="pt-2 text-xs space-y-1">
              <p className="text-white font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#84CC16]" />
                {t.showroomTimings}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-rose-500 pl-2.5">
              {t.contactUs}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                <span className="leading-snug">{t.showroomAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919414000000" className="hover:text-white transition-colors">
                  +91 94140-XXXXX / +91 98290-XXXXX
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/919414000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-emerald-400 font-semibold"
                >
                  WhatsApp: +91 94140-XXXXX
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>contact@gurunanakcycle.com</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Bikaner+Rd+near+old+Panchayat+Samiti+RCP+Colony+Anupgarh+Rajasthan+335701"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#E11D48]" />
                {t.getDirections}
              </a>
            </div>
          </div>
        </div>

        {/* Payment Preferences Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="text-xs text-slate-400">
              {language === 'en' ? 'Showroom Payment Accepted:' : 'भुगतान माध्यम स्वीकार्य:'}
            </span>
            <span className="bg-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded border border-slate-700 font-mono">
              📲 UPI / PhonePe / GPay
            </span>
            <span className="bg-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded border border-slate-700 font-mono">
              💵 Cash on Delivery
            </span>
            <span className="bg-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded border border-slate-700 font-mono">
              💳 Showroom EMI
            </span>
          </div>

          <p className="text-xs text-slate-500 text-center sm:text-right">
            Official Portal: <span className="text-slate-300 font-mono">https://gurunanakcycle.com</span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>{t.footerRights}</p>
          <p className="flex items-center gap-1">
            <span>Crafted for Anupgarh Families with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
}

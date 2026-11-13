'use client';

import React from 'react';
import { Bike, Wrench, Gift, MapPin, Clock, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';

export default function ShowroomSection() {
  const { language } = useStore();
  const t = translations[language];

  const features = [
    {
      icon: Bike,
      title: t.testRideTitle,
      desc: t.testRideDesc,
      tag: language === 'en' ? 'Live Courtyard Test Drives' : 'लाइव टेस्ट ड्राइव',
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50',
    },
    {
      icon: Wrench,
      title: t.serviceTitle,
      desc: t.serviceDesc,
      tag: language === 'en' ? 'Anupgarh Service Station' : 'अनूपगढ़ सर्विस स्टेशन',
      color: 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-200 dark:border-lime-900/50',
    },
    {
      icon: Gift,
      title: t.bulkTitle,
      desc: t.bulkDesc,
      tag: language === 'en' ? 'Birthday Surprise Specials' : 'स्पेशल गिफ्ट पैकिंग',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/70 dark:bg-slate-900/80 border-t border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-[#E11D48] text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'en' ? 'Local Trust & Quality Assurance' : 'स्थानीय विश्वास और गुणवत्ता की गारंटी'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.showroomServicesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.showroomServicesSubtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-xl border ${f.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#E11D48] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>
                    {language === 'en' ? 'Showroom Verified Support' : 'शोरूम सत्यापित सहायता'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Showroom Address Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700/60">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#84CC16]">
                {language === 'en' ? 'Direct Showroom Walk-in' : 'सीधे शोरूम पधारें'}
              </span>
              <h4 className="text-lg sm:text-xl font-bold flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-5 h-5 text-[#E11D48] shrink-0" />
                {t.showroomAddress}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {t.showroomTimings}
                </span>
                <span className="flex items-center gap-1 text-[#84CC16] font-semibold">
                  ⚡ 50+ Ride-On EVs Ready For Immediate Delivery
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://maps.google.com/?q=Bikaner+Rd+near+old+Panchayat+Samiti+RCP+Colony+Anupgarh+Rajasthan+335701"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/30 transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {t.getDirections}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

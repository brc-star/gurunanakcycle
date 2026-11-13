'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function WhatsAppButton() {
  const { language } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const defaultMsg = encodeURIComponent(
    "Hello Guru Nanak Cycle Store! I am visiting your website gurunanakcycle.com and would like to check product availability / prices at your Anupgarh showroom."
  );

  const label =
    language === 'en'
      ? 'Chat on WhatsApp with Showroom'
      : 'अनूपगढ़ शोरूम से व्हाट्सएप चैट करें';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="hidden sm:block bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl border border-slate-700 animate-fadeIn">
          {label}
        </div>
      )}

      {/* Pulsing button */}
      <a
        href={`https://wa.me/919414000000?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={label}
        className="relative group bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center pulse-glow"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
        <span className="sr-only">{label}</span>
      </a>
    </div>
  );
}

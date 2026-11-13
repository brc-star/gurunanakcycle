'use client';

import { useStore } from '@/lib/store';

export default function AnnouncementBar() {
  const { language } = useStore();

  const contentEn =
    '📍 Visit Our Showroom: Bikaner Rd, near old Panchayat Samiti, RCP Colony, Anupgarh (335701) | 🚚 Free Local Delivery in Anupgarh | ⚡ Battery Warranty & Full Service Support';
  const contentHi =
    '📍 हमारा शोरूम देखें: बीकानेर रोड, पुरानी पंचायत समिति के पास, RCP कॉलोनी, अनूपगढ़ (335701) | 🚚 अनूपगढ़ में मुफ़्त लोकल डिलीवरी | ⚡ बैटरी वारंटी और पूर्ण सर्विस सपोर्ट';

  const text = language === 'en' ? contentEn : contentHi;

  return (
    <div className="w-full bg-[#0F172A] text-white overflow-hidden select-none">
      <div className="relative flex whitespace-nowrap py-2">
        <div className="animate-marquee flex min-w-full shrink-0 items-center gap-8">
          <span className="text-xs sm:text-sm tracking-wide">{text}</span>
          <span className="text-xs sm:text-sm tracking-wide">{text}</span>
        </div>
        <div className="animate-marquee2 flex min-w-full shrink-0 items-center gap-8 absolute top-0 left-0 py-2">
          <span className="text-xs sm:text-sm tracking-wide">{text}</span>
          <span className="text-xs sm:text-sm tracking-wide">{text}</span>
        </div>
      </div>


    </div>
  );
}

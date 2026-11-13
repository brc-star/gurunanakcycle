'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';

const categories = [
  { value: '', label: 'All', labelHi: 'सभी' },
  { value: 'Mountain & Gear Cycles', label: 'Bicycles & MTBs', labelHi: 'साइकिल और MTB' },
  { value: 'Kids Electric Cars', label: 'Kids Electric Cars', labelHi: 'किड्स इलेक्ट्रिक कार' },
  { value: 'Kids Electric Bikes', label: 'Kids Electric Bikes', labelHi: 'किड्स इलेक्ट्रिक बाइक' },
  { value: 'Toddler Tricycles', label: 'Tricycles & Push Cars', labelHi: 'ट्राइसाइकिल और पुश कार' },
];

const ageGroups = [
  { value: '', label: 'All', labelHi: 'सभी' },
  { value: '1–3 Years', label: '1–3 Years (Toddlers)', labelHi: '1–3 वर्ष (टॉडलर)' },
  { value: '3-8', label: '3–8 Years (Kids EVs)', labelHi: '3–8 वर्ष (किड्स EV)' },
  { value: '8-14', label: '8–14 Years (Junior)', labelHi: '8–14 वर्ष (जूनियर)' },
  { value: '14+', label: '14+ & Adults', labelHi: '14+ और वयस्क' },
];

const priceRanges = [
  { value: '', label: 'All', labelHi: 'सभी' },
  { value: 'under2000', label: 'Under ₹2,500', labelHi: '₹2,500 से कम' },
  { value: '2000to5000', label: '₹2,500 – ₹8,000', labelHi: '₹2,500 – ₹8,000' },
  { value: '5000to10000', label: '₹8,000 – ₹20,000', labelHi: '₹8,000 – ₹20,000' },
  { value: 'above10000', label: '₹20,000+', labelHi: '₹20,000+' },
];

export default function FilterBar() {
  const {
    language,
    selectedCategory,
    setSelectedCategory,
    selectedAgeGroup,
    setSelectedAgeGroup,
    selectedPriceRange,
    setSelectedPriceRange,
    filteredProducts,
  } = useStore();

  const t = translations[language];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {language === 'en' ? '🎯 Find Your Perfect Ride' : '🎯 अपनी परफेक्ट राइड खोजें'}
          </h2>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {filteredProducts.length} {language === 'en' ? 'products' : 'उत्पाद'}
          </span>
        </div>

        {/* Age Group Filters */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            {t.filterAgeGroup}
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {ageGroups.map((ag) => (
              <button
                key={ag.value}
                onClick={() => setSelectedAgeGroup(ag.value)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                  selectedAgeGroup === ag.value
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {language === 'en' ? ag.label : ag.labelHi}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            {t.filterCategory}
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-shrink-0 border ${
                  selectedCategory === cat.value
                    ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-600/30'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-300 dark:hover:border-rose-700 hover:bg-rose-50 dark:hover:bg-slate-700'
                }`}
              >
                {language === 'en' ? cat.label : cat.labelHi}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filters */}
        <div>
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            {t.filterPriceRange}
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {priceRanges.map((pr) => (
              <button
                key={pr.value}
                onClick={() => setSelectedPriceRange(pr.value)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                  selectedPriceRange === pr.value
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {language === 'en' ? pr.label : pr.labelHi}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

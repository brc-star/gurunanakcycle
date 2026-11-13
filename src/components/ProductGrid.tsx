'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import ProductCard from '@/components/ProductCard';

export default function ProductGrid() {
  const { language, filteredProducts } = useStore();
  const t = translations[language];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
          {language === 'en' ? '🏪 Our Flagship Collection' : '🏪 हमारा फ्लैगशिप कलेक्शन'}
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {t.noProducts}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              {language === 'en'
                ? 'No products match your filters. Try adjusting your search.'
                : 'कोई उत्पाद आपके फ़िल्टर से मेल नहीं खाता। अपनी खोज समायोजित करें।'}
            </p>
          </div>
        )}
      </div>


    </section>
  );
}

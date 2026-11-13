'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, addToCart, setSelectedProduct } = useStore();
  const t = translations[language];

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const productName = language === 'hi' ? product.nameHi : product.name;
  const productCategory = language === 'hi' ? product.categoryHi : product.category;
  const productAgeGroup = language === 'hi' ? product.ageGroupHi : product.ageGroup;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0] || '');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProduct(product);
  };

  return (
    <div
      className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 dark:border-slate-700"
      onClick={() => setSelectedProduct(product)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={productName}
          fill
          className="object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badge Overlay */}
        <div
          className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
        >
          {product.badge}
        </div>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discountPercent}% {t.off}
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleQuickView}
            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-lg"
          >
            {t.viewDetails}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category & Age Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-[10px] font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded-full">
            {productCategory}
          </span>
          <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
            {productAgeGroup}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 leading-snug">
          {productName}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 dark:fill-slate-600 text-slate-200 dark:text-slate-600'}`}
            />
          ))}
          <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-1">(4.0)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-extrabold text-slate-900 dark:text-white">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
            ₹{product.mrp.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1 mb-3">
          <span
            className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span
            className={`text-xs font-medium ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
          >
            {product.inStock ? t.inStock : t.outOfStock}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}

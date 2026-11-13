'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { Product } from '@/lib/types';
import {
  X,
  ShoppingBag,
  Star,
  ShieldCheck,
  Zap,
  MessageCircle,
  Plus,
  Minus,
} from 'lucide-react';

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, addToCart, language } = useStore();
  const t = translations[language];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Reset state when product changes
  useEffect(() => {
    if (selectedProduct) {
      setSelectedImage(0);
      setSelectedColor(selectedProduct.colors[0] || '');
      setQuantity(1);
    }
  }, [selectedProduct]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    },
    [setSelectedProduct]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!selectedProduct) return null;

  const product: Product = selectedProduct;
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const savings = product.mrp - product.price;
  const productName = language === 'hi' ? product.nameHi : product.name;
  const productCategory = language === 'hi' ? product.categoryHi : product.category;
  const productAgeGroup = language === 'hi' ? product.ageGroupHi : product.ageGroup;
  const productDescription = language === 'hi' ? product.descriptionHi : product.description;
  const productSpecs = language === 'hi' ? product.specsHi : product.specs;
  const allImages = product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedColor);
    }
    setSelectedProduct(null);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in:\n\n*${product.name}*\nPrice: ₹${product.price.toLocaleString('en-IN')}\nColor: ${selectedColor}\nQuantity: ${quantity}\n\nPlease share more details.`
    );
    window.open(`https://wa.me/919XXXXXXXXX?text=${message}`, '_blank');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedProduct(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Image Gallery */}
          <div className="p-6 lg:p-8 flex flex-col">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
              <Image
                src={allImages[selectedImage]}
                alt={productName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Badge */}
              <div
                className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
              >
                {product.badge}
              </div>
            </div>

            {/* Thumbnail Selector */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-rose-600 shadow-lg'
                        : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${productName} view ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="p-6 lg:p-8 lg:border-l border-slate-100 dark:border-slate-800 overflow-y-auto">
            {/* Category & Age Badge */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2.5 py-1 rounded-full">
                {productCategory}
              </span>
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full">
                {productAgeGroup}
              </span>
            </div>

            {/* Product Name */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
              {productName}
            </h2>

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 dark:fill-slate-600 text-slate-200 dark:text-slate-600'}`}
                />
              ))}
              <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">(4.0)</span>
            </div>

            {/* Price Section */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-4">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-lg text-slate-400 dark:text-slate-500 line-through">
                  {t.mrpLabel} ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {discountPercent}% {t.off}
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  {t.youSave} ₹{savings.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
              {productDescription}
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {product.warranty && (
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span>
                    <span className="font-medium">{t.warranty}:</span> {product.warranty}
                  </span>
                </div>
              )}
              {product.maxWeight && (
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>
                    <span className="font-medium">{t.maxWeight}:</span> {product.maxWeight}
                  </span>
                </div>
              )}
              {product.frameSize && (
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>
                    <span className="font-medium">{t.frameSize}:</span> {product.frameSize}
                  </span>
                </div>
              )}
            </div>

            {/* Specifications Table */}
            <div className="mb-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                {t.specifications}
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden">
                {Object.entries(productSpecs).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`flex text-sm ${idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-850'}`}
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-300 w-1/3 py-2 px-3 border-r border-slate-100 dark:border-slate-700">
                      {key}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 flex-1 py-2 px-3">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {t.selectColor}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        selectedColor === color
                          ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 ring-2 ring-rose-600/30'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                {t.quantity}
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold text-slate-900 dark:text-white w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30"
              >
                <ShoppingBag className="w-5 h-5" />
                {t.addToCart} — ₹{(product.price * quantity).toLocaleString('en-IN')}
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-green-600/30"
              >
                <MessageCircle className="w-5 h-5" />
                {language === 'en' ? 'Book / Inquire on WhatsApp' : 'WhatsApp पर बुक / पूछताछ करें'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

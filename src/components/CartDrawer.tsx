'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, Truck, MapPin, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { DeliveryOption } from '@/lib/types';
import CheckoutForm from './CheckoutForm';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    discountSavings,
    language,
  } = useStore();

  const t = translations[language];

  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('pickup');
  const [showCheckout, setShowCheckout] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setShowCheckout(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const deliveryCharge =
    deliveryOption === 'pickup' ? 0 : 99; // default Anupgarh rate; outside handled in checkout
  const grandTotal = cartTotal + deliveryCharge;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col bg-white shadow-2xl dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-700">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
              🛒 {t.cart}
              {cartCount > 0 && (
                <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label={t.close}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {showCheckout ? (
            <CheckoutForm
              deliveryOption={deliveryOption}
              onBack={() => setShowCheckout(false)}
            />
          ) : (
            <>
              {/* Cart items — scrollable */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                    <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                      {t.cartEmpty}
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-red-700"
                    >
                      {t.continueShopping}
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                    {cart.map((item) => {
                      const lineTotal = item.product.price * item.quantity;
                      const itemName =
                        language === 'hi' ? item.product.nameHi : item.product.name;

                      return (
                        <li key={`${item.product.id}-${item.selectedColor}`} className="flex gap-3 py-3">
                          {/* Product image */}
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                            <Image
                              src={item.product.image}
                              alt={itemName}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <h3 className="text-sm font-semibold leading-tight text-gray-900 dark:text-white line-clamp-2">
                                {itemName}
                              </h3>
                              {item.selectedColor && (
                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                  {t.colors}: {item.selectedColor}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity controls */}
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity - 1)
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-6 text-center text-sm font-medium text-gray-900 dark:text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                  ₹{lineTotal.toLocaleString('en-IN')}
                                </p>
                                <p className="text-xs text-gray-400">
                                  ₹{item.product.price.toLocaleString('en-IN')} × {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="self-start rounded p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                            aria-label={t.removeFromCart}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Bottom sticky section */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-800/50">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{t.cartSubtotal}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Discount Savings */}
                  {discountSavings > 0 && (
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">{t.cartSavings}</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        − ₹{discountSavings.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {/* Delivery option selector */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {t.deliveryOption}
                    </p>

                    <label
                      className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 transition-colors ${
                        deliveryOption === 'pickup'
                          ? 'border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value="pickup"
                        checked={deliveryOption === 'pickup'}
                        onChange={() => setDeliveryOption('pickup')}
                        className="mt-0.5 accent-red-600"
                      />
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {language === 'hi'
                              ? 'फ्री शोरूम पिकअप'
                              : 'Free Showroom Pickup'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            RCP Colony, Anupgarh
                          </p>
                        </div>
                      </div>
                    </label>

                    <label
                      className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 transition-colors ${
                        deliveryOption === 'delivery'
                          ? 'border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value="delivery"
                        checked={deliveryOption === 'delivery'}
                        onChange={() => setDeliveryOption('delivery')}
                        className="mt-0.5 accent-red-600"
                      />
                      <div className="flex items-start gap-2">
                        <Truck className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {language === 'hi' ? 'होम डिलीवरी' : 'Home Delivery'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {language === 'hi'
                              ? '₹99 अनूपगढ़ / ₹199 बाहर'
                              : '₹99 for Anupgarh / ₹199 outside'}
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Grand Total */}
                  <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                      {t.cartTotal}
                    </span>
                    <span className="text-xl font-extrabold text-red-600 dark:text-red-400">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Proceed to Checkout */}
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="mt-3 w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-red-700 active:scale-[0.98]"
                  >
                    {t.checkout} →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

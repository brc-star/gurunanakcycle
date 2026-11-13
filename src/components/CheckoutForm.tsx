'use client';

import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, ShieldCheck, MapPin, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { DeliveryOption } from '@/lib/types';

interface CheckoutFormProps {
  deliveryOption: DeliveryOption;
  onBack: () => void;
}

const LOCAL_CITIES = [
  'Anupgarh (अनूपगढ़)',
  'RCP Colony, Anupgarh (RCP कॉलोनी)',
  'Raisinghnagar (रायसिंहनगर)',
  'Gharsana (घड़साना)',
  'Rawla Mandi (रावला मंडी)',
  'Sri Vijaynagar (श्री विजयनगर)',
  'Suratgarh (सूरतगढ़)',
  'Sri Ganganagar (श्रीगंगानगर)',
  'Hanumangarh (हनुमानगढ़)',
  'Bikaner (बीकानेर)',
  'Other / अन्य क्षेत्र',
];

export default function CheckoutForm({ deliveryOption: initialDelivery, onBack }: CheckoutFormProps) {
  const { cart, cartTotal, discountSavings, clearCart, setIsCartOpen, language } = useStore();
  const t = translations[language];

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedCity, setSelectedCity] = useState(LOCAL_CITIES[0]);
  const [customCity, setCustomCity] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>(initialDelivery);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'emi'>('upi');
  const [isOrdered, setIsOrdered] = useState(false);
  const [error, setError] = useState('');

  const deliveryCharge = deliveryOption === 'pickup' ? 0 : (selectedCity.includes('Anupgarh') ? 0 : 150);
  const grandTotal = cartTotal + deliveryCharge;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(language === 'en' ? 'Please enter your full name' : 'कृपया अपना पूरा नाम दर्ज करें');
      return;
    }
    if (!mobile.trim() || mobile.trim().length < 10) {
      setError(language === 'en' ? 'Please enter a valid 10-digit mobile number' : 'कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें');
      return;
    }
    setError('');

    const cityFinal = selectedCity.includes('Other') ? customCity || 'Other Rajasthan' : selectedCity;
    const paymentLabel =
      paymentMethod === 'upi'
        ? 'Instant UPI (PhonePe / GPay / Paytm)'
        : paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : 'Showroom Easy EMI';

    const deliveryLabel =
      deliveryOption === 'pickup'
        ? '⚡ Showroom Pickup (RCP Colony, Anupgarh)'
        : `🚚 Home Delivery to ${cityFinal} (₹${deliveryCharge})`;

    // Format itemized order message for WhatsApp
    let itemsText = '';
    cart.forEach((item, index) => {
      itemsText += `${index + 1}. *${item.product.name}*\n   - Colour: ${item.selectedColor}\n   - Qty: ${item.quantity}\n   - Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n`;
    });

    const message = `🚲 *NEW ORDER / INQUIRY — GURU NANAK CYCLE*
📍 *Store: Bikaner Rd, near old Panchayat Samiti, RCP Colony, Anupgarh (335701)*
🌐 *Website: gurunanakcycle.com*
---------------------------------------
👤 *Customer:* ${name}
📱 *Phone:* ${mobile}
📍 *Town/Area:* ${cityFinal}
🏠 *Address/Landmark:* ${address || 'Showroom Pickup'}

🛒 *ORDERED ITEMS:*
${itemsText}
---------------------------------------
💰 *Items Subtotal:* ₹${cartTotal.toLocaleString('en-IN')}
🎉 *Showroom Savings:* ₹${discountSavings.toLocaleString('en-IN')}
🚚 *Delivery:* ${deliveryLabel}
💳 *Total Payable:* ₹${grandTotal.toLocaleString('en-IN')}
💵 *Payment Mode:* ${paymentLabel}

Please confirm availability and share pickup/delivery schedule! Thank you.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919414000000?text=${encoded}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center h-full">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {language === 'en' ? 'Order Sent via WhatsApp!' : 'ऑर्डर व्हाट्सएप पर भेजा गया!'}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-sm">
          {language === 'en'
            ? 'Thank you! Our Anupgarh showroom team has received your inquiry. We will contact you immediately to coordinate pickup or delivery.'
            : 'धन्यवाद! हमारे अनूपगढ़ शोरूम को आपकी पूछताछ प्राप्त हो गई है। हम पिकअप या डिलीवरी के लिए आपसे तुरंत संपर्क करेंगे।'}
        </p>
        <button
          onClick={() => {
            setIsOrdered(false);
            setIsCartOpen(false);
          }}
          className="w-full bg-[#E11D48] text-white py-3 rounded-xl font-bold shadow-lg hover:bg-[#BE123C] transition-all"
        >
          {language === 'en' ? 'Back to Showroom' : 'शोरूम पर वापस जाएं'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-slate-800 dark:text-slate-100">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
        <button
          onClick={onBack}
          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {t.checkoutTitle}
        </h3>
      </div>

      {error && (
        <div className="p-3 text-xs bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg border border-rose-200 dark:border-rose-800">
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="space-y-4 text-sm">
        {/* Full Name */}
        <div>
          <label className="block font-semibold mb-1 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {t.yourName} *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#E11D48] outline-none"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-semibold mb-1 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {t.mobileNumber} *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-500 font-medium">+91</span>
            <input
              type="tel"
              required
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              placeholder={t.mobilePlaceholder}
              className="w-full pl-12 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#E11D48] outline-none"
            />
          </div>
        </div>

        {/* Delivery Option */}
        <div>
          <label className="block font-semibold mb-1 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {t.deliveryOption}
          </label>
          <div className="grid grid-cols-1 gap-2">
            <label
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                deliveryOption === 'pickup'
                  ? 'border-[#E11D48] bg-rose-50/50 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <input
                type="radio"
                name="deliveryOption"
                checked={deliveryOption === 'pickup'}
                onChange={() => setDeliveryOption('pickup')}
                className="mt-1 text-[#E11D48]"
              />
              <div className="text-xs">
                <span className="font-bold flex items-center gap-1 text-slate-900 dark:text-white">
                  ⚡ {t.storePickup}
                </span>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Bikaner Rd, RCP Colony, Anupgarh • Ready in 30 mins
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                deliveryOption === 'delivery'
                  ? 'border-[#E11D48] bg-rose-50/50 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <input
                type="radio"
                name="deliveryOption"
                checked={deliveryOption === 'delivery'}
                onChange={() => setDeliveryOption('delivery')}
                className="mt-1 text-[#E11D48]"
              />
              <div className="text-xs">
                <span className="font-bold flex items-center gap-1 text-slate-900 dark:text-white">
                  🚚 {t.homeDelivery}
                </span>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  Free in Anupgarh Town • Fast transit across Rajasthan
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Town / City Selection */}
        <div>
          <label className="block font-semibold mb-1 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {t.location}
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#E11D48] outline-none text-xs font-medium"
          >
            {LOCAL_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {selectedCity.includes('Other') && (
            <input
              type="text"
              placeholder="Enter your town/tehsil/district name"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#E11D48] outline-none text-xs"
            />
          )}
        </div>

        {/* Address / Landmark */}
        {deliveryOption === 'delivery' && (
          <div>
            <label className="block font-semibold mb-1 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {language === 'en' ? 'Street / Ward / Landmark' : 'गली / वार्ड / लैंडमार्क'}
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={language === 'en' ? 'e.g. Ward No. 4, near Water Tank, Anupgarh' : 'जैसे: वार्ड नं. 4, पानी की टंकी के पास, अनूपगढ़'}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#E11D48] outline-none text-xs"
            />
          </div>
        )}

        {/* Payment Preference */}
        <div>
          <label className="block font-semibold mb-1 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {t.paymentMethod}
          </label>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="text-[#E11D48]"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                📲 {t.upiPayment}
              </span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="text-[#E11D48]"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                💵 {t.cashOnDelivery}
              </span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'emi'}
                onChange={() => setPaymentMethod('emi')}
                className="text-[#E11D48]"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                💳 {t.showroomEmi}
              </span>
            </label>
          </div>
        </div>

        {/* Total calculation */}
        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t.cartSubtotal}</span>
            <span className="font-semibold">₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span>{t.cartSavings}</span>
            <span className="font-semibold">-₹{discountSavings.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Delivery</span>
            <span className="font-semibold">
              {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
            </span>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
            <span>{t.cartTotal}</span>
            <span className="text-[#E11D48]">₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Submit WhatsApp Button */}
        <button
          type="submit"
          className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all text-sm"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          {t.placeOrder}
        </button>

        <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          {language === 'en'
            ? '100% Secure Showroom Direct Booking • No Advance needed for local pickup'
            : '100% सुरक्षित शोरूम डायरेक्ट बुकिंग • लोकल पिकअप के लिए कोई एडवांस जरूरी नहीं'}
        </p>
      </form>
    </div>
  );
}

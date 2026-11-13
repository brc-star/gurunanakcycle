'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { Search, ShoppingBag, Sun, Moon, Menu, X } from 'lucide-react';

const categories = [
  { en: 'All', hi: 'सभी', value: '' },
  { en: 'Mountain & Gear Cycles', hi: 'माउंटेन और गियर साइकिल', value: 'Mountain & Gear Cycles' },
  { en: 'Kids Electric Cars', hi: 'किड्स इलेक्ट्रिक कार', value: 'Kids Electric Cars' },
  { en: 'Kids Electric Bikes', hi: 'किड्स इलेक्ट्रिक बाइक', value: 'Kids Electric Bikes' },
  { en: 'Toddler Tricycles', hi: 'टॉडलर ट्राइसाइकिल', value: 'Toddler Tricycles' },
];

export default function Header() {
  const {
    language,
    toggleLanguage,
    darkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    cartCount,
    setIsCartOpen,
  } = useStore();

  const t = translations[language];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white dark:bg-slate-900 transition-shadow duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main row */}
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Left: Brand */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🚲</span>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
              <span className="text-[#E11D48]">GURU NANAK</span>{' '}
              <span className="text-slate-800 dark:text-white">CYCLE</span>
            </h1>
          </div>

          {/* Center: Search bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/50 focus:border-[#E11D48] transition-all"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
              aria-label={darkMode ? t.lightMode : t.darkMode}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
              aria-label={t.cart}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E11D48] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Category pills row (desktop) */}
        <div className="hidden lg:flex items-center gap-2 pb-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-[#E11D48] text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {language === 'en' ? cat.en : cat.hi}
            </button>
          ))}
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/50 focus:border-[#E11D48] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Mobile slide-out menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <span className="font-bold text-[#E11D48]">{t.brandName}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {t.filterCategory}
            </p>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-[#E11D48] text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {language === 'en' ? cat.en : cat.hi}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              🌐 {t.language}
            </button>
            <button
              onClick={() => {
                toggleDarkMode();
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {darkMode ? t.lightMode : t.darkMode}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Product, CartItem, Language } from './types';
import { products } from './products';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  discountSavings: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Language
  language: Language;
  toggleLanguage: () => void;

  // Dark mode
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Search & filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedAgeGroup: string;
  setSelectedAgeGroup: (ageGroup: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;

  // Filtered products
  filteredProducts: Product[];

  // Product modal
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Language state
  const [language, setLanguage] = useState<Language>('en');

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  // Product modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart actions
  const addToCart = useCallback((product: Product, selectedColor: string) => {
    setCart((prev) => {
      const colorToUse = selectedColor || product.colors[0] || 'Standard';
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === colorToUse
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === colorToUse
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: colorToUse }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Computed cart values
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const discountSavings = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Math.max(0, item.product.mrp - item.product.price) * item.quantity,
        0
      ),
    [cart]
  );

  // Language toggle
  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  }, []);

  // Dark mode toggle
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
  }, []);

  // Filtered products logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          product.name.toLowerCase().includes(q) ||
          product.nameHi.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.categoryHi.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.badge.toLowerCase().includes(q) ||
          product.ageGroup.toLowerCase().includes(q) ||
          Object.values(product.specs).some((val) => val.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory) {
        if (selectedCategory === 'Bicycles & MTBs' || selectedCategory === 'Mountain & Gear Cycles') {
          if (product.category !== 'Mountain & Gear Cycles') return false;
        } else if (selectedCategory === 'Tricycles & Push Cars' || selectedCategory === 'Toddler Tricycles') {
          if (product.category !== 'Toddler Tricycles') return false;
        } else if (selectedCategory === 'Kids Electric Cars') {
          if (product.category !== 'Kids Electric Cars') return false;
        } else if (selectedCategory === 'Kids Electric Bikes') {
          if (product.category !== 'Kids Electric Bikes') return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Age group filter
      if (selectedAgeGroup) {
        if (selectedAgeGroup === '1-3' || selectedAgeGroup === '1–3 Years') {
          const match =
            product.ageGroup.includes('1') ||
            product.ageGroup.includes('2') ||
            product.ageGroup.includes('3') ||
            product.category === 'Toddler Tricycles';
          if (!match) return false;
        } else if (selectedAgeGroup === '3-8' || selectedAgeGroup === '3–8 Years') {
          const match =
            product.ageGroup.includes('2–7') ||
            product.ageGroup.includes('2–6') ||
            product.ageGroup.includes('5–9') ||
            product.ageGroup.includes('3') ||
            product.category.includes('Electric');
          if (!match) return false;
        } else if (selectedAgeGroup === '8-14' || selectedAgeGroup === '8–14 Years') {
          const match =
            product.ageGroup.includes('5–9') ||
            product.ageGroup.includes('12+') ||
            product.ageGroup.includes('Junior');
          if (!match) return false;
        } else if (selectedAgeGroup === '14+' || selectedAgeGroup === '14+ & Adults') {
          const match =
            product.ageGroup.includes('12+') ||
            product.ageGroup.includes('14+') ||
            product.ageGroup.includes('Adults');
          if (!match) return false;
        }
      }

      // Price range filter
      if (selectedPriceRange) {
        switch (selectedPriceRange) {
          case 'under2500':
            if (product.price >= 2500) return false;
            break;
          case '2500to8000':
            if (product.price < 2500 || product.price > 8000) return false;
            break;
          case '8000to20000':
            if (product.price < 8000 || product.price > 20000) return false;
            break;
          case 'above20000':
            if (product.price <= 20000) return false;
            break;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedAgeGroup, selectedPriceRange]);

  const value: StoreContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    discountSavings,
    isCartOpen,
    setIsCartOpen,
    language,
    toggleLanguage,
    darkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedAgeGroup,
    setSelectedAgeGroup,
    selectedPriceRange,
    setSelectedPriceRange,
    filteredProducts,
    selectedProduct,
    setSelectedProduct,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

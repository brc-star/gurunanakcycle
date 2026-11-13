'use client';

import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FilterBar from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import ShowroomSection from '@/components/ShowroomSection';
import Footer from '@/components/Footer';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Top Announcement & Local Trust Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Smart Header with live search & cart count */}
      <Header />

      {/* 3. High-Impact Split Hero Section */}
      <HeroSection />

      {/* 4. Interactive "Ride Finder" Quiz / Filter Bar */}
      <FilterBar />

      {/* 5. Pre-Loaded Product Catalog (8 Flagship Products) */}
      <ProductGrid />

      {/* 8. Anupgarh Showroom Experience & Service Section */}
      <ShowroomSection />

      {/* 9. Location Map & Contact Footer */}
      <Footer />

      {/* 6. Product Detail Modal & Quick Compare */}
      <ProductModal />

      {/* 7. Slide-Out Shopping Cart & Direct WhatsApp/UPI Checkout */}
      <CartDrawer />

      {/* Floating Direct WhatsApp Action */}
      <WhatsAppButton />
    </main>
  );
}

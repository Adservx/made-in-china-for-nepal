"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  UserCircle,
  TrendingUp,
  ChevronRight,
  Zap,
  Globe,
  LayoutGrid
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const { cart, user, logout } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Prepare products for the ticker - reduce cloning for performance
  const tickerProducts = [...products.slice(0, 8)];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-500"
    >
      {/* 1. Professional Navigation Bar */}
      <div className={`w-full transition-all duration-500 border-b ${isScrolled ? "bg-white/90 backdrop-blur-2xl border-slate-200/60 shadow-xl shadow-slate-200/20" : "bg-white/98 backdrop-blur-xl border-slate-100 shadow-sm"}`}>
        <div className="mx-auto max-w-[1536px] px-8 flex items-center h-20">

          {/* 1. Left Section: Elite Brand Signature */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-4 no-underline group">
              {/* Industrial 'M' Signature Mark */}
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-sm flex items-center justify-center border-t border-l transition-all duration-500 bg-slate-950 border-white/20 shadow-2xl`}>
                  <div className="flex items-end gap-[3px] pt-1">
                    <div className="w-[3px] h-5 bg-white rounded-t-[1px]"></div>
                    <div className="w-[3px] h-3 bg-rose-600 rounded-t-[1px]"></div>
                    <div className="w-[3px] h-5 bg-white rounded-t-[1px]"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-black tracking-[-0.03em] text-slate-950">
                    MADE IN CHINA
                  </span>
                  <span className="text-rose-600 text-lg font-black mx-0.5">/</span>
                  <span className="text-lg font-black tracking-[-0.03em] text-slate-400">
                    NEPAL
                  </span>
                </div>
                <div className="flex items-center gap-2 -mt-0.5">
                  <span className="text-[6px] font-black uppercase tracking-[0.5em] text-slate-950 opacity-40">
                    INSTITUTIONAL GRADE
                  </span>
                  <div className="w-6 h-[1px] bg-rose-600/30"></div>
                </div>
              </div>
            </Link>
          </div>

          {/* 2. Center Section: Desktop Nav Links - Perfectly Balanced */}
          <div className="flex-1 flex justify-center px-12">
            <nav className="hidden xl:flex items-center gap-10">
              {[
                { label: 'Marketplace', href: '/products' },
                { label: 'RFQ Sourcing', href: '/rfq' },
                { label: 'Supply Chain', href: '/logistics' },
                { label: 'Verified Factories', href: '/factories' }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative text-[11px] font-black uppercase tracking-[0.2em] no-underline transition-all group py-1 text-slate-500 hover:text-slate-900"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-rose-600">
                    {item.label}
                  </span>
                  <span className={`absolute -bottom-1 left-0 w-full h-[2px] transition-all duration-300 origin-left scale-x-[0.15] group-hover:scale-x-100 bg-slate-200 group-hover:bg-rose-600`}></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. Right Section: Action Strategy Group */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Minimalist Integrated Search */}
            <div className={`hidden lg:flex relative h-10 w-64 transition-all duration-500 group ${searchFocused ? "w-80" : ""}`}>
              <div className="absolute inset-0 rounded-full border transition-all duration-300 bg-slate-50 border-slate-200 group-hover:border-slate-300 group-hover:bg-slate-100/50"></div>
              <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-hover:scale-110 duration-300 text-slate-400 group-hover:text-rose-600" />
              <input
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full h-full bg-transparent border-none focus:ring-0 text-[11px] font-medium pl-10 pr-4 rounded-full text-slate-950 placeholder:text-slate-500"
                placeholder="Search solutions..."
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Intelligence Cart */}
              <Link href="/cart" className="relative group no-underline">
                <div className="p-2.5 rounded-full transition-all duration-300 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                  <ShoppingCart size={17} className="group-hover:scale-105 transition-transform" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Secure Auth Access */}
              <div className="h-6 w-[1px] bg-slate-200 hidden sm:block mx-1"></div>

              {user ? (
                <Link href="/account" className="flex items-center gap-3 p-0.5 rounded-full hover:opacity-80 transition-opacity no-underline group">
                  <Avatar className="h-9 w-9 border border-rose-600/30 group-hover:border-rose-600 transition-colors">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-rose-600 text-white font-bold text-[10px]">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="hidden sm:block text-[10px] font-black uppercase tracking-[0.15em] no-underline transition-all relative group text-slate-500 hover:text-slate-900"
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-rose-600">Login</span>
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] transition-all duration-300 origin-left scale-x-[0.2] group-hover:scale-x-100 bg-slate-300 group-hover:bg-rose-600"></span>
                  </Link>
                  <Link href="/register" className="h-10 px-6 rounded-full flex items-center justify-center transition-all bg-rose-600 text-white hover:bg-rose-700 hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-900/10 text-[10px] font-black uppercase tracking-widest no-underline">
                    Join Network
                  </Link>
                </div>
              )}

              <button className="xl:hidden p-2.5 rounded-full transition-all bg-slate-50 text-slate-950" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-slate-950 z-[200] flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-16">
              <span className="text-xl font-black text-white tracking-tighter">MIC<span className="text-rose-600">.</span>NEPAL</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border-none"><X size={20} /></button>
            </div>
            <nav className="flex flex-col gap-6">
              {['Catalog', 'Sourcing', 'Logistics', 'Account'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black text-white no-underline tracking-tighter hover:text-rose-600 transition-colors uppercase italic">{item}</Link>
              ))}
            </nav>
            <div className="mt-auto pt-8">
              <Link href="/rfq" className="w-full btn-modern-primary py-4 rounded-xl text-center no-underline text-xs flex items-center justify-center gap-2">
                <Zap size={14} fill="currentColor" /> POST RFQ
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}



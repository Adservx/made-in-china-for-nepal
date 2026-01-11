"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ShieldCheck, Zap, ChevronRight, Award } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 overflow-hidden relative w-full border-t border-white/5">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container-fluid-custom relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          {/* Brand Left */}
          <div className="space-y-6">
            <Link href="/" className="inline-block no-underline group">
              <div className="flex flex-col items-start leading-none">
                <span className="text-2xl font-black tracking-tighter text-white group-hover:text-rose-600 transition-colors duration-500">MIC<span className="text-rose-600">.</span>NEPAL</span>
                <span className="text-[8px] font-black tracking-[0.4em] uppercase text-white/20 mt-2 transition-all group-hover:text-white">Direct Sourcing Gateway</span>
              </div>
            </Link>
            <p className="text-sm max-w-xs text-slate-500 font-medium leading-relaxed tracking-tight">
              Connecting Nepal to Guangzhou&apos;s elite industrial core. Mission-critical procurement with verified governance.
            </p>
          </div>

          {/* Minimal Links Hub */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Ecosystem</h5>
              <ul className="space-y-3 list-none p-0 m-0">
                <li><Link href="/products" className="text-xs font-bold text-slate-500 hover:text-white transition-colors no-underline">Global Catalog</Link></li>
                <li><Link href="/rfq" className="text-xs font-bold text-slate-500 hover:text-white transition-colors no-underline">Source RFQ</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Liaison</h5>
              <ul className="space-y-3 list-none p-0 m-0">
                <li><span className="text-xs font-bold text-slate-500">Kathmandu, NP</span></li>
                <li><span className="text-xs font-bold text-slate-500">Guangzhou, CN</span></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Connect</h5>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="text-slate-600 hover:text-rose-600 transition-colors">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Ultra Minimal */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-rose-600/50" />
              <span>Verified ISO Protocol</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={14} className="text-emerald-500/50" />
              <span>Trade Bureau Approved</span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-slate-800">
            <span>© {currentYear}</span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors no-underline">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors no-underline">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


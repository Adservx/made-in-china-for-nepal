"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ShieldCheck, Zap, ChevronRight, Award } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-32 pb-20 overflow-hidden relative w-full border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-rose-600/5 blur-[250px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[200px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container-fluid-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 lg:gap-24 mb-24">
          {/* Brand Essence */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-12">
            <Link href="/" className="inline-block no-underline group">
              <div className="flex flex-col items-start leading-none">
                <span className="text-4xl font-black tracking-tighter text-white group-hover:text-rose-600 transition-colors duration-500">MIC<span className="text-rose-600">.</span>NEPAL</span>
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/30 mt-3 transition-all group-hover:text-white">DIRECT SOURCING GATEWAY</span>
              </div>
            </Link>
            <p className="text-xl leading-relaxed max-w-lg text-slate-400 font-medium tracking-tight">
              The institutional backbone for Nepal-China trade. Providing mission-critical access to Guangzhou&apos;s elite manufacturing sector with verified security.
            </p>

            <div className="flex flex-wrap gap-12 lg:gap-16 pt-4">
              <div className="flex flex-col">
                <span className="text-white text-5xl font-black tracking-tighter">500+</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mt-3">Verified Factories</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-5xl font-black tracking-tighter">12H</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mt-3">RFQ Turnaround</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-5xl font-black tracking-tighter">100%</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mt-3">Trade Security</span>
              </div>
            </div>

            <div className="flex space-x-6 pt-8">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:bg-rose-600 hover:text-white transition-all duration-500 border border-white/5 shadow-2xl">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-16">
            {/* Intelligence */}
            <div className="pt-4">
              <h4 className="text-white font-black mb-12 uppercase tracking-[0.4em] text-[11px] flex items-center gap-4">
                <div className="w-8 h-[2px] bg-rose-600 rounded-full"></div>
                Ecosystem
              </h4>
              <ul className="space-y-8 text-[15px] font-bold tracking-tight">
                <li><Link href="/products" className="text-slate-500 hover:text-white transition-colors no-underline block">Global Catalog</Link></li>
                <li><Link href="/#catalog" className="text-slate-500 hover:text-white transition-colors no-underline block">Trade Hub</Link></li>
                <li><Link href="/rfq" className="text-rose-600 hover:text-white transition-colors no-underline flex items-center gap-2 group">
                  <Zap size={14} className="fill-current group-hover:animate-pulse" />
                  Sourcing RFQ
                </Link></li>
              </ul>
            </div>

            {/* Logistics */}
            <div className="pt-4">
              <h4 className="text-white font-black mb-12 uppercase tracking-[0.4em] text-[11px] flex items-center gap-4">
                <div className="w-8 h-[2px] bg-rose-600 rounded-full"></div>
                Governance
              </h4>
              <ul className="space-y-8 text-[15px] font-bold tracking-tight">
                <li><Link href="#" className="text-slate-500 hover:text-white transition-colors no-underline block">Compliance Hub</Link></li>
                <li><Link href="#" className="text-slate-500 hover:text-white transition-colors no-underline block">Quality Standards</Link></li>
                <li><Link href="/tracking" className="text-slate-400 group flex items-center gap-2 hover:text-white transition-colors no-underline">
                  Live Tracking <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link></li>
              </ul>
            </div>

            {/* Operations */}
            <div className="pt-4 col-span-2 sm:col-span-1">
              <h4 className="text-white font-black mb-12 uppercase tracking-[0.4em] text-[11px] flex items-center gap-4">
                <div className="w-8 h-[2px] bg-rose-600 rounded-full"></div>
                Operations
              </h4>
              <div className="space-y-10">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Nepal Liaison</span>
                  <span className="text-white text-sm font-bold tracking-tight leading-relaxed">Baneshwor Business Hub, Level 4<br />Kathmandu, Nepal</span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Guangzhou Hub</span>
                  <span className="text-white text-sm font-bold tracking-tight leading-relaxed">Liwan District, Factory Site B<br />Guangzhou, China</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Compliance Layer */}
        <div className="pt-20 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
          <div className="flex flex-wrap justify-center items-center gap-12 text-slate-600">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-rose-600" />
              <span>Verified 9001 Standards</span>
            </div>
            <div className="flex items-center gap-3">
              <Award size={20} className="text-emerald-500" />
              <span>Nepal Trade Bureau Approved</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <p className="m-0 text-slate-700">© {currentYear} MIC.NEPAL. INSTITUTIONAL TRADE GROUP.</p>
            <div className="flex space-x-12 text-slate-700">
              <Link href="#" className="hover:text-white no-underline transition-colors uppercase tracking-[0.2em]">Privacy</Link>
              <Link href="#" className="hover:text-white no-underline transition-colors uppercase tracking-[0.2em]">Trade Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


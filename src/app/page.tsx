"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import TrendingSlider from "@/components/TrendingSlider";
import { products, categories } from "@/data/products";
import { ChevronRight, Zap, ShieldCheck, Award, Globe, ArrowRight, Search, Truck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">

      <div className="pt-20">
        {/* Market Intelligence Layer - Keep but optimize speed if needed */}
        <TrendingSlider products={products.slice(0, 10)} />

        {/* Re-imagined Hero: B2B Efficiency & Trust */}
        <section className="relative min-h-[85vh] flex items-center bg-white pt-10 pb-20 overflow-hidden">
          {/* Subtle Background - Improved Depth */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-50/30 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50/50 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

          <div className="container-fluid-custom relative z-10 w-full">
            <div className="grid lg:grid-cols-12 gap-16 xl:gap-24 items-center">

              {/* Main Narrative - Column 1-7 */}
              <div className="lg:col-span-7 space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100"
                >
                  <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Nepal-China Direct Protocol 2026
                  </span>
                </motion.div>

                <div className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-slate-950 leading-[0.9] tracking-tighter"
                  >
                    THE DIGITAL <br />
                    <span className="text-slate-200 italic">BRIDGE</span> TO <br />
                    GUANGZHOU.
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-slate-500 text-lg xl:text-xl max-w-2xl font-medium leading-relaxed tracking-tight"
                  >
                    Direct access to China&apos;s elite manufacturing sector. Verified logistics, integrated trade finance, and end-to-end supply chain governance for the Nepal market.
                  </motion.p>
                </div>

                {/* Integrated Search for B2B Utility */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative max-w-2xl group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-slate-900 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                  <div className="relative bg-white border border-slate-200 rounded-[1.5rem] p-2 flex items-center shadow-xl shadow-slate-200/40">
                    <div className="flex-1 flex items-center px-4">
                      <Search className="text-slate-400 mr-4" size={20} />
                      <input
                        type="text"
                        placeholder="Search factories, machinery, or components..."
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-950 font-medium placeholder:text-slate-400 text-sm py-3"
                      />
                    </div>
                    <button className="bg-slate-950 text-white px-8 py-3.5 rounded-[1.2rem] text-[11px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95">
                      Search Market
                    </button>
                  </div>
                </motion.div>

                <div className="flex flex-wrap items-center gap-12 pt-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-950 tracking-tighter">$2.4M+</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Trade Today</span>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-100 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-950 tracking-tighter">99.8%</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Quality Score</span>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-100 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-950 tracking-tighter">12H</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">RFQ Response</span>
                  </div>
                </div>
              </div>

              {/* Visual Anchor - Column 8-12 */}
              <div className="lg:col-span-5 relative hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white/50 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
                      alt="Industrial Logistics"
                      fill
                      priority
                      className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                    {/* Floating Analytics Card */}
                    <div className="absolute bottom-10 left-10 right-10 p-8 glass-dark rounded-[2rem] border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/40">Market Authority</span>
                          <h4 className="text-white font-black text-lg tracking-tight">Verified Protocol</h4>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center">
                          <ShieldCheck size={20} className="text-white" />
                        </div>
                      </div>
                      <div className="h-[1px] bg-white/10 w-full mb-4"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-white/80 text-[11px] font-medium">99.8% Factory Compliance Record</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* B2B Core Features - Why it's "Best Tier" */}
        <section className="py-20 bg-slate-50/50 border-y border-slate-100">
          <div className="container-fluid-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: ShieldCheck,
                  title: "Direct Protocol",
                  desc: "Connect directly with tier-1 manufacturers in Guangzhou bypassing intermediaries.",
                  color: "rose"
                },
                {
                  icon: Truck,
                  title: "Verified Logistics",
                  desc: "End-to-end tracked shipping from China to Nepal with customs clearance support.",
                  color: "slate"
                },
                {
                  icon: Globe,
                  title: "Trade Finance",
                  desc: "Seamless payment systems tailored for international B2B transactions.",
                  color: "emerald"
                }
              ].map((feature, i) => (
                <div key={i} className="group p-10 rounded-[3rem] bg-white border border-slate-100 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2">
                  <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-50 text-${feature.color}-600 flex items-center justify-center mb-8 transition-colors group-hover:bg-rose-600 group-hover:text-white`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Priority: The Catalog Ecosystem */}
        <section id="catalog" className="py-32 bg-white relative">
          <div className="container-fluid-custom">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Refined B2B Sidebar */}
              <aside className="lg:w-80 shrink-0">
                <div className="sticky top-40 space-y-8">
                  <div className="p-10 rounded-[3.5rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/20 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-start gap-6">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                        <Zap size={18} className="text-rose-500" />
                      </div>
                      <h3 className="text-2xl font-black italic tracking-tighter leading-tight">Elite <br />Procurement.</h3>
                      <p className="text-[9px] text-white/40 uppercase tracking-[0.3em] font-black">24h Inquiry Response</p>
                      <Link href="/rfq" className="w-full btn-modern bg-white text-slate-950 hover:bg-rose-600 hover:text-white transition-all py-4 no-underline text-center rounded-2xl">Post RFQ</Link>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 p-8 rounded-[3rem] border border-slate-100">
                    <div className="flex items-center gap-4 mb-8 px-2">
                      <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">Industrial Segments</h3>
                    </div>
                    <nav className="flex flex-col gap-1">
                      {categories.map((cat) => (
                        <Link
                          key={cat}
                          href={`/category/${cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                          className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white hover:shadow-lg transition-all no-underline"
                        >
                          <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-950 uppercase tracking-widest transition-colors flex items-center gap-3">
                            <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-rose-500"></div>
                            {cat}
                          </span>
                          <ChevronRight size={12} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>

              {/* Enhanced Product Grid - High Visibility */}
              <div className="flex-1">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-8">
                  <div className="max-w-xl">
                    <div className="inline-block px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-6 border border-rose-100">
                      Live Inventory Tracker
                    </div>
                    <h2 className="text-4xl lg:text-7xl font-black text-slate-950 tracking-tighter leading-none mb-6">
                      Institutional <br /><span className="text-slate-200 italic">Grade Stocks.</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-medium tracking-tight">Direct procurement from verified factories in the Guangzhou-Pearl River Delta region.</p>
                  </div>
                  <Link href="/products" className="btn-modern btn-modern-outline bg-white px-10 h-14 rounded-2xl group no-underline border-slate-200 hover:border-rose-600">
                    Explore All <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {products.slice(0, 9).map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refined RFQ Section - Professional Intake */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div className="container-fluid-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-rose-600/10 border border-rose-600/20 flex items-center justify-center mb-10">
                  <Zap size={28} className="text-rose-600" />
                </div>
                <h2 className="text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">Fast-Track <br /><span className="text-rose-600 italic">Sourcing.</span></h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-1.5 h-12 bg-rose-600 rounded-full mt-1"></div>
                    <p className="text-white/60 text-lg leading-relaxed max-w-md font-medium">Bypass long procurement cycles. Our team in Guangzhou inspects and verifies every unit before shipping to Nepal.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-8">
                    {[
                      { label: "AVG RESPONSE", val: "125 Min" },
                      { label: "VERIFIED PLANTS", val: "850+" }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                        <p className="text-2xl font-black text-white italic tracking-tighter">{stat.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl relative group"
              >
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-rose-600 rounded-3xl flex items-center justify-center shadow-xl rotate-12 transition-transform group-hover:rotate-0">
                  <Award size={32} className="text-white" />
                </div>
                <h4 className="text-slate-950 font-black text-3xl mb-10 tracking-tighter">Request Quotation</h4>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Industrial Category</label>
                    <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-950 font-bold focus:outline-none focus:border-rose-600 transition-all" placeholder="e.g. Injection Molding Machine" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Est. Order Volume</label>
                      <input type="number" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-950 font-bold focus:outline-none focus:border-rose-600 transition-all" placeholder="500" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Target Port</label>
                      <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-950 font-bold focus:outline-none focus:border-rose-600 transition-all appearance-none cursor-pointer">
                        <option>Birgunj Dry Port</option>
                        <option>Bhairahawa</option>
                        <option>Kathmandu Air Cargo</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full btn-modern btn-modern-primary py-6 rounded-2xl text-[12px] shadow-2xl mt-4">Initiate Source Protocol</button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}



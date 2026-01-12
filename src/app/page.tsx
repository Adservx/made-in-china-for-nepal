"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import TrendingSlider from "@/components/TrendingSlider";
import { useRouter, useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import { ChevronRight, Zap, ShieldCheck, Award, Globe, ArrowRight, Search, Truck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const filteredProducts = products.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.supplier.toLowerCase().includes(q)
    );
  });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="bg-white min-h-screen">

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-20"
      >
        {/* Market Intelligence Layer - Keep but optimize speed if needed */}
        <motion.div variants={itemVariants}>
          <TrendingSlider products={products.slice(0, 10)} />
        </motion.div>

        {/* B2B Core Features - Why it's "Best Tier" */}
        <section className="py-20 bg-slate-50/50 border-y border-slate-100">
          <div className="container-fluid-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
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
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group p-10 rounded-[3rem] bg-white border border-slate-100 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-50 text-${feature.color}-600 flex items-center justify-center mb-8 transition-colors group-hover:bg-rose-600 group-hover:text-white`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Product Priority: The Catalog Ecosystem */}
        <section id="catalog" className="py-0 bg-white relative">
          <div className="container-fluid-custom">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
              {/* Refined B2B Sidebar */}
              <aside className="lg:w-72 shrink-0">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={sectionVariants}
                  className="sticky top-40 space-y-8"
                >

                  <div className="bg-slate-50/50 p-8 rounded-[3rem] border border-slate-100 relative overflow-hidden group/segments">
                    {/* High-end ambient glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/20 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>

                    <div className="flex items-center justify-between mb-8 px-2">
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">Industrial Segments</h3>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 font-bold tracking-widest">({categories.length})</span>
                    </div>

                    <nav className="flex flex-col gap-1.5 relative z-10">
                      {categories.map((cat, idx) => (
                        <Link
                          key={cat}
                          href={`/category/${cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                          className="group flex items-center justify-between h-12 pr-4 rounded-xl bg-white/40 border border-transparent hover:bg-white hover:border-slate-100 transition-all duration-300 no-underline"
                        >
                          <div className="flex items-center gap-4 pl-4">
                            <span className="text-[10px] font-mono text-slate-300 group-hover:text-rose-600 transition-colors font-bold w-4">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[9px] font-black text-slate-400 group-hover:text-slate-950 uppercase tracking-[0.15em] transition-all">
                              {cat}
                            </span>
                          </div>
                          <ChevronRight size={10} className="text-slate-300 group-hover:text-rose-600 transition-all group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Symmetrical Filter Module */}
                  <div className="bg-slate-50/50 p-8 rounded-[3rem] border border-slate-100">
                    <div className="flex items-center gap-4 mb-8 px-2">
                      <div className="w-1.5 h-6 bg-slate-950 rounded-full"></div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">Refine Sourcing</h3>
                    </div>

                    <div className="space-y-8">
                      {/* Price Index Filter */}
                      <div className="space-y-4 px-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Price Index (USD)</label>
                        <div className="flex items-center gap-2">
                          <input type="number" placeholder="Min" className="w-full bg-white border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-bold focus:outline-none focus:border-rose-600" />
                          <div className="w-2 h-[1px] bg-slate-200"></div>
                          <input type="number" placeholder="Max" className="w-full bg-white border border-slate-100 rounded-xl px-4 py-2 text-[10px] font-bold focus:outline-none focus:border-rose-600" />
                        </div>
                      </div>

                      {/* MOQ Filter */}
                      <div className="space-y-4 px-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Min Order Volume</label>
                        <div className="flex flex-wrap gap-2">
                          {["<100", "500+", "1k+", "5k+"].map((val) => (
                            <button key={val} className="px-3 py-1.5 rounded-lg border border-slate-100 bg-white text-[9px] font-black uppercase tracking-tighter text-slate-400 hover:border-rose-600 hover:text-rose-600 transition-all">
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Trade Compliance */}
                      <div className="space-y-4 px-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Trade Compliance</label>
                        <div className="space-y-3">
                          {[
                            "Verified Manufacturers",
                            "Immediate Dispatch",
                            "Logistics Support"
                          ].map((item) => (
                            <label key={item} className="flex items-center gap-3 cursor-pointer group">
                              <div className="w-4 h-4 rounded-md border-2 border-slate-200 bg-white group-hover:border-rose-600 transition-all flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-sm bg-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              </div>
                              <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-950 transition-colors uppercase tracking-tight">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <button className="w-full py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl">
                        Apply Protocol
                      </button>
                    </div>
                  </div>
                </motion.div>
              </aside>

              {/* Enhanced Product Grid - High Visibility */}
              <div className="flex-1">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={sectionVariants}
                  className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-0 gap-12"
                >
                  <div className="max-w-4xl">
                    <div className="inline-block px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-10 border border-rose-100">
                      Live Inventory Tracker
                    </div>
                    <h2 className="text-4xl lg:text-8xl font-black text-slate-950 tracking-tighter leading-[0.85] mb-8">
                      Institutional <span className="text-slate-200 italic font-medium">Grade Stocks.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium tracking-tight max-w-2xl leading-relaxed">Direct procurement from verified factories in the Guangzhou-Pearl River Delta region, optimized for high-volume enterprise distribution.</p>
                  </div>
                  <Link href="/products" className="btn-modern btn-modern-outline bg-white px-10 h-16 rounded-2xl group no-underline border-slate-200 hover:border-rose-600 flex items-center justify-center">
                    Explore All <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {filteredProducts.slice(0, 9).map((product, idx) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border border-slate-100">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching supplies found</p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>


      </motion.div>
    </div>
  );
}



"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, TrendingUp, ArrowRight, ArrowUpRight, Box } from 'lucide-react';

interface TrendingSliderProps {
    products: Product[];
}

const TrendingSlider: React.FC<TrendingSliderProps> = ({ products }) => {
    // Double the products for a seamless infinite loop
    const displayProducts = [...products, ...products];

    return (
        <section className="pt-8 pb-20 relative overflow-hidden bg-white">
            <div className="container-fluid-custom mb-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-4"
                        >
                            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-100">
                                <TrendingUp size={16} className="text-white" />
                            </div>
                            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-rose-600">Institutional Feed</span>
                        </motion.div>
                        <h2 className="text-4xl lg:text-7xl font-black text-slate-950 m-0 tracking-tighter leading-none">Market <span className="text-slate-200 italic">Velocity.</span></h2>
                    </div>
                    <div className="lg:w-1/3">
                        <p className="text-slate-400 text-base font-medium tracking-tight">
                            Live trade signals from Guangzhou&apos;s industrial core directly to Kathmandu&apos;s business infrastructure.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Refined Gradient Masking for better focus */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

                <div className="flex gap-8 px-6">
                    <motion.div
                        className="flex gap-8 pr-8 shrink-0"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: products.length * 5, // Consistent speed based on item count
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {displayProducts.map((product, idx) => (
                            <div key={`${product.id}-${idx}`} className="flex-shrink-0 w-[400px] group">
                                <Link href={`/product/${product.id}`} className="block no-underline">
                                    <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 transition-all duration-500 group-hover:shadow-2xl">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="400px"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Minimalist Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

                                        <div className="absolute top-6 left-6">
                                            <div className="px-3 py-1.5 rounded-lg glass-effect bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                                                <span className="text-[8px] font-black uppercase tracking-widest text-white">{product.category}</span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-8 left-8 right-8">
                                            <div className="flex items-center gap-3 text-rose-500 mb-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-xs">
                                                <ShieldCheck size={12} fill="currentColor" className="text-emerald-500 fill-emerald-500" />
                                                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.2em]">Verified Manufacturer</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white tracking-tight leading-tight mb-4 line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Index Price</span>
                                                    <p className="text-lg font-bold text-white tracking-tight">{product.price.split(' ')[1]}<span className="text-[9px] ml-1 text-white/40 font-normal">USD</span></p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1 text-right">Min Order</span>
                                                    <p className="text-sm font-bold text-white tracking-tight">{product.minOrder} Units</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrendingSlider;



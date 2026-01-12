"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, TrendingUp, ArrowRight, ArrowUpRight, Box } from 'lucide-react';

interface TrendingSliderProps {
    products: Product[];
}

const TrendingSlider: React.FC<TrendingSliderProps> = ({ products }) => {
    // Track if component has mounted to prevent hydration mismatch
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Double the products for a seamless infinite loop
    const displayProducts = [...products, ...products];

    return (
        <section className="pt-8 pb-20 relative overflow-hidden bg-white">
            <div className="container-fluid-custom mb-12">
                <div className="flex flex-col gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2.5 self-start"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></div>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 font-mono">Live Protocol</span>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-2xl lg:text-4xl font-black text-slate-950 tracking-tighter leading-none"
                        >
                            Global Assets. <span className="text-rose-600 italic font-medium">Direct Sourcing.</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="lg:max-w-xs"
                        >
                            <p className="text-slate-400 text-sm font-medium leading-relaxed tracking-tight">
                                Curated industrial flow from China hubs, optimized for Nepal.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Refined Gradient Masking for better focus */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

                <div className="flex gap-8 px-6">
                    <motion.div
                        className="flex gap-8 pr-8 shrink-0 transform-gpu"
                        style={{ willChange: "transform" }}
                        animate={isMounted ? { x: ["0%", "-50%"] } : { x: "0%" }}
                        transition={{
                            duration: products.length * 8, // Slightly slower for smoother perception
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {displayProducts.map((product, idx) => (
                            <div key={`${product.id}-${idx}`} className="flex-shrink-0 w-[420px] group">
                                <Link href={`/product/${product.id}`} className="block no-underline">
                                    <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 transition-shadow duration-500 group-hover:shadow-2xl">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="420px"
                                            className="object-cover transform-gpu"
                                            loading={idx < 4 ? "eager" : "lazy"}
                                        />

                                        {/* Simplified Overlay - Removed Blur for Performance */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                                        <div className="absolute top-6 left-6">
                                            <div className="px-3 py-1.5 rounded-lg bg-slate-950/40 border border-white/10 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                                                <span className="text-[8px] font-black uppercase tracking-widest text-white">{product.category}</span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-8 left-8 right-8">
                                            <div className="flex items-center gap-3 text-rose-500 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-xs">
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



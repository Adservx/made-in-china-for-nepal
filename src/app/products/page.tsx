"use client";

import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Zap, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("recommended");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    useEffect(() => {
        setSearchQuery(searchParams.get("q") || "");
    }, [searchParams]);

    const filteredProducts = products.filter((p) => {
        const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
        const matchesSearch = searchQuery
            ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.supplier.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
    });

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="container-fluid-custom">
                {/* Header Section */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-rose-600">Global Supply Chain</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-black text-slate-950 tracking-tighter leading-none mb-6"
                    >
                        Catalog <span className="text-slate-300">Hub.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg lg:text-xl font-medium tracking-tight max-w-2xl"
                    >
                        Verified factory-direct inventory from Guangzhou tailored for Nepal&apos;s industrial growth.
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="sticky top-32 space-y-10">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                                <h6 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-3 px-2">
                                    <Filter size={14} className="text-rose-600" /> Industries
                                </h6>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`w-full text-left px-5 py-3.5 rounded-xl text-[13px] font-bold transition-all border-none ${!selectedCategory ? "bg-slate-950 text-white shadow-lg" : "bg-transparent text-slate-500 hover:bg-rose-50 hover:text-rose-600"}`}
                                    >
                                        All Catalog
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-5 py-3.5 rounded-xl text-[13px] font-bold transition-all border-none ${selectedCategory === cat ? "bg-slate-950 text-white shadow-lg" : "bg-transparent text-slate-500 hover:bg-rose-50 hover:text-rose-600"}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* RFQ Promo */}
                            <div className="p-8 rounded-[2.5rem] bg-rose-600 text-white relative overflow-hidden shadow-2xl shadow-rose-200 group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <Zap size={100} />
                                </div>
                                <div className="relative z-10">
                                    <h5 className="font-black text-[10px] uppercase tracking-widest mb-3 text-white/60">Bulk Sourcing</h5>
                                    <p className="text-sm font-bold mb-8 leading-tight">Direct factory quotes for enterprise volume.</p>
                                    <Link href="/rfq" className="btn-modern bg-white text-rose-600 w-full py-3.5 rounded-2xl text-[9px] font-black no-underline block text-center uppercase tracking-widest hover:bg-slate-100 transition-colors">Start RFQ</Link>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        {/* Control Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 pb-8 border-b border-slate-100 gap-6">
                            <div>
                                <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-1">
                                    {selectedCategory || "Full Inventory"}
                                </h3>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    {filteredProducts.length} Verified Manufacturers
                                </p>
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="relative group flex-1 sm:w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search catalog..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
                                            }
                                        }}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-11 pr-4 text-xs font-bold focus:outline-none focus:border-rose-500/50 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                                <select
                                    className="bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 text-xs font-bold text-slate-600 outline-none focus:border-rose-500/50 shadow-inner cursor-pointer appearance-none"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="recommended">Best Match</option>
                                    <option value="price-low">Lowest Unit Cost</option>
                                    <option value="price-high">Highest Capacity</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid - Perfectly Aligned */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProducts.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Filter size={24} className="text-slate-300" />
                                </div>
                                <h4 className="font-black text-slate-400 text-lg">No matches found</h4>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Adjust your filters to see more manufacturers</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

"use client";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Zap, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

function ProductsPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("recommended");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    const supabase = createClient();

    useEffect(() => {
        setSearchQuery(searchParams.get("q") || "");
    }, [searchParams]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Fetch Categories
                const { data: categoriesData } = await supabase
                    .from("categories")
                    .select("*")
                    .order("name");
                setCategories(categoriesData || []);

                // Start building products query
                let query = supabase
                    .from("products")
                    .select("*, categories(name)");

                if (selectedCategory) {
                    query = query.eq("category_id", selectedCategory);
                }

                if (searchQuery) {
                    query = query.or(`name.ilike.%${searchQuery}%,supplier.ilike.%${searchQuery}%`);
                }

                const { data: productsData, error } = await query;

                if (error) throw error;

                let sortedData = [...(productsData || [])];
                if (sortBy === "price-low") {
                    sortedData.sort((a, b) => (a.price_min || 0) - (b.price_min || 0));
                } else if (sortBy === "price-high") {
                    sortedData.sort((a, b) => (b.price_max || 0) - (a.price_max || 0));
                }

                setProducts(sortedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [selectedCategory, searchQuery, sortBy, supabase]);

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
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`w-full text-left px-5 py-3.5 rounded-xl text-[13px] font-bold transition-all border-none ${selectedCategory === cat.id ? "bg-slate-950 text-white shadow-lg" : "bg-transparent text-slate-500 hover:bg-rose-50 hover:text-rose-600"}`}
                                        >
                                            {cat.name}
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
                                    {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "Full Inventory"}
                                </h3>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    {products.length} Verified Manufacturers
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

                        {/* Product Grid */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4">
                                <Loader2 className="w-10 h-10 text-rose-600 animate-spin" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Accessing Factory Assets...</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {products.map((product, idx) => (
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

                                {products.length === 0 && (
                                    <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                            <Filter size={24} className="text-slate-300" />
                                        </div>
                                        <h4 className="font-black text-slate-400 text-lg">No matches found</h4>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Adjust your filters to see more manufacturers</p>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={null}>
            <ProductsPageContent />
        </Suspense>
    );
}

"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchResults() {
            if (!query) {
                setResults([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from("products")
                    .select("*, categories(name)")
                    .or(`name.ilike.%${query}%,description.ilike.%${query}%,supplier.ilike.%${query}%`)
                    .eq('is_active', true);

                if (error) throw error;
                setResults(data || []);
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchResults();
    }, [query]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* Search Header */}
                <div className="mb-10">
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <li><Link href="/" className="hover:text-[#D81B12] transition-colors">Home</Link></li>
                            <li>/</li>
                            <li className="text-slate-900">Search</li>
                        </ol>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2 flex items-center gap-3">
                                <Search size={28} className="text-[#D81B12]" />
                                {query ? `Search Results for "${query}"` : "Global Sourcing Search"}
                            </h1>
                            <p className="text-slate-500 font-medium">
                                {loading ? "Scanning digital catalog..." : `We found ${results.length} industrial solutions for your request.`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <Loader2 className="w-10 h-10 text-[#D81B12] animate-spin" />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Searching the index...</p>
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {results.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="max-w-md mx-auto bg-white rounded-[2rem] shadow-premium p-12 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6">
                            <Search size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">No matching resources</h2>
                        <p className="text-slate-500 font-medium mb-8">Try searching with broader terms or check our certified categories.</p>
                        <Link href="/products" className="inline-flex h-12 px-8 rounded-full bg-[#D81B12] text-white items-center justify-center font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-red-100">
                            Browse Catalog
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-32 text-center">
                <Loader2 className="w-10 h-10 text-[#D81B12] animate-spin mx-auto" />
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}

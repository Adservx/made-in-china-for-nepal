"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Star, ShieldCheck, MapPin, CheckCircle, MessageSquare, Loader2 } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const sampleSellers = [
    { id: "1", name: "Jiangsu Green Energy Co., Ltd.", location: "Jiangsu, China", verified: true, rating: 4.8, years: 8, supplierName: "Jiangsu Green Energy Co., Ltd." },
    { id: "2", name: "Shenzhen Tech Innovations", location: "Shenzhen, China", verified: true, rating: 4.5, years: 5, supplierName: "Shenzhen Tech Innovations" },
    { id: "3", name: "Zhejiang Mobility Pro", location: "Zhejiang, China", verified: true, rating: 4.7, years: 6, supplierName: "Zhejiang Mobility Pro" },
];

export default function SellerPage() {
    const params = useParams();
    const id = params.id as string;
    const [sellerProducts, setSellerProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const seller = sampleSellers.find((s) => s.id === id);

    useEffect(() => {
        async function fetchSellerProducts() {
            if (!seller) return;
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from("products")
                    .select("*, categories(name)")
                    .eq('supplier', seller.supplierName)
                    .eq('is_active', true)
                    .limit(8);

                if (error) throw error;
                setSellerProducts(data || []);
            } catch (err) {
                console.error("Error fetching seller products:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchSellerProducts();
    }, [id, seller]);

    if (!seller) {
        notFound();
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* Seller Header */}
                <div className="bg-white rounded-[2.5rem] shadow-premium p-10 mb-8 border border-slate-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D81B12]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-20 h-20 bg-slate-950 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-slate-900/20">
                                    <span className="text-3xl font-black">{seller.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">{seller.name}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-slate-500 font-bold text-[11px] uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#D81B12]" /> {seller.location}</span>
                                        <span className="flex items-center gap-1.5"><Star size={14} className="text-warning fill-warning" /> {seller.rating} Feedback</span>
                                        <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-900">{seller.years}Y Industry Expert</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                {seller.verified && (
                                    <Badge variant="success">Verified Factory</Badge>
                                )}
                                <Badge variant="primary">Trade Assurance 2.0</Badge>
                                <Badge variant="secondary">Direct Manufacturer</Badge>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button className="h-14 px-8 rounded-2xl bg-[#D81B12] hover:bg-[#9E0F09] text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 flex items-center gap-3">
                                <MessageSquare size={18} />
                                Start Consultation
                            </Button>
                            <Link href="/rfq" className="h-14 px-8 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center">
                                Custom Order
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Seller Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Inventory Depth", value: "150+ Lines", color: "text-[#D81B12]" },
                        { label: "SLA Compliance", value: "99.8%", color: "text-emerald-600" },
                        { label: "Production Capacity", value: "High", color: "text-blue-600" },
                        { label: "Security Level", value: "Enterprise", color: "text-indigo-600" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-[1.5rem] shadow-premium p-6 border border-slate-50">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.label}</p>
                            <h4 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h4>
                        </div>
                    ))}
                </div>

                {/* Products */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase italic">Factory Catalog</h2>
                        <div className="h-[2px] flex-1 mx-8 bg-slate-100 hidden md:block"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#D81B12]">{sellerProducts.length} Live Items</span>
                    </div>

                    {loading ? (
                        <div className="py-24 flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="w-10 h-10 text-[#D81B12] animate-spin" />
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Cataloging Inventory...</p>
                        </div>
                    ) : sellerProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {sellerProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] py-20 text-center">
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">No public listings available for this supplier.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Badge({ children, variant }: { children: React.ReactNode, variant: 'success' | 'primary' | 'secondary' }) {
    const styles = {
        success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        primary: 'bg-blue-50 text-blue-600 border-blue-100',
        secondary: 'bg-slate-100 text-slate-600 border-slate-200'
    };
    return (
        <span className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${styles[variant]}`}>
            {variant === 'success' && <CheckCircle size={12} />}
            {variant === 'primary' && <ShieldCheck size={12} />}
            {children}
        </span>
    );
}

function Button({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

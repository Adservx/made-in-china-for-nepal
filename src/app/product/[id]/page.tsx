"use client";

import { useState, useEffect } from "react";
import { Star, ShieldCheck, MessageCircle, MapPin, CheckCircle, Award, ShoppingCart, Minus, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { createClient } from "@/lib/supabase/client";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart } = useAppContext();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*, categories(name)")
          .eq("id", id)
          .single();

        if (error || !data) {
          console.error("Error fetching product:", error);
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id, supabase]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-[100px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-rose-600 animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Authenticating Resource Details...</p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    // Map DB product back to AppContext expected format if necessary, 
    // but AppContext should ideally handle both or be updated.
    // For now, let's just pass the DB object which has enough info.
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const priceDisplay = product.price_min
    ? `${product.currency || 'USD'} ${product.price_min.toFixed(2)}${product.price_max ? ` - ${product.price_max.toFixed(2)}` : ''}`
    : "Contact for Price";

  const categoryName = product.categories?.name || "General";

  return (
    <div className="bg-white min-h-screen pt-[100px] pb-20">
      <div className="container-fluid-custom">
        {/* Breadcrumb - Clean & Minimal */}
        <nav aria-label="breadcrumb" className="mb-8 fade-in-up">
          <ol className="breadcrumb bg-transparent p-0 m-0 text-[10px] font-bold uppercase tracking-[0.2em]">
            <li className="breadcrumb-item"><Link href="/" className="text-slate-400 no-underline hover:text-[#D81B12] transition-colors">Home</Link></li>
            <li className="breadcrumb-item"><Link href="/products" className="text-slate-400 no-underline hover:text-[#D81B12] transition-colors">Procurement</Link></li>
            <li className="breadcrumb-item active text-[#D81B12]" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Image Gallery - Premium Presentation */}
          <div className="col-lg-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="sticky top-[120px]">
              <div className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-premium mb-6 group">
                <div className="position-relative w-100 h-[500px]">
                  <Image
                    src={product.image_url || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden relative cursor-pointer hover:border-[#D81B12] transition-all group shadow-sm">
                    <Image
                      src={product.image_url || "/placeholder.jpg"}
                      alt=""
                      fill
                      className="object-contain p-2 opacity-60 group-hover:opacity-100 transition-opacity"
                      sizes="120px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details - High-end Content */}
          <div className="col-lg-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase">Verified Manufacturer</span>
                </div>
                <h1 className="display-5 fw-900 text-slate-900 mb-4 leading-tight">{product.name}</h1>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" className="text-slate-200" />
                    <span className="text-slate-900 font-bold text-sm ml-1">{product.rating}</span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200"></div>
                  <span className="text-slate-500 text-sm font-medium">128 Reviews</span>
                  <div className="h-4 w-[1px] bg-slate-200"></div>
                  <span className="text-slate-500 text-sm font-medium">500+ Orders</span>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D81B12]/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="row align-items-end g-4 relative z-10">
                  <div className="col-md-7">
                    <p className="text-[#D81B12] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Wholesale Pricing</p>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-black">{priceDisplay}</span>
                      <span className="text-white/40 text-sm font-bold">/ Unit</span>
                    </div>
                    <p className="text-white/40 text-xs font-medium mb-0 italic">FOB China Port • Tax exclusive</p>
                  </div>
                  <div className="col-md-5">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                      <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Min. Order</p>
                      <p className="text-xl font-black mb-0">{product.min_order}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Configure Order</label>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center bg-slate-100 rounded-2xl p-1.5 h-14 w-40 shadow-inner">
                      <button
                        className="h-11 w-11 rounded-xl bg-white text-slate-900 hover:text-[#D81B12] hover:shadow-sm transition-all flex items-center justify-center border-none shadow-none"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center bg-transparent border-none focus:ring-0 font-black text-slate-900"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      />
                      <button
                        className="h-11 w-11 rounded-xl bg-white text-slate-900 hover:text-[#D81B12] hover:shadow-sm transition-all flex items-center justify-center border-none shadow-none"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100">
                      <CheckCircle size={14} /> Ready to Ship
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    className={`flex-1 h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-glow hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 border-none ${added ? 'bg-emerald-500 text-white' : 'bg-[#D81B12] text-white'}`}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={20} /> {added ? 'Added to Sourcing!' : 'Add to Procurement'}
                  </button>
                  <button className="flex-1 h-16 rounded-2xl bg-white border-2 border-slate-900 text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-3">
                    <MessageCircle size={20} /> Contact Supplier
                  </button>
                </div>
              </div>

              {/* Supplier High-end Stage */}
              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 mt-12 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 text-slate-100 group-hover:text-slate-200 transition-colors pointer-events-none">
                  <Award size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
                      <Image src="/logo.svg" alt="Supplier" width={32} height={32} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-1">{product.supplier}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={12} className="text-[#D81B12]" /> Guangdong, China
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-8 mb-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Experience</p>
                      <p className="text-xl font-black text-slate-900 italic">15+ <span className="text-xs text-slate-400 not-italic uppercase">Years</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Integrity</p>
                      <p className="text-xl font-black text-slate-900 italic">AAA <span className="text-xs text-slate-400 not-italic uppercase">Grade</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Rating</p>
                      <p className="text-xl font-black text-slate-900 italic">4.9 <span className="text-xs text-slate-400 not-italic uppercase">Stars</span></p>
                    </div>
                  </div>
                  <button className="w-full h-14 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-widest hover:border-[#D81B12] hover:text-[#D81B12] transition-all shadow-sm">
                    View Verified Showroom
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications - Redesigned Tab Pane */}
        <div className="mt-24">
          <div className="flex border-b border-slate-100 mb-12">
            <button className="px-8 py-4 border-b-2 border-[#D81B12] text-slate-900 font-black uppercase tracking-[0.2em] text-[11px] outline-none bg-transparent">Technical Overview</button>
            <button className="px-8 py-4 border-b-2 border-transparent text-slate-400 hover:text-slate-600 font-bold uppercase tracking-[0.2em] text-[11px] outline-none bg-transparent">Shipping Logistics</button>
            <button className="px-8 py-4 border-b-2 border-transparent text-slate-400 hover:text-slate-600 font-bold uppercase tracking-[0.2em] text-[11px] outline-none bg-transparent">Trade Safety</button>
          </div>

          <div className="row g-12">
            <div className="col-lg-7">
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Industrial Performance & Build</h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                Designed for extreme conditions in Nepal, this {product.name} integrates advanced {categoryName} technologies.
                Built to international ISO standards with multi-layer quality assurance protocols throughout the production phase.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "High-efficiency operation under peak loads",
                  "Nepal climate optimized thermal dissipation",
                  "Reinforced structural integrity for transport",
                  "Global IEC & CE certified components",
                  "24/7 technical support post-purchase",
                  "Extended 10-year manufacturer warranty"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <CheckCircle className="text-emerald-500 shrink-0" size={18} />
                    <span className="text-sm font-bold text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="bg-[#D81B12] p-10 rounded-[3rem] text-white shadow-glow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="relative z-10">
                  <ShieldCheck size={48} className="mb-6 opacity-30" />
                  <h3 className="text-2xl font-black mb-4">Trade Assurance</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-8">
                    Your procurement is fully protected against quality discrepancies or shipping delays.
                    We secure your capital until the factory audits are passed.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-white"></div> Factory Audited</li>
                    <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-white"></div> Payment Secured</li>
                    <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-white"></div> Loading Supervised</li>
                  </ul>
                  <button className="w-full py-4 bg-white text-[#D81B12] rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                    Learn about Procurement Protection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


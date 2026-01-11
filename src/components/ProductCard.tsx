"use client";

import { Star, ShieldCheck, ArrowUpRight, Box } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: any; // Using any for compatibility during migration
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.image_url || product.image || "/placeholder.jpg";
  const name = product.name;
  const rating = product.rating || 0;
  const category = (product.categories?.name) || product.category || "General";
  const price = product.price_min ? `$${product.price_min} - $${product.price_max}` : (product.price || "Contact for Price");
  const moq = product.min_order || product.minOrder;
  const supplier = product.supplier;

  return (
    <div className="flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] group">
      {/* Image Container - Using Next.js Image */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Floating Category */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white bg-slate-950/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            {category}
          </span>
        </div>

        {/* Value Badges */}
        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          <div className="glass-effect px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-lg">
            <Star className="w-2.5 h-2.5 text-rose-600 fill-rose-600" />
            <span className="text-[9px] font-black text-slate-950">{rating}</span>
          </div>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-6 flex-1 flex flex-col gap-5">
        <div className="space-y-2">
          <Link href={`/product/${product.id}`} className="block no-underline">
            <h3 className="text-lg font-bold text-slate-900 leading-snug tracking-tight line-clamp-2 min-h-[2.5rem] group-hover:text-rose-600 transition-colors">
              {name}
            </h3>
          </Link>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-950 tracking-tighter">
              {price.startsWith('$') ? price.split(' ')[0] : price}
            </span>
            {price.includes('-') && (
              <span className="text-xs text-slate-400 font-medium">Bulk Pricing</span>
            )}
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Box size={14} className="text-slate-300" />
              <span>MOQ: {moq} Units</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="text-emerald-600/70">{supplier}</span>
            </div>
          </div>

          <Link href={`/product/${product.id}`} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-950 text-[10px] font-black uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all no-underline">
            View Details <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}



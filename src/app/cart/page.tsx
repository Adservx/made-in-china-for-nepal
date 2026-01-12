"use client";

import Link from "next/link";
import { Trash2, ShoppingCart, Minus, Plus, ArrowLeft, ShieldCheck, ChevronRight, Info } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
   const { cart, removeFromCart, updateQuantity } = useAppContext();

   const subtotal = cart.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0);
   const tax = Math.round(subtotal * 0.13); // 13% VAT
   const total = subtotal + tax;

   if (cart.length === 0) {
      return (
         <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-in fade-in duration-700">
            <div className="w-32 h-32 rounded-[3rem] bg-slate-50 flex items-center justify-center text-slate-200 mb-8 overflow-hidden relative group">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#D81B12]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <ShoppingCart size={48} className="group-hover:scale-110 group-hover:text-[#D81B12] transition-all" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Your sourcing cart is empty</h2>
            <p className="text-slate-500 font-medium mb-8 text-center max-w-sm">
               Start sourcing high-quality products from China for Nepal today.
            </p>
            <Button asChild className="bg-[#D81B12] hover:bg-[#9E0F09] rounded-2xl h-16 px-12 font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-red-500/20 transition-all hover:scale-105 active:scale-95 border-none text-white">
               <Link href="/" className="no-underline text-white flex items-center justify-center gap-2">
                  <ChevronRight size={16} />
                  Explore Marketplace
               </Link>
            </Button>
         </div>
      );
   }

   return (
      <div className="bg-[#F8FAFC] min-h-screen py-12 px-4 md:px-8">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
               <Button variant="ghost" asChild className="w-10 h-10 p-0 rounded-full hover:bg-white shrink-0">
                  <Link href="/"><ArrowLeft className="w-5 h-5 text-slate-400" /></Link>
               </Button>
               <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h2>
                  <p className="text-slate-500 font-medium">{cart.length} items ready for procurement</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               <div className="lg:col-span-8 space-y-4">
                  {cart.map((item) => (
                     <Card key={item.id} className="border-none shadow-premium bg-white rounded-[2rem] overflow-hidden group hover:shadow-lift transition-all duration-500">
                        <CardContent className="p-6">
                           <div className="flex flex-col sm:flex-row items-center gap-6">
                              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0 py-2">
                                 <div className="flex flex-col mb-4">
                                    <h3 className="text-lg font-black text-slate-900 line-clamp-1 mb-1 group-hover:text-[#D81B12] transition-colors">{item.name}</h3>
                                    <div className="flex items-center gap-3">
                                       <Badge variant="outline" className="border-slate-100 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none px-2 py-1 rounded-md">Procurement</Badge>
                                       <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-emerald-500" /> Nepal Verified</span>
                                    </div>
                                 </div>

                                 <div className="flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center bg-slate-100 rounded-xl p-1 shadow-inner h-12 w-36">
                                       <button
                                          className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-900 hover:text-[#D81B12] transition-all border-none outline-none"
                                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                       >
                                          <Minus size={14} className="stroke-[3]" />
                                       </button>
                                       <input
                                          type="text"
                                          className="w-12 text-center bg-transparent text-sm font-black text-slate-900 focus:outline-none border-none pointer-events-none"
                                          value={item.quantity}
                                          readOnly
                                       />
                                       <button
                                          className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-900 hover:text-[#D81B12] transition-all border-none outline-none"
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                       >
                                          <Plus size={14} className="stroke-[3]" />
                                       </button>
                                    </div>

                                    <div className="text-right">
                                       <div className="text-xl font-black text-slate-900 tracking-tight">${((Number(item.price) || 0) * item.quantity).toFixed(2)}</div>
                                       <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${Number(item.price).toFixed(2)} / unit</div>
                                    </div>

                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="h-11 w-11 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all shrink-0"
                                       onClick={() => removeFromCart(item.id)}
                                    >
                                       <Trash2 size={20} />
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  ))}

                  <div className="bg-white/50 border border-slate-100/50 rounded-[2rem] p-6 flex items-center gap-4 animate-pulse">
                     <div className="w-10 h-10 rounded-full bg-[#D81B12]/10 flex items-center justify-center text-[#D81B12]">
                        <Info className="w-5 h-5" />
                     </div>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-relaxed">
                        Tax & shipping costs are estimated and may vary based on chosen logistics path to Nepal.
                     </p>
                  </div>
               </div>

               <div className="lg:col-span-4">
                  <Card className="border-none shadow-premium bg-[#1E293B] text-white rounded-[2.5rem] overflow-hidden sticky top-8">
                     <CardContent className="p-10 relative">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[#D81B12]/10 via-transparent to-transparent pointer-events-none"></div>

                        <h3 className="text-2xl font-black mb-8 tracking-tight">Order Summary</h3>

                        <div className="space-y-6">
                           <div className="flex justify-between items-center group">
                              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">Net Subtotal</span>
                              <span className="font-black text-lg text-slate-100">${subtotal.toFixed(2)}</span>
                           </div>

                           <div className="flex justify-between items-center group">
                              <div className="flex flex-col">
                                 <span className="text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">VAT (13%)</span>
                                 <span className="text-[9px] text-[#D81B12] font-black uppercase tracking-tighter">Nepal Import Tax</span>
                              </div>
                              <span className="font-black text-lg text-slate-100">${tax.toFixed(2)}</span>
                           </div>

                           <div className="flex justify-between items-center group opacity-50">
                              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">Shipping Fee</span>
                              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full">Calculated Later</span>
                           </div>

                           <Separator className="bg-slate-800 h-[1px]" />

                           <div className="flex justify-between items-end pt-2">
                              <div className="flex flex-col">
                                 <span className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Grand Total</span>
                                 <span className="text-[10px] text-slate-500 font-bold">Payable in NPR/USD</span>
                              </div>
                              <div className="text-right">
                                 <div className="text-4xl font-black text-white tracking-tighter mb-1">${total.toFixed(2)}</div>
                                 <div className="text-[11px] font-black text-[#D81B12] uppercase tracking-[0.1em]">Verified Procurement</div>
                              </div>
                           </div>

                           <div className="pt-8 space-y-3">
                              <Button
                                 asChild
                                 className="w-full bg-[#D81B12] hover:bg-[#9E0F09] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] h-16 shadow-2xl shadow-red-500/20 border-none transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-between px-8"
                              >
                                 <Link href="/checkout">
                                    Proceed to Payment
                                    <ChevronRight className="w-5 h-5 opacity-50" />
                                 </Link>
                              </Button>

                              <Button asChild variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl h-14 font-bold text-xs uppercase tracking-widest border-none transition-colors">
                                 <Link href="/">Back to Sourcing</Link>
                              </Button>
                           </div>
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
                           <Image src="/logo.svg" alt="MIC" width={24} height={24} className="invert" />
                           <div className="w-[1px] h-4 bg-slate-700"></div>
                           <ShieldCheck className="w-5 h-5" />
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}

function Image({ className, ...props }: any) {
   // Basic image polyfill for the mockup if NextImage is preferred
   return <img className={className} {...props} />
}

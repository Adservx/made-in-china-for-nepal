"use client";

import { useAppContext } from "@/context/AppContext";
import { CreditCard, Truck, ShieldCheck, CheckCircle, ChevronRight, MapPin, Phone, Building, Wallet, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
    const { cart, clearCart, user, profile, loading: contextLoading } = useAppContext();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const subtotal = cart.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0);
    const tax = Math.round(subtotal * 0.13);
    const total = subtotal + tax;

    const handlePlaceOrder = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setOrderPlaced(true);
        clearCart();
        setIsSubmitting(false);
    };

    if (contextLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="w-8 h-8 border-4 border-[#D81B12]/20 border-t-[#D81B12] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
                <Card className="border-none shadow-lift bg-white rounded-[3rem] p-12 text-center max-w-xl animate-in zoom-in duration-500">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping opacity-25"></div>
                        <CheckCircle size={48} className="relative" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Order Received!</h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        Your sourcing request has been submitted to the China-Nepal bridge.
                        A Logistics Agent will contact you within 2 hours to coordinate the cross-border transport.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Button asChild className="bg-[#D81B12] hover:bg-[#9E0F09] rounded-2xl h-14 font-black text-xs uppercase tracking-widest transition-all">
                            <Link href="/orders">My Orders</Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-2xl h-14 font-black text-xs uppercase tracking-widest border-slate-200 transition-all">
                            <Link href="/">Marketplace</Link>
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    if (cart.length === 0 && !orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4">
                <h4 className="text-2xl font-black text-slate-900 mb-6">No items selected for checkout</h4>
                <Button asChild className="bg-[#D81B12] hover:bg-[#9E0F09] rounded-2xl h-14 px-10 font-black text-xs uppercase tracking-widest">
                    <Link href="/">Find Products</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <Button variant="ghost" asChild className="w-10 h-10 p-0 rounded-full hover:bg-white shrink-0">
                        <Link href="/cart"><ArrowLeft className="w-5 h-5 text-slate-400" /></Link>
                    </Button>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Secure Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-8">
                        <Card className="border-none shadow-premium bg-white rounded-[2rem] overflow-hidden">
                            <CardHeader className="p-8 border-b border-slate-50">
                                <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Logistics Details</CardTitle>
                                <CardDescription className="font-medium text-slate-500">Where should we deliver your shipment?</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</Label>
                                        <div className="relative">
                                            <Input className="rounded-2xl border-slate-100 bg-slate-50 h-14 pl-12 text-sm font-bold focus:bg-white transition-all shadow-inner" defaultValue={profile?.full_name || ""} />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"><MapPin className="w-4 h-4" /></span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Company (Optional)</Label>
                                        <div className="relative">
                                            <Input className="rounded-2xl border-slate-100 bg-slate-50 h-14 pl-12 text-sm font-bold focus:bg-white transition-all shadow-inner" defaultValue={profile?.company_name || ""} />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"><Building className="w-4 h-4" /></span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Nepal Phone Number</Label>
                                        <div className="relative">
                                            <Input className="rounded-2xl border-slate-100 bg-slate-50 h-14 pl-12 text-sm font-bold focus:bg-white transition-all shadow-inner" placeholder="+977" defaultValue={profile?.phone || ""} />
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"><Phone className="w-4 h-4" /></span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Delivery Address in Nepal</Label>
                                        <Textarea className="rounded-2xl border-slate-100 bg-slate-50 min-h-[120px] p-6 text-sm font-bold focus:bg-white transition-all shadow-inner resize-none" placeholder="Provide precise location for heavy machinery/pallet delivery..." />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-premium bg-white rounded-[2rem] overflow-hidden">
                            <CardHeader className="p-8 border-b border-slate-50">
                                <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Financial settlement</CardTitle>
                                <CardDescription className="font-medium text-slate-500">Choose your preferred cross-border payment method.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { id: 'esewa', name: 'eSewa', color: 'bg-emerald-50 text-emerald-600', hover: 'hover:bg-emerald-100' },
                                        { id: 'khalti', name: 'Khalti', color: 'bg-indigo-50 text-indigo-600', hover: 'hover:bg-indigo-100' },
                                        { id: 'bank', name: 'Bank Transfer', color: 'bg-slate-900 text-white', hover: 'hover:bg-black' }
                                    ].map((opt) => (
                                        <button key={opt.id} className={`p-6 rounded-[2rem] border-none transition-all flex flex-col items-center gap-3 group relative overflow-hidden ${opt.color} ${opt.hover}`}>
                                            <Wallet className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                            <span className="text-xs font-black uppercase tracking-widest">{opt.name}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-8 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
                                        Your transaction is protected by Made-in-China Trade Assurance through the Nepal Logistics Gate.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-4">
                        <Card className="border-none shadow-lift bg-[#1E293B] text-white rounded-[3rem] overflow-hidden sticky top-8">
                            <CardContent className="p-10 relative">
                                <h3 className="text-2xl font-black mb-8 tracking-tight">Consignment Summary</h3>

                                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-center group">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/50">
                                                <img src={item.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={item.name} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-black text-slate-100 truncate mb-1 group-hover:text-[#D81B12] transition-colors">{item.name}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Qty: {item.quantity}</span>
                                                    <span className="text-sm font-black text-slate-100">${((Number(item.price) || 0) * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="bg-slate-800 my-8 h-[1px]" />

                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-slate-100">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <span>Import VAT</span>
                                        <span className="text-slate-100">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <span>Bridge Logistics</span>
                                        <span className="text-[#D81B12] font-black">QUOTING...</span>
                                    </div>

                                    <div className="pt-8 flex justify-between items-end border-t border-slate-800/50">
                                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">Total Est.</span>
                                        <span className="text-4xl font-black text-white px-1 tracking-tighter">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-[#D81B12] hover:bg-[#9E0F09] text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] h-16 shadow-2xl shadow-red-500/30 border-none transition-all mt-10 hover:scale-[1.02] active:scale-95 disabled:bg-slate-700 disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <span>Initiate Consignment</span>
                                            <ChevronRight className="w-5 h-5 opacity-40 shrink-0" />
                                        </div>
                                    )}
                                </Button>

                                <div className="mt-8 flex items-center justify-center gap-4 opacity-30">
                                    <Truck className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Guaranteed Delivery to Kathmandu</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

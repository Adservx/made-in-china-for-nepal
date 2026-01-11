"use client";

import { useState } from "react";
import { FileText, CheckCircle, Send } from "lucide-react";
import Link from "next/link";

export default function RFQPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        productName: "",
        quantity: "",
        unit: "Pieces",
        description: "",
        name: "",
        email: "",
        phone: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-white min-vh-100 d-flex align-items-center">
                <div className="container-fluid-custom">
                    <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 p-lg-12 shadow-premium text-center mx-auto relative overflow-hidden group" style={{ maxWidth: "600px" }}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="bg-emerald-500 text-white rounded-2xl w-20 h-20 d-flex align-items-center justify-content-center mx-auto mb-8 shadow-glow shadow-emerald-500/20">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="display-6 fw-900 text-slate-900 mb-4">Transmission Successful</h2>
                        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                            Your requirements have been dispatched to our factory network in Guangdong and Jiangsu.
                            Our agents in Kathmandu will contact you within 24 hours with compiled quotes.
                        </p>
                        <Link href="/" className="h-16 px-10 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center no-underline hover:bg-[#D81B12] transition-colors shadow-xl mx-auto w-fit">
                            Return to Global Trade
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-[120px] pb-20">
            <div className="container-fluid-custom">
                <div className="row justify-content-center">
                    <div className="col-lg-8 fade-in-up">
                        {/* Header Section - Modern Industrial */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#D81B12]/5 border border-[#D81B12]/10 text-[#D81B12] mb-6">
                                <FileText size={18} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Global Procurement Hub</span>
                            </div>
                            <h1 className="display-4 fw-900 text-slate-900 mb-4 leading-tight">Request Custom <span className="text-gold-accent italic">Quotations</span></h1>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                Share your industrial requirements with our verified factory network in China.
                                We handle the negotiation, auditing, and logistics to Nepal.
                            </p>
                        </div>

                        {/* Form Card - Glassmorphism Premium */}
                        <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 p-lg-12 shadow-premium relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D81B12]/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[#D81B12]/10 transition-colors"></div>

                            <form onSubmit={handleSubmit} className="relative z-10">
                                <div className="flex items-center gap-4 mb-16 pt-4">
                                    <div className="w-1.5 h-10 rounded-full bg-[#D81B12] shadow-[0_0_15px_rgba(216,27,18,0.4)]"></div>
                                    <h4 className="text-3xl font-black text-slate-900 m-0 tracking-tight">Product Specifications</h4>
                                </div>

                                <div className="row g-4 mb-12">
                                    <div className="col-12">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Product Name / Industry Keyword</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white border border-slate-300 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-[#D81B12] focus:ring-4 focus:ring-[#D81B12]/5 transition-all placeholder:text-slate-300"
                                            placeholder="e.g. Industrial PV Modules, High-Torque Electric Motors"
                                            value={form.productName}
                                            onChange={(e) => setForm({ ...form, productName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Target Quantity</label>
                                        <input
                                            type="number"
                                            className="w-full bg-white border border-slate-300 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-[#D81B12] focus:ring-4 focus:ring-[#D81B12]/5 transition-all placeholder:text-slate-300"
                                            placeholder="e.g. 1000"
                                            value={form.quantity}
                                            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Trade Unit</label>
                                        <select
                                            className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-[#D81B12] focus:ring-4 focus:ring-[#D81B12]/5 transition-all appearance-none"
                                            value={form.unit}
                                            onChange={(e) => setForm({ ...form, unit: e.target.value })}
                                        >
                                            <option>Pieces (PCS)</option>
                                            <option>Sets (SET)</option>
                                            <option>Kilograms (KG)</option>
                                            <option>Metric Tons (MT)</option>
                                            <option>TEU Containers</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Technical Requirements / Description</label>
                                        <textarea
                                            className="w-full bg-white border border-slate-300 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-[#D81B12] focus:ring-4 focus:ring-[#D81B12]/5 transition-all placeholder:text-slate-300"
                                            rows={4}
                                            placeholder="Describe material grade, dimensions, certifications needed, or special packaging for Nepal transport..."
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-16 pt-10 border-t border-slate-100">
                                    <div className="w-1.5 h-10 rounded-full bg-[#D81B12] shadow-[0_0_15px_rgba(216,27,18,0.4)]"></div>
                                    <h4 className="text-3xl font-black text-slate-900 m-0 tracking-tight">Consignee Identity</h4>
                                </div>

                                <div className="row g-4 mb-12">
                                    <div className="col-md-6">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Procurement Officer Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white border border-slate-300 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-[#D81B12] focus:ring-4 focus:ring-[#D81B12]/5 transition-all placeholder:text-slate-300"
                                            placeholder="Full legal name"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Direct Contact (Nepal)</label>
                                        <input
                                            type="tel"
                                            className="w-full bg-white border border-slate-300 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-[#D81B12] focus:ring-4 focus:ring-[#D81B12]/5 transition-all placeholder:text-slate-300"
                                            placeholder="+977 9XXXXXXXXX"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Corporate Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full bg-white border border-slate-300 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:outline-none focus:border-[#D81B12] focus:ring-4 focus:ring-[#D81B12]/5 transition-all placeholder:text-slate-300"
                                            placeholder="office@yourcompany.com.np"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full h-20 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 hover:bg-[#D81B12] shadow-glow hover:scale-[1.01] active:scale-[0.98] transition-all border-none">
                                    <Send size={20} className="text-[#D81B12] group-hover:text-white transition-colors" /> Dispatch RFQ to Factories
                                </button>

                                <div className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                    Verified Industrial Network • Secure Transmission • 24H Response Guarantee
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

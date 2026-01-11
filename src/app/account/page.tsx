"use client";

export const dynamic = "force-dynamic";

import { useAppContext } from "@/context/AppContext";
import { User, Package, FileText, Settings, LogOut, ChevronRight, Building, Mail, Phone, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function AccountPage() {
    const { user, profile, logout, loading: contextLoading } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!contextLoading && !user) {
            router.push("/login");
        }
    }, [user, router, contextLoading]);

    if (contextLoading || !user) {
        return (
            <div className="min-vh-100 flex items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-[#D81B12]/20 border-t-[#D81B12] rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const navItems = [
        { label: "My Account", icon: User, href: "/account", active: true },
        { label: "My Orders", icon: Package, href: "/orders" },
        { label: "My RFQs", icon: FileText, href: "/rfq" },
    ];

    return (
        <div className="bg-[#F8FAFC] min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="border-none shadow-premium bg-white overflow-hidden rounded-[2rem]">
                            <CardContent className="p-8 text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-[#D81B12] to-[#9E0F09] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-red-100">
                                        {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                                    </div>
                                </div>
                                <h2 className="text-xl font-black text-slate-900 mb-1">{profile?.full_name || "Valued Merchant"}</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{profile?.role || "User"}</p>

                                <div className="mt-8 space-y-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={`flex items-center justify-between p-3.5 rounded-2xl transition-all group ${item.active
                                                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className={`w-5 h-5 ${item.active ? "text-[#D81B12]" : "text-slate-400 group-hover:text-[#D81B12]"}`} />
                                                <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 ${item.active ? "text-slate-500" : "text-slate-200"}`} />
                                        </Link>
                                    ))}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-[#D81B12] hover:bg-red-50 transition-all group"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span className="text-sm font-bold uppercase tracking-wider">Logout</span>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-premium bg-[#1E293B] text-white overflow-hidden rounded-[2rem]">
                            <CardContent className="p-8 relative">
                                <Box className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
                                <h3 className="text-lg font-black mb-2">Need Help?</h3>
                                <p className="text-slate-400 text-xs font-medium mb-6">Our dedicated support team is available 24/7 for sourcing help.</p>
                                <Button className="w-full bg-[#D81B12] hover:bg-[#9E0F09] rounded-xl font-black text-[10px] uppercase tracking-widest h-11 border-none transition-transform hover:scale-105">
                                    Contact Agent
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">
                        <Card className="border-none shadow-premium bg-white rounded-[2rem] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-50 p-8">
                                <CardTitle className="text-2xl font-black text-slate-900">Account Overview</CardTitle>
                                <CardDescription className="font-medium text-slate-500">Manage your profile information and preferences.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 transition-transform hover:rotate-12">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Full Name</p>
                                                <p className="text-sm font-bold text-slate-900">{profile?.full_name || "Not provided"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 transition-transform hover:rotate-12">
                                                <Mail className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Address</p>
                                                <p className="text-sm font-bold text-slate-900">{user.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 transition-transform hover:rotate-12">
                                                <Building className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Company Name</p>
                                                <p className="text-sm font-bold text-slate-900">{profile?.company_name || "Invidual Buyer"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 transition-transform hover:rotate-12">
                                                <Phone className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phone Number</p>
                                                <p className="text-sm font-bold text-slate-900">{profile?.phone || "Not linked"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 transition-transform hover:rotate-12">
                                                <MapPin className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Primary Location</p>
                                                <p className="text-sm font-bold text-slate-900">Nepal</p>
                                            </div>
                                        </div>

                                        <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 bg-slate-50 hover:bg-slate-100 flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                                            <Settings className="w-4 h-4" />
                                            Edit Profile
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: "Active Orders", value: "3", icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
                                { label: "RFQ Requests", value: "5", icon: FileText, color: "text-amber-500", bg: "bg-amber-50" },
                                { label: "Saved Products", value: "12", icon: Star, color: "text-[#D81B12]", bg: "bg-red-50" },
                            ].map((stat, i) => (
                                <Card key={i} className="border-none shadow-premium bg-white group hover:-translate-y-2 transition-all duration-300 rounded-[2rem]">
                                    <CardContent className="p-8 text-center">
                                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                            <stat.icon className="w-7 h-7" />
                                        </div>
                                        <h4 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h4>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Box({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    );
}

"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import {
    Box,
    ShoppingCart,
    MessageSquare,
    Users,
    TrendingUp,
    ArrowUpRight,
    Plus,
    DollarSign,
    Activity,
    ArrowDownRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        rfqs: 0,
        users: 0,
        revenue: 0
    });
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        try {
            setLoading(true);
            const [
                { count: productsCount },
                { count: ordersCount },
                { count: rfqsCount },
                { count: usersCount }
            ] = await Promise.all([
                supabase.from("products").select("*", { count: 'exact', head: true }),
                supabase.from("orders").select("*", { count: 'exact', head: true }),
                supabase.from("rfqs").select("*", { count: 'exact', head: true }),
                supabase.from("profiles").select("*", { count: 'exact', head: true })
            ]);

            setStats({
                products: productsCount || 0,
                orders: ordersCount || 0,
                rfqs: rfqsCount || 0,
                users: usersCount || 0,
                revenue: 0 // Will implement later with orders sum
            });
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    }

    const statCards = [
        {
            title: "Total Products",
            value: stats.products.toString(),
            icon: Box,
            trend: "+12.5%",
            trendUp: true,
            description: "Inventory size"
        },
        {
            title: "Active Orders",
            value: stats.orders.toString(),
            icon: ShoppingCart,
            trend: "+4.2%",
            trendUp: true,
            description: "Ready for fulfillment"
        },
        {
            title: "Pending RFQs",
            value: stats.rfqs.toString(),
            icon: MessageSquare,
            trend: "-2",
            trendUp: false,
            description: "Awaiting response"
        },
        {
            title: "Platform Users",
            value: stats.users.toString(),
            icon: Users,
            trend: "+18%",
            trendUp: true,
            description: "Registered members"
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Dashboard</h1>
                    <p className="text-slate-500 font-medium">Welcome to your business command center.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 bg-white">
                        Download Report
                    </Button>
                    <Button asChild className="bg-[#D81B12] hover:bg-[#9E0F09] rounded-xl shadow-lg shadow-red-100 flex items-center gap-2">
                        <Link href="/admin/products">
                            <Plus className="w-4 h-4" />
                            Add Product
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <Card key={i} className="border-none shadow-premium bg-white group hover:-translate-y-1 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                {stat.title}
                            </CardTitle>
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#D81B12]/10 group-hover:text-[#D81B12] transition-colors">
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="h-8 w-16 bg-slate-100 animate-pulse rounded-md mb-2"></div>
                            ) : (
                                <div className="text-2xl font-black tracking-tight text-slate-900">{stat.value}</div>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`flex items-center text-[10px] font-bold ${stat.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {stat.trendUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                    {stat.trend}
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium">{stat.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Section */}
                <Card className="lg:col-span-2 border-none shadow-premium bg-white">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold">Sales Overview</CardTitle>
                                <CardDescription className="font-medium">Monthly revenue growth analytics</CardDescription>
                            </div>
                            <Tabs defaultValue="7d" className="w-[180px]">
                                <TabsList className="bg-slate-100 rounded-lg p-1 border-none">
                                    <TabsTrigger value="7d" className="rounded-md text-[10px] font-bold uppercase py-1">7D</TabsTrigger>
                                    <TabsTrigger value="30d" className="rounded-md text-[10px] font-bold uppercase py-1">30D</TabsTrigger>
                                    <TabsTrigger value="12m" className="rounded-md text-[10px] font-bold uppercase py-1">1Y</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-4 shadow-inner">
                            <Activity className="w-12 h-12 text-slate-300 animate-pulse" />
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Integrating Analytics Hub...</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-none shadow-premium bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Recent Inquiries</CardTitle>
                        <CardDescription className="font-medium">New RFQs and messages</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex items-start gap-4 group cursor-pointer transition-all hover:bg-slate-50 p-2 -m-2 rounded-2xl">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#D81B12] shrink-0 border border-red-100/50 group-hover:bg-[#D81B12] group-hover:text-white transition-all shadow-sm">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900 truncate">New RFQ: Solar Panels & Batteries</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">2 minutes ago</p>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#D81B12] transition-colors" />
                                </div>
                            ))}
                            <Button asChild variant="ghost" className="w-full mt-2 rounded-xl text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50">
                                <Link href="/admin/rfqs">View All Activities</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

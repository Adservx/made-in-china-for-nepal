"use client";

import { useState, useEffect } from "react";
import {
    ShoppingCart,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Truck,
    CheckCircle2,
    Clock,
    ChevronRight,
    ChevronLeft,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();
    const supabase = createClient();

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("orders")
                .select("*, profiles(full_name, company_name)")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error: any) {
            toast({
                title: "Error fetching orders",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <Badge variant="secondary" className="bg-amber-50 text-amber-600 border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1.5"><Clock className="w-3 h-3" /> Pending</Badge>;
            case 'processing':
                return <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1.5"><Pulse className="w-3 h-3" /> Processing</Badge>;
            case 'shipped':
                return <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1.5"><Truck className="w-3 h-3" /> Shipped</Badge>;
            case 'delivered':
                return <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Delivered</Badge>;
            default:
                return <Badge variant="secondary" className="bg-slate-100 text-slate-500 border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Orders</h1>
                    <p className="text-slate-500 font-medium">Track customer purchases and manage fulfillment status.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 h-11 px-6 font-bold text-xs uppercase tracking-widest bg-white">
                        Export Reports
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-premium bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50 px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="relative flex-1 max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#D81B12] transition-colors" />
                            <Input
                                placeholder="Order ID, Customer, or Company..."
                                className="pl-12 h-12 bg-slate-100 border-none rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 ring-red-500/10 transition-all shadow-inner"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" className="h-10 px-5 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-100">
                                <Calendar className="w-4 h-4 mr-2" />
                                Last 30 Days
                            </Button>
                            <Button variant="ghost" className="h-10 px-5 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-100">
                                <Filter className="w-4 h-4 mr-2" />
                                Status
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-none">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6 px-8">Order ID</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Customer</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Date</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Amount</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Status</TableHead>
                            <TableHead className="text-right py-6 px-8"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="w-8 h-8 border-4 border-[#D81B12]/20 border-t-[#D81B12] rounded-full animate-spin"></div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Orders...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                            <ShoppingCart className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-900">No orders yet</p>
                                            <p className="text-sm text-slate-400">Successful checkouts will appear here.</p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : orders.map((order) => (
                            <TableRow key={order.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors group">
                                <TableCell className="py-6 px-8">
                                    <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-md">#{order.id.slice(0, 8).toUpperCase()}</span>
                                </TableCell>
                                <TableCell className="py-6">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 mb-0.5">{order.profiles?.full_name || "Unknown"}</p>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{order.profiles?.company_name || "Guest"}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6">
                                    <p className="text-xs font-medium text-slate-500">
                                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </TableCell>
                                <TableCell className="py-6">
                                    <span className="text-sm font-black text-slate-900">${order.total?.toFixed(2)}</span>
                                </TableCell>
                                <TableCell className="py-6">
                                    {getStatusBadge(order.status)}
                                </TableCell>
                                <TableCell className="text-right py-6 px-8">
                                    <Button variant="ghost" className="h-10 px-4 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-100 group">
                                        <Eye className="w-4 h-4 mr-2 group-hover:text-[#D81B12] transition-colors" />
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            Showing <span className="text-slate-900 font-black">{orders.length}</span> results
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200" disabled>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button className="h-10 w-10 rounded-xl bg-[#D81B12] text-white font-black text-xs">1</Button>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200" disabled>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function Pulse({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    );
}

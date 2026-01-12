"use client";

import { useState, useEffect } from "react";
import {
    FileText,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    MessageSquare,
    Clock,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Calendar,
    Layers
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

export default function AdminRFQsPage() {
    const [rfqs, setRfqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();
    const supabase = createClient();

    useEffect(() => {
        fetchRFQs();
    }, []);

    async function fetchRFQs() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("rfqs")
                .select("*, profiles(full_name, company_name)")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setRfqs(data || []);
        } catch (error: any) {
            toast({
                title: "Error fetching RFQs",
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
            case 'reviewed':
                return <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1.5"><Eye className="w-3 h-3" /> Reviewed</Badge>;
            case 'responded':
                return <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Responded</Badge>;
            case 'completed':
                return <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Completed</Badge>;
            default:
                return <Badge variant="secondary" className="bg-slate-100 text-slate-500 border-none font-bold text-[10px] uppercase px-3 py-1 rounded-full">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">RFQs</h1>
                    <p className="text-slate-500 font-medium">Manage sourcing requests and quotations from buyers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 h-11 px-6 font-bold text-xs uppercase tracking-widest bg-white">
                        RFQ Settings
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-premium bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50 px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="relative flex-1 max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#D81B12] transition-colors" />
                            <Input
                                placeholder="Request ID, Product, or Customer..."
                                className="pl-12 h-12 bg-slate-100 border-none rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 ring-red-500/10 transition-all shadow-inner"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" className="h-10 px-5 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-100">
                                <Layers className="w-4 h-4 mr-2" />
                                All Categories
                            </Button>
                            <Button variant="ghost" className="h-10 px-5 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-100">
                                <Filter className="w-4 h-4 mr-2" />
                                Open Only
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-none">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6 px-8">Product Name</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Requested By</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Requirement</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Date</TableHead>
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
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Requests...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : rfqs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-900">No requests found</p>
                                            <p className="text-sm text-slate-400">Buyer sourcing requests will show up here.</p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : rfqs.map((rfq) => (
                            <TableRow key={rfq.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors group">
                                <TableCell className="py-6 px-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                                            <Layers className="w-4 h-4" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{rfq.product_name}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 mb-0.5">{rfq.profiles?.full_name || "Unknown"}</p>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{rfq.profiles?.company_name || "Guest"}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-900">{rfq.quantity} {rfq.unit}</span>
                                        <span className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">{rfq.specifications || "No specs"}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6">
                                    <p className="text-xs font-medium text-slate-500">
                                        {new Date(rfq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </TableCell>
                                <TableCell className="py-6">
                                    {getStatusBadge(rfq.status || 'pending')}
                                </TableCell>
                                <TableCell className="text-right py-6 px-8">
                                    <Button variant="ghost" className="h-10 px-4 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-100 group">
                                        <MessageSquare className="w-4 h-4 mr-2 group-hover:text-[#D81B12] transition-colors" />
                                        Respond
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            Showing <span className="text-slate-900 font-black">{rfqs.length}</span> requests
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200" disabled>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button className="h-10 w-10 rounded-xl bg-[#9E0F09] text-white font-black text-xs">1</Button>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200" disabled>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

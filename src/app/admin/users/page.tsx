"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
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
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    MoreHorizontal,
    Search,
    UserPlus,
    Shield,
    ShieldAlert,
    User as UserIcon,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsersPage() {
    const [profiles, setProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();
    const supabase = createClient();

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setProfiles(data || []);
        } catch (error: any) {
            toast({
                title: "Error fetching profiles",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const filteredProfiles = profiles.filter(p =>
        (p.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (p.company_name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Users</h1>
                    <p className="text-slate-500 font-medium">Manage your platform members and their permissions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 h-11 px-6 font-bold text-xs uppercase tracking-widest">
                        Export CSV
                    </Button>
                    <Button className="bg-[#D81B12] hover:bg-[#9E0F09] rounded-xl shadow-lg shadow-red-100 h-11 px-6 flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                        <UserPlus className="w-4 h-4" />
                        Add Member
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Card className="border-none shadow-premium bg-white overflow-hidden">
                        <CardHeader className="border-b border-slate-50 px-6 py-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="Search name or email..."
                                        className="pl-10 h-11 bg-slate-50 border-none rounded-xl text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="h-11 px-4 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-50">
                                        <Filter className="w-3.5 h-3.5 mr-2" />
                                        Filters
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-11 px-4 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-50">
                                        <ArrowUpDown className="w-3.5 h-3.5 mr-2" />
                                        Sort
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="border-none">
                                    <TableHead className="w-[300px] text-[10px] font-black uppercase tracking-widest text-slate-400 py-4 px-6">User</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-4">Role</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-4">Joined At</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-4">Status</TableHead>
                                    <TableHead className="text-right py-4 px-6"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                                            Loading Users...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredProfiles.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                                            No users found
                                        </TableCell>
                                    </TableRow>
                                ) : filteredProfiles.map((profile) => (
                                    <TableRow key={profile.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors group">
                                        <TableCell className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 rounded-xl border-2 border-slate-100 group-hover:scale-110 transition-transform">
                                                    <AvatarImage src={profile.avatar_url || ""} />
                                                    <AvatarFallback className="bg-slate-100 text-slate-600 font-bold uppercase">{profile.full_name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 leading-none mb-1">{profile.full_name || "Unknown User"}</p>
                                                    <p className="text-[11px] text-slate-400 font-medium leading-none">{profile.company_name || "Individual"}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            {profile.role === 'admin' || profile.role === 'super_admin' ? (
                                                <div className="flex items-center text-amber-600">
                                                    <Shield className="w-3 h-3 mr-1.5" />
                                                    <span className="text-[11px] font-bold uppercase tracking-wider">{profile.role}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-slate-500">
                                                    <UserIcon className="w-3 h-3 mr-1.5" />
                                                    <span className="text-[11px] font-bold uppercase tracking-wider">User</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <span className="text-xs font-medium text-slate-500">
                                                {profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none rounded-full px-3 py-0.5 text-[10px] font-bold uppercase">
                                                Active
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right py-4 px-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-100 shadow-premium p-1">
                                                    <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem className="rounded-lg text-sm font-medium px-3 py-2 cursor-pointer focus:bg-slate-50">View Profile</DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-lg text-sm font-medium px-3 py-2 cursor-pointer focus:bg-slate-50">Edit User</DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-slate-50" />
                                                    <DropdownMenuItem className="rounded-lg text-sm font-bold text-[#D81B12] px-3 py-2 cursor-pointer focus:bg-red-50">Suspend User</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="p-6 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                            <p className="text-xs text-slate-400 font-medium">Showing <span className="text-slate-900 font-bold">{filteredProfiles.length}</span> of <span className="text-slate-900 font-bold">{profiles.length}</span> users</p>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-slate-200 text-[10px] font-bold uppercase tracking-widest" disabled>Prev</Button>
                                <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-slate-200 text-[10px] font-bold uppercase tracking-widest" disabled>Next</Button>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-none shadow-premium bg-white p-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center">
                            <ShieldAlert className="w-4 h-4 mr-2 text-[#D81B12]" />
                            Role Distribution
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#D81B12]"></div>
                                    <span className="text-sm font-bold text-slate-600">Admin</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">{profiles?.filter(p => p.role === 'admin' || p.role === 'super_admin').length || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                    <span className="text-sm font-bold text-slate-600">Regular Users</span>
                                </div>
                                <span className="text-sm font-black text-slate-900">{profiles?.filter(p => !p.role || p.role === 'user').length || 0}</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-none shadow-premium bg-[#1E293B] text-white p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 relative z-10">Total Members</h3>
                        <div className="text-4xl font-black mb-4 relative z-10">{profiles?.length || 0}</div>
                        <p className="text-xs font-medium text-slate-400 relative z-10 leading-relaxed">
                            Your community is growing. Active monitoring and security checks are recommended.
                        </p>
                        <Button className="w-full mt-6 bg-[#D81B12] hover:bg-[#9E0F09] border-none rounded-xl font-bold text-xs uppercase tracking-widest h-11">
                            Security Logs
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

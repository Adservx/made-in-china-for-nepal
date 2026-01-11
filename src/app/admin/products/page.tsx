"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import {
    Package,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    ExternalLink,
    ChevronRight,
    ChevronLeft
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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();
    const supabase = createClient();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setLoading(true);
            const [productsRes, categoriesRes] = await Promise.all([
                supabase.from("products").select("*, categories(name)").order("created_at", { ascending: false }),
                supabase.from("categories").select("*").order("name")
            ]);

            if (productsRes.error) throw productsRes.error;
            if (categoriesRes.error) throw categoriesRes.error;

            setProducts(productsRes.data || []);
            setCategories(categoriesRes.data || []);
        } catch (error: any) {
            toast({
                title: "Error fetching data",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Products</h1>
                    <p className="text-slate-500 font-medium">Manage your inventory, prices, and suppliers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 h-11 px-6 font-bold text-xs uppercase tracking-widest">
                        Export JSON
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-[#D81B12] hover:bg-[#9E0F09] rounded-xl shadow-lg shadow-red-100 h-11 px-6 flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                                <Plus className="w-4 h-4" />
                                Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] rounded-[2rem] border-none shadow-lift overflow-hidden p-0">
                            <div className="bg-[#1E293B] p-8 text-white relative">
                                <div className="absolute right-0 top-0 w-32 h-32 bg-[#D81B12]/10 rounded-full blur-3xl"></div>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-black tracking-tight">Add New Product</DialogTitle>
                                    <DialogDescription className="text-slate-400 font-medium">
                                        Fill in the details to list a new product on the marketplace.
                                    </DialogDescription>
                                </DialogHeader>
                            </div>
                            <div className="p-8 space-y-6 bg-white overflow-y-auto max-h-[70vh]">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Name</Label>
                                        <Input id="name" placeholder="E.g. Solar Panel 450W" className="rounded-xl border-slate-100 bg-slate-50 h-11 text-sm font-medium focus:bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
                                        <Select>
                                            <SelectTrigger className="rounded-xl border-slate-100 bg-slate-50 h-11 text-sm font-medium">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-slate-100 shadow-premium">
                                                {categories.map((cat: any) => (
                                                    <SelectItem key={cat.id} value={cat.id} className="rounded-lg">{cat.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="price_min" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Min Price ($)</Label>
                                        <Input id="price_min" type="number" placeholder="0.00" className="rounded-xl border-slate-100 bg-slate-50 h-11 text-sm font-medium focus:bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="price_max" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Max Price ($)</Label>
                                        <Input id="price_max" type="number" placeholder="0.00" className="rounded-xl border-slate-100 bg-slate-50 h-11 text-sm font-medium focus:bg-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="min_order" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Min Order Unit</Label>
                                        <Input id="min_order" placeholder="100 Units" className="rounded-xl border-slate-100 bg-slate-50 h-11 text-sm font-medium focus:bg-white" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="supplier" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Supplier Name</Label>
                                    <Input id="supplier" placeholder="Shenzhen Tech Co." className="rounded-xl border-slate-100 bg-slate-50 h-11 text-sm font-medium focus:bg-white" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image_url" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Image URL</Label>
                                    <Input id="image_url" placeholder="https://..." className="rounded-xl border-slate-100 bg-slate-50 h-11 text-sm font-medium focus:bg-white" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                                    <Textarea id="description" placeholder="Technical specifications..." className="rounded-xl border-slate-100 bg-slate-50 min-h-[100px] text-sm font-medium focus:bg-white resize-none" />
                                </div>
                            </div>
                            <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
                                <Button variant="ghost" className="rounded-xl font-bold text-xs uppercase tracking-widest">Cancel</Button>
                                <Button className="bg-[#D81B12] hover:bg-[#9E0F09] rounded-xl shadow-lg shadow-red-100 px-8 font-bold text-xs uppercase tracking-widest h-11">Create Product</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card className="border-none shadow-premium bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50 px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="relative flex-1 max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#D81B12] transition-colors" />
                            <Input
                                placeholder="Search products by name or supplier..."
                                className="pl-12 h-12 bg-slate-100 border-none rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 ring-red-500/10 transition-all shadow-inner"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-slate-100 bg-slate-50 text-slate-500 font-bold text-[10px] uppercase tracking-wider h-10 flex items-center">
                                <Package className="w-3.5 h-3.5 mr-2" />
                                {products.length} Products Total
                            </Badge>
                            <Button variant="ghost" className="h-10 px-5 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-100">
                                <Filter className="w-4 h-4 mr-2" />
                                Category
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-none">
                            <TableHead className="w-[80px] text-center text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Img</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Product Details</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Category</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Price Range</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6">Supplier</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-6 text-right px-8">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="w-8 h-8 border-4 border-[#D81B12]/20 border-t-[#D81B12] rounded-full animate-spin"></div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Catalog...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                            <Package className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-900">No products found</p>
                                            <p className="text-sm text-slate-400">Try adjusting your search or filters.</p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredProducts.map((product) => (
                            <TableRow key={product.id} className="border-slate-50 hover:bg-slate-50/30 transition-colors group">
                                <TableCell className="py-4 text-center">
                                    <div className="w-14 h-14 rounded-xl border border-slate-100 overflow-hidden bg-white mx-auto group-hover:scale-110 transition-transform shadow-sm">
                                        <img src={product.image_url || "/placeholder.jpg"} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div>
                                        <p className="text-sm font-black text-slate-900 group-hover:text-[#D81B12] transition-colors mb-0.5">{product.name}</p>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">MOQ: {product.min_order}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Badge variant="outline" className="rounded-full border-slate-100 bg-slate-50 text-slate-500 text-[10px] font-bold px-3 py-0.5">
                                        {(product.categories as any)?.name || 'Uncategorized'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-slate-900">${product.price_min?.toFixed(2)} - ${product.price_max?.toFixed(2)}</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase uppercase tracking-wider">{product.currency} / Unit</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-600">{product.supplier}</span>
                                        <ExternalLink className="w-3 h-3 text-slate-300" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-right py-4 px-8">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 rounded-2xl border-slate-100 shadow-lift p-1.5 animate-in slide-in-from-top-2 duration-200">
                                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 py-3">Operations</DropdownMenuLabel>
                                            <DropdownMenuItem className="rounded-xl text-sm font-bold px-4 py-3 cursor-pointer group focus:bg-slate-50">
                                                <Eye className="w-4 h-4 mr-3 text-slate-400 group-hover:text-[#D81B12] transition-colors" />
                                                Live Preview
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-xl text-sm font-bold px-4 py-3 cursor-pointer group focus:bg-slate-50">
                                                <Edit className="w-4 h-4 mr-3 text-slate-400 group-hover:text-[#D81B12] transition-colors" />
                                                Edit Details
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-slate-100 mx-2 my-1" />
                                            <DropdownMenuItem className="rounded-xl text-sm font-bold text-[#D81B12] px-4 py-3 cursor-pointer focus:bg-red-50">
                                                <Trash2 className="w-4 h-4 mr-3" />
                                                Delete Product
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            Showing <span className="text-slate-900 font-black">{filteredProducts.length}</span> results
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200" disabled>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                            <Button className="h-10 w-10 rounded-xl bg-[#D81B12] text-white font-black text-xs">1</Button>
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200" disabled>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

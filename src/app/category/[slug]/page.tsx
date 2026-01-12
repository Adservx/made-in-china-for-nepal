import ProductCard from "@/components/ProductCard";
import { ChevronRight, Box } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    // Find the matching category by slug
    const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!categoryData) {
        notFound();
    }

    // Fetch products for this category
    const { data: productsData } = await supabase
        .from("products")
        .select("*, categories(name)")
        .eq("category_id", categoryData.id);

    // Fetch other categories for suggestions
    const { data: otherCategories } = await supabase
        .from("categories")
        .select("*")
        .neq("id", categoryData.id)
        .limit(8);

    const categoryProducts = productsData || [];

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="container-fluid-custom">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-8 items-center flex">
                    <ol className="breadcrumb bg-transparent p-0 m-0 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <li className="breadcrumb-item">
                            <Link href="/" className="text-slate-400 no-underline hover:text-[#D81B12] transition-colors">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/products" className="text-slate-400 no-underline hover:text-[#D81B12] transition-colors">Procurement</Link>
                        </li>
                        <li className="breadcrumb-item active text-[#D81B12]" aria-current="page">{categoryData.name}</li>
                    </ol>
                </nav>

                {/* Category Header - Premium Stage */}
                <div className="relative rounded-[3rem] p-12 lg:p-20 overflow-hidden bg-slate-950 text-white mb-20 shadow-3xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-600/20 to-transparent"></div>
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-6 bg-rose-600 rounded-full"></div>
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-rose-600">Verified Sector</span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-none">{categoryData.name}</h2>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed mb-0">
                            Access {categoryProducts.length} verified industrial resources from premium {categoryData.name} manufacturers specialized in Nepal&apos;s trade protocols.
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {categoryProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
                        <Box size={48} className="text-slate-200 mx-auto mb-6" />
                        <h4 className="text-xl font-bold text-slate-400">Inventory Reserved</h4>
                        <p className="text-slate-400 text-sm font-medium mb-8">Resources in this segment are currently being updated.</p>
                        <Link href="/products" className="bg-slate-950 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest no-underline transition-all hover:bg-rose-600">
                            Browse Catalog Hub
                        </Link>
                    </div>
                )}

                {/* Related Categories - High Exposure */}
                <div className="mt-32">
                    <div className="flex items-center justify-between mb-12">
                        <h5 className="text-2xl font-black text-slate-950 tracking-tighter">Explore Other Segments</h5>
                        <Link href="/products" className="text-xs font-black text-rose-600 uppercase tracking-widest no-underline flex items-center gap-2 group">
                            Full Index <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {(otherCategories || []).map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="px-8 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest no-underline hover:border-[#D81B12] hover:shadow-premium transition-all"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

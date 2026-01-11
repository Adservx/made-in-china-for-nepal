import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return categories.map((cat) => ({
        slug: cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"),
    }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    // Find the matching category
    const category = categories.find(
        (cat) => cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === slug
    );

    if (!category) {
        notFound();
    }

    const categoryProducts = products.filter((p) => p.category === category);

    return (
        <div className="bg-light min-vh-100">
            <div className="container py-4">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb fs-7">
                        <li className="breadcrumb-item">
                            <Link href="/" className="text-decoration-none">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/products" className="text-decoration-none">Products</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{category}</li>
                    </ol>
                </nav>

                {/* Category Header */}
                <div className="card border-0 shadow-premium p-4 mb-4 gradient-china-red text-white">
                    <h2 className="fw-bold mb-2">{category}</h2>
                    <p className="mb-0 opacity-75">
                        Browse {categoryProducts.length} verified products from trusted Chinese suppliers.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="row g-4">
                    {categoryProducts.map((product) => (
                        <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-6">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {categoryProducts.length === 0 && (
                    <div className="text-center py-5">
                        <p className="text-muted">No products available in this category yet.</p>
                        <Link href="/products" className="btn btn-danger">
                            Browse All Products
                        </Link>
                    </div>
                )}

                {/* Related Categories */}
                <div className="mt-5">
                    <h5 className="fw-bold mb-3">Explore Other Categories</h5>
                    <div className="d-flex flex-wrap gap-2">
                        {categories
                            .filter((c) => c !== category)
                            .slice(0, 6)
                            .map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/category/${cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                                    className="btn btn-outline-secondary btn-sm rounded-pill"
                                >
                                    {cat} <ChevronRight size={14} />
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

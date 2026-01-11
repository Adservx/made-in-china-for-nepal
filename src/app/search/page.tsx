"use client";

import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const results = query
        ? products.filter(
            (p) =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase()) ||
                p.supplier.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <div className="bg-light min-vh-100">
            <div className="container py-4">
                {/* Search Header */}
                <div className="mb-4">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb fs-7">
                            <li className="breadcrumb-item"><Link href="/" className="text-decoration-none">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Search</li>
                        </ol>
                    </nav>
                    <h4 className="fw-bold mb-1">
                        <Search size={24} className="me-2 text-danger" />
                        Search Results for "{query}"
                    </h4>
                    <p className="text-muted fs-7">Found {results.length} products</p>
                </div>

                {/* Results Grid */}
                {results.length > 0 ? (
                    <div className="row g-4">
                        {results.map((product) => (
                            <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-6">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card border-0 shadow-premium text-center py-5">
                        <Search size={48} className="text-muted mx-auto mb-3" />
                        <h5 className="fw-bold">No results found</h5>
                        <p className="text-muted mb-4">Try searching with different keywords or browse our categories.</p>
                        <Link href="/products" className="btn btn-danger mx-auto">
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container py-5 text-center">Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}

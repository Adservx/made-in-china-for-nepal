import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Star, ShieldCheck, MapPin, CheckCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const sampleSellers = [
    { id: "1", name: "Jiangsu Green Energy Co., Ltd.", location: "Jiangsu, China", verified: true, rating: 4.8, years: 8 },
    { id: "2", name: "Shenzhen Tech Innovations", location: "Shenzhen, China", verified: true, rating: 4.5, years: 5 },
    { id: "3", name: "Zhejiang Mobility Pro", location: "Zhejiang, China", verified: true, rating: 4.7, years: 6 },
];

interface SellerPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return sampleSellers.map((seller) => ({
        id: seller.id,
    }));
}

export default async function SellerPage({ params }: SellerPageProps) {
    const { id } = await params;

    const seller = sampleSellers.find((s) => s.id === id);

    if (!seller) {
        notFound();
    }

    // Get products from this supplier (in a real app, this would be a proper filter)
    const sellerProducts = products.slice(0, 4);

    return (
        <div className="bg-light min-vh-100">
            <div className="container py-4">
                {/* Seller Header */}
                <div className="card border-0 shadow-premium p-4 mb-4">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="bg-danger text-white rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
                                    <span className="fw-bold fs-4">{seller.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h4 className="fw-bold mb-1">{seller.name}</h4>
                                    <div className="d-flex align-items-center gap-3 text-muted fs-7">
                                        <span><MapPin size={14} /> {seller.location}</span>
                                        <span><Star size={14} className="text-warning" /> {seller.rating}</span>
                                        <span>{seller.years} Years in Business</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-2 flex-wrap">
                                {seller.verified && (
                                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2">
                                        <CheckCircle size={12} className="me-1" /> Verified Supplier
                                    </span>
                                )}
                                <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2">
                                    <ShieldCheck size={12} className="me-1" /> Trade Assurance
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                            <button className="btn btn-danger me-2 d-inline-flex align-items-center gap-2">
                                <MessageSquare size={18} /> Contact Supplier
                            </button>
                            <Link href="/rfq" className="btn btn-outline-danger">
                                Send RFQ
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Seller Stats */}
                <div className="row g-3 mb-4">
                    {[
                        { label: "Total Products", value: "150+", color: "text-primary" },
                        { label: "Response Rate", value: "98%", color: "text-success" },
                        { label: "On-time Delivery", value: "95%", color: "text-warning" },
                        { label: "Transaction Level", value: "Diamond", color: "text-danger" },
                    ].map((stat, i) => (
                        <div key={i} className="col-md-3 col-6">
                            <div className="card border-0 shadow-premium p-3 text-center h-100">
                                <h4 className={`fw-bold mb-0 ${stat.color}`}>{stat.value}</h4>
                                <p className="text-muted fs-8 mb-0">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Products */}
                <h5 className="fw-bold mb-3">Products from this Supplier</h5>
                <div className="row g-4">
                    {sellerProducts.map((product) => (
                        <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-6">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

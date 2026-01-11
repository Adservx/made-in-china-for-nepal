"use client";

import { useAppContext } from "@/context/AppContext";
import { Package, Eye, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const sampleOrders = [
    {
        id: "ORD-2026-001",
        date: "2026-01-08",
        status: "Shipped",
        total: "USD 450.00",
        items: 3,
        tracking: "CN123456789NP",
    },
    {
        id: "ORD-2026-002",
        date: "2026-01-05",
        status: "Processing",
        total: "USD 1,200.00",
        items: 1,
        tracking: null,
    },
    {
        id: "ORD-2025-089",
        date: "2025-12-20",
        status: "Delivered",
        total: "USD 320.00",
        items: 5,
        tracking: "CN987654321NP",
    },
];

export default function OrdersPage() {
    const { user } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="container py-5 text-center">
                <p>Redirecting to login...</p>
            </div>
        );
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Shipped":
                return "bg-primary-subtle text-primary";
            case "Processing":
                return "bg-warning-subtle text-warning";
            case "Delivered":
                return "bg-success-subtle text-success";
            default:
                return "bg-secondary-subtle text-secondary";
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <div className="container py-4">
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb fs-7">
                        <li className="breadcrumb-item"><Link href="/" className="text-decoration-none">Home</Link></li>
                        <li className="breadcrumb-item"><Link href="/account" className="text-decoration-none">Account</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Orders</li>
                    </ol>
                </nav>

                <h3 className="fw-bold mb-4">My Orders</h3>

                <div className="card border-0 shadow-premium overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="px-4 py-3 text-muted fs-8 text-uppercase fw-bold border-0">Order ID</th>
                                    <th className="py-3 text-muted fs-8 text-uppercase fw-bold border-0">Date</th>
                                    <th className="py-3 text-muted fs-8 text-uppercase fw-bold border-0">Items</th>
                                    <th className="py-3 text-muted fs-8 text-uppercase fw-bold border-0">Total</th>
                                    <th className="py-3 text-muted fs-8 text-uppercase fw-bold border-0">Status</th>
                                    <th className="px-4 py-3 text-center text-muted fs-8 text-uppercase fw-bold border-0">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <Package size={18} className="text-muted" />
                                                <span className="fw-bold">{order.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-muted">{order.date}</td>
                                        <td className="py-3">{order.items} items</td>
                                        <td className="py-3 fw-bold">{order.total}</td>
                                        <td className="py-3">
                                            <span className={`badge ${getStatusBadge(order.status)} rounded-pill px-3 py-2`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="d-flex justify-content-center gap-2">
                                                <button className="btn btn-light btn-sm rounded-3 d-flex align-items-center gap-1">
                                                    <Eye size={14} /> View
                                                </button>
                                                {order.tracking && (
                                                    <Link href={`/tracking?id=${order.tracking}`} className="btn btn-outline-primary btn-sm rounded-3 d-flex align-items-center gap-1">
                                                        <Truck size={14} /> Track
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

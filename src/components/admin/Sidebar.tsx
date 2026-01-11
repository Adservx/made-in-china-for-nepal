"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FileText,
    Settings,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "RFQs", href: "/admin/rfqs", icon: FileText },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white border-r border-slate-800 z-50 transition-all duration-300 overflow-y-auto scrollbar-hidden">
            <div className="flex flex-col h-full">
                {/* Brand */}
                <div className="p-8 pb-4">
                    <Link href="/" className="flex flex-col items-start leading-none group">
                        <span className="text-xl font-black tracking-tighter text-white group-hover:text-[#D81B12] transition-colors">MADE-IN-CHINA</span>
                        <span className="bg-[#D81B12] text-white rounded-full px-2 py-0.5 text-[8px] mt-1 font-bold tracking-widest uppercase">FOR NEPAL</span>
                    </Link>
                    <div className="mt-8 px-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Control</p>
                    </div>
                </div>

                {/* Menu */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-[#D81B12] text-white shadow-lg shadow-red-900/20"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-white" : "text-slate-500 group-hover:text-white"
                                )} />
                                <span className="font-bold text-sm tracking-wide">{item.name}</span>
                                {isActive && (
                                    <ChevronRight className="w-4 h-4 ml-auto text-white/50" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer info */}
                <div className="p-6 border-t border-slate-800">
                    <div className="flex items-center space-x-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                        <div className="w-8 h-8 rounded-full bg-[#D81B12] flex items-center justify-center font-bold text-xs ring-2 ring-slate-700">A</div>
                        <div>
                            <p className="text-xs font-bold">Admin Panel</p>
                            <p className="text-[10px] text-slate-500 font-medium tracking-tight">Version 2.0.1</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

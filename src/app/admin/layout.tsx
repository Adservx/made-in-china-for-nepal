import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/Sidebar";
import {
    Bell,
    Search,
    HelpCircle,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Check role from both profile table and auth metadata
    let userRole = user.app_metadata?.role || user.user_metadata?.role;

    // Fallback to profile table if not in metadata or to double check
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (!profileError && profile?.role) {
        userRole = profile.role;
    }

    console.log(`Admin access attempt: ${user.email}, detected role: ${userRole}`);

    if (userRole !== "admin" && userRole !== "super_admin") {
        console.log(`Access denied: Redirecting ${user.email} to home.`);
        return redirect("/");
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <AdminSidebar />
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 px-8 flex items-center justify-between">
                    <div className="flex items-center flex-1 max-w-xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#D81B12] transition-colors" />
                            <Input
                                placeholder="Search anything in admin..."
                                className="w-full pl-10 bg-slate-100 border-none focus:bg-white h-11 rounded-2xl text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 ml-8">
                        <Button variant="ghost" size="icon" className="text-slate-500 rounded-xl hover:bg-slate-100 relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 rounded-xl hover:bg-slate-100">
                            <HelpCircle className="w-5 h-5" />
                        </Button>
                        <form action="/auth/signout" method="post">
                            <Button type="submit" variant="ghost" size="icon" className="text-red-500 rounded-xl hover:bg-red-50">
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </form>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                        <div className="flex items-center space-x-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900">{user.user_metadata?.full_name || 'Admin User'}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{userRole}</p>
                            </div>
                            <Avatar className="h-10 w-10 rounded-xl border-2 border-slate-100 ring-2 ring-white shadow-sm">
                                <AvatarImage src={user.user_metadata?.avatar_url} />
                                <AvatarFallback className="bg-[#9E0F09] text-white font-bold">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLoading() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-3">
                    <div className="h-10 w-48 bg-slate-200 rounded-xl shimmer"></div>
                    <div className="h-4 w-64 bg-slate-100 rounded-lg shimmer"></div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-11 w-32 bg-slate-100 rounded-xl shimmer"></div>
                    <div className="h-11 w-32 bg-slate-100 rounded-xl shimmer"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div className="h-[500px] w-full bg-white rounded-[2.5rem] shadow-premium p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="h-11 w-64 bg-slate-50 rounded-xl shimmer"></div>
                            <div className="flex gap-2">
                                <div className="h-11 w-24 bg-slate-50 rounded-xl shimmer"></div>
                                <div className="h-11 w-24 bg-slate-50 rounded-xl shimmer"></div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-16 w-full bg-slate-50/50 rounded-2xl shimmer"></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="h-48 w-full bg-white rounded-[2.5rem] shadow-premium shimmer"></div>
                    <div className="h-64 w-full bg-[#1E293B] rounded-[2.5rem] shadow-premium shimmer"></div>
                </div>
            </div>
        </div>
    );
}

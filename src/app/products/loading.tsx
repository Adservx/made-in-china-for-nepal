export default function ProductsLoading() {
    return (
        <div className="container-fluid-custom py-12 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="space-y-4">
                    <div className="h-4 w-32 bg-slate-100 rounded shimmer"></div>
                    <div className="h-12 w-64 bg-slate-200 rounded-2xl shimmer"></div>
                </div>
                <div className="flex gap-3">
                    <div className="h-11 w-32 bg-slate-50 rounded-xl shimmer"></div>
                    <div className="h-11 w-48 bg-slate-50 rounded-xl shimmer"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="space-y-4">
                        <div className="aspect-square w-full bg-slate-100 rounded-3xl shimmer"></div>
                        <div className="space-y-2 px-2">
                            <div className="h-4 w-3/4 bg-slate-100 rounded shimmer"></div>
                            <div className="h-4 w-1/2 bg-slate-50 rounded shimmer"></div>
                            <div className="h-6 w-1/4 bg-slate-100 rounded shimmer mt-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

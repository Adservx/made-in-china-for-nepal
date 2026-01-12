export default function ProductDetailLoading() {
    return (
        <div className="container-fluid-custom py-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Image Gallery Skeleton */}
                <div className="space-y-6">
                    <div className="aspect-square w-full bg-slate-100 rounded-[2.5rem] shimmer"></div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-slate-50 rounded-2xl shimmer"></div>
                        ))}
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="space-y-8 py-4">
                    <div className="space-y-4">
                        <div className="h-4 w-24 bg-slate-100 rounded shimmer"></div>
                        <div className="h-12 w-full bg-slate-200 rounded-2xl shimmer"></div>
                        <div className="h-6 w-1/3 bg-slate-100 rounded-xl shimmer"></div>
                    </div>

                    <div className="h-24 w-full bg-slate-50 rounded-[2rem] shimmer"></div>

                    <div className="space-y-4 pt-4">
                        <div className="h-14 w-full bg-rose-50 rounded-full shimmer"></div>
                        <div className="h-14 w-full bg-slate-100 rounded-full shimmer"></div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-slate-100">
                        <div className="h-4 w-1/4 bg-slate-100 rounded shimmer"></div>
                        <div className="space-y-3">
                            <div className="h-3 w-full bg-slate-50 rounded shimmer"></div>
                            <div className="h-3 w-full bg-slate-50 rounded shimmer"></div>
                            <div className="h-3 w-2/3 bg-slate-50 rounded shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

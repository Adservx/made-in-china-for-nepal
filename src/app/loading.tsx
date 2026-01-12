export default function Loading() {
    return (
        <div className="fixed top-0 left-0 right-0 z-[9999]">
            <div className="loading-bar"></div>
            <div className="min-h-screen bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-2xl"></div>
                    <div className="absolute inset-0 border-4 border-[#D81B12] rounded-2xl animate-spin [animation-duration:1.5s] [border-top-color:transparent] [border-left-color:transparent]"></div>
                </div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Loading Experience</p>
            </div>
        </div>
    );
}

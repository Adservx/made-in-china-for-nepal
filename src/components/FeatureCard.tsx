import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, className = "" }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm transition-all duration-700 hover:shadow-2xl hover:shadow-slate-200/50 group ${className}`}
        >
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 transition-all duration-700 group-hover:bg-rose-600 group-hover:rotate-[10deg] shadow-inner">
                <Icon className="text-slate-900 transition-colors group-hover:text-white" size={26} />
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-4 tracking-tighter transition-colors group-hover:text-rose-600">{title}</h3>
            <p className="text-[14px] text-slate-500 leading-relaxed font-medium tracking-tight">{description}</p>
        </motion.div>
    );
};

export default FeatureCard;

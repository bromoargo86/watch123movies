"use client";

import { handleAdsterraAIClick, getAdsterraAIStats } from '../../utils/adsterra-ai';
import { useState, useEffect, useRef } from 'react';

export default function AdLinkAI({ 
    url, 
    children, 
    className = '',
    showIndicator = true,
    title: customTitle = ''
}) {
    const [stats, setStats] = useState(null);
    const linkRef = useRef(null);
    
    useEffect(() => {
        const update = () => setStats(getAdsterraAIStats());
        update(); // Initial
        const interval = setInterval(update, 2000); // Polling setiap 2 detik
        return () => clearInterval(interval);
    }, []);
    
    const handleClick = (e) => {
        e.preventDefault(); // Stop default navigation dulu
        
        try {
            // Kalkulasi AI
            const result = handleAdsterraAIClick(e, url);
            
            if (result.adShown && result.adUrl) {
                // 1. Buka IKLAN di Tab Baru (Foreground)
                window.open(result.adUrl, '_blank', 'noopener,noreferrer');
                
                // 2. Redirect Konten Utama di Tab Sekarang (Background logic)
                // Beri jeda sangat sedikit agar browser memprioritaskan tab baru (iklan)
                setTimeout(() => {
                    window.location.href = url;
                }, 100);
            } else {
                // Normal Click
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        } catch (err) {
            console.error("AdLink error", err);
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };
    
    // Visual Indicator Logic
    const clicksNeeded = stats?.optimizer?.clicksToNextAd || 0;
    const progress = stats?.session ? (stats.session.clicks / stats.optimizer.currentThreshold) * 100 : 0;
    
    return (
        <a
            ref={linkRef}
            href={url}
            onClick={handleClick}
            className={`relative inline-flex items-center gap-2 cursor-pointer ${className}`}
            title={customTitle || (clicksNeeded === 0 ? "Ad Ready" : `${clicksNeeded} clicks to ad`)}
        >
            {children}
            
            {showIndicator && (
                <div className="relative w-5 h-5 flex items-center justify-center">
                     {/* Circular Progress */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="50%" cy="50%" r="9" stroke="#334155" strokeWidth="2" fill="none" />
                        <circle 
                            cx="50%" cy="50%" r="9" 
                            stroke={clicksNeeded === 0 ? "#22c55e" : "#f59e0b"} 
                            strokeWidth="2" fill="none"
                            strokeDasharray="56.5"
                            strokeDashoffset={56.5 * (1 - Math.min(progress, 100) / 100)}
                            className="transition-all duration-300"
                        />
                    </svg>
                    <span className="text-[10px] font-bold text-white relative z-10">
                        {clicksNeeded === 0 ? '★' : clicksNeeded}
                    </span>
                </div>
            )}
        </a>
    );
}
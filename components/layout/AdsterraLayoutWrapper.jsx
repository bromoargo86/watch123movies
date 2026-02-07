// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-9286d7d498010b34778042caf6720f37');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/9286d7d498010b34778042caf6720f37/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/0e/2b/70/0e2b708a0909265b35fbb8dc3bc86577.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="ff21c84d6d24054dd5199d866199c391"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/ff/21/c8/ff21c84d6d24054dd5199d866199c391.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}
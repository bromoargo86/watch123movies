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

        const nativeContainer = document.getElementById('container-aeaf4b8167d2b9a051baa686b34245c3');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/aeaf4b8167d2b9a051baa686b34245c3/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/b8/e1/cb/b8e1cb96e5394dbd264f8b77c1a2883b.js' }
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
            if(document.querySelector(`script[src*="a7e236d24502edfd6845cb165ced601a"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/a7/e2/36/a7e236d24502edfd6845cb165ced601a.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}
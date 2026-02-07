"use client";

import { useEffect, useRef } from 'react';

export default function AdBanner({ 
  adId, 
  scriptKey, 
  height = 90, 
  width = 728, 
  className = '' 
}) {
  const containerRef = useRef(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (loaded.current || !containerRef.current) return;

    try {
        containerRef.current.innerHTML = '';

        const conf = document.createElement('script');
        conf.type = 'text/javascript';
        conf.text = `
            atOptions = {
                'key' : '${scriptKey}',
                'format' : 'iframe',
                'height' : ${height},
                'width' : ${width},
                'params' : {}
            };
        `;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//fundingfashioned.com/${scriptKey}/invoke.js`;
        script.async = true;

        containerRef.current.appendChild(conf);
        containerRef.current.appendChild(script);
        
        loaded.current = true;
    } catch (err) {
        console.error("AdBanner Error:", err);
    }
  }, [scriptKey, height, width]);

  return (
    <div className={`flex justify-center items-center my-4 ${className}`}>
      <div 
        ref={containerRef} 
        id={`ad-container-${adId}`}
        style={{ minWidth: width, minHeight: height }}
        className="bg-slate-800/20"
      />
    </div>
  );
}
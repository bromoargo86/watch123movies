"use client";

import { useEffect } from 'react';

export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scriptsLoaded = false;
      
      const loadAdScripts = () => {
        if (scriptsLoaded) return;
        
        // Memuat skrip iklan Native Banner
        const nativeBannerScript = document.createElement('script');
        nativeBannerScript.src = "//fundingfashioned.com/aeaf4b8167d2b9a051baa686b34245c3/invoke.js";
        nativeBannerScript.async = true;
        nativeBannerScript.setAttribute('data-cfasync', 'false');
        nativeBannerScript.id = 'adsterra-native-banner';
        document.body.appendChild(nativeBannerScript);

        // Memuat skrip iklan Popunder
        const popunderScript = document.createElement('script');
        popunderScript.type = 'text/javascript';
        popunderScript.src = "//fundingfashioned.com/a7/e2/36/a7e236d24502edfd6845cb165ced601a.js";
        popunderScript.async = true;
        popunderScript.id = 'adsterra-popunder';
        document.body.appendChild(popunderScript);

        // Memuat skrip iklan Social Bar
        const socialBarScript = document.createElement('script');
        socialBarScript.type = 'text/javascript';
        socialBarScript.src = "//fundingfashioned.com/b8/e1/cb/b8e1cb96e5394dbd264f8b77c1a2883b.js";
        socialBarScript.async = true;
        socialBarScript.id = 'adsterra-social-bar';
        document.body.appendChild(socialBarScript);

        scriptsLoaded = true;
      };

      // Delay loading untuk memastikan DOM siap
      const timer = setTimeout(loadAdScripts, 1000);

      return () => {
        clearTimeout(timer);
        
        // Hapus scripts jika ada
        const scriptsToRemove = [
          'adsterra-native-banner',
          'adsterra-popunder', 
          'adsterra-social-bar'
        ];
        
        scriptsToRemove.forEach(id => {
          const script = document.getElementById(id);
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
      };
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}
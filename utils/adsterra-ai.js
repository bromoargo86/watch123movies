// utils/adsterra-ai.js
const SMARTLINKS = [
    { id: 'sl1', url: 'https://fundingfashioned.com/yed8kj7bvw?key=b7830767455354f8e097df2a9e0f040c', weight: 1.5 },
    { id: 'sl2', url: 'https://fundingfashioned.com/wdhedf2wx?key=a2c98838af4390b59e8b7aaaea3f1660', weight: 1.2 },
    { id: 'sl3', url: 'https://fundingfashioned.com/nu4ravi1cx?key=4d0556009c2d17968977e235d5de925a', weight: 1.0 },
    { id: 'sl4', url: 'https://fundingfashioned.com/u1ipxidjif?key=bf544685cc418fde38d3de4391de6fee', weight: 1.0 },
    { id: 'sl5', url: 'https://fundingfashioned.com/gh4tkda15?key=080742d09d4b5234a4fdaa773e48ebd4', weight: 0.8 },
    { id: 'sl6', url: 'https://fundingfashioned.com/paij3re0by?key=fa60f72b73c05d987bd978f83a6deaa8', weight: 1.1 },
    { id: 'sl7', url: 'https://fundingfashioned.com/gd8bwkyj?key=d2d35cf16f521bf5e9accfdd865dae8f', weight: 0.9 },
    { id: 'sl8', url: 'https://fundingfashioned.com/x818nj48?key=db0a9d9fa9d81626b459383a7bdc33ee', weight: 1.0 },
    { id: 'sl9', url: 'https://fundingfashioned.com/w2sw8zgx21?key=d34ca1378210247721e98e65d20b3693', weight: 0.7 },
    { id: 'sl10', url: 'https://fundingfashioned.com/qn92sfcb?key=a8333f15c6bba15e367a5456f691547c', weight: 0.6 }
];

const AI_CONFIG = {
    BASE_CLICKS_FOR_AD: 4,
    MIN_CLICKS_FOR_AD: 2,
    MAX_CLICKS_FOR_AD: 8,
    TRAFFIC_LEVELS: {
        LOW: { multiplier: 1.5, hours: [0, 1, 2, 3, 4, 5, 13, 14] },
        MEDIUM: { multiplier: 1.0, hours: [6, 7, 9, 10, 15, 16, 22, 23] },
        HIGH: { multiplier: 0.7, hours: [8, 11, 12, 17, 18, 19, 20, 21] }
    },
    GEO_TIERS: {
        TIER1: ['US', 'CA', 'UK', 'AU', 'DE', 'FR'],
        TIER2: ['JP', 'IT', 'ES', 'NL', 'SE', 'NO'],
        TIER3: ['ID', 'IN', 'VN', 'PH', 'BR', 'MX']
    }
};

class SmartLinkManager {
    constructor() {
        this.links = SMARTLINKS.map(link => ({
            ...link,
            clicks: 0,
            impressions: 0,
            weight: link.weight,
            lastShown: 0
        }));
        this.loadFromStorage();
    }

    getNextLink() {
        const now = Date.now();
        const available = this.links.filter(l => now - l.lastShown > 10000);
        const pool = available.length > 0 ? available : this.links;
        const totalWeight = pool.reduce((sum, link) => sum + link.weight, 0);
        let random = Math.random() * totalWeight;

        for (const link of pool) {
            if (random < link.weight) {
                link.lastShown = Date.now();
                link.impressions++;
                this.saveToStorage();
                return link;
            }
            random -= link.weight;
        }
        return pool[0];
    }

    trackClick(linkId) {
        const link = this.links.find(l => l.id === linkId);
        if (link) {
            link.clicks++;
            link.weight = Math.min(3.0, link.weight * 1.05);
            this.saveToStorage();
        }
    }

    saveToStorage() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('adsterraLinkStats', JSON.stringify({
                links: this.links.map(l => ({ id: l.id, clicks: l.clicks, impressions: l.impressions, weight: l.weight }))
            }));
        }
    }

    loadFromStorage() {
        if (typeof localStorage !== 'undefined') {
            try {
                const saved = JSON.parse(localStorage.getItem('adsterraLinkStats'));
                if (saved && saved.links) {
                    saved.links.forEach(s => {
                        const original = this.links.find(l => l.id === s.id);
                        if (original) {
                            original.clicks = s.clicks;
                            original.impressions = s.impressions;
                            original.weight = s.weight;
                        }
                    });
                }
            } catch (e) { console.error('Load stats failed', e); }
        }
    }
}

class AIOptimizer {
    constructor() {
        this.linkManager = new SmartLinkManager();
        this.session = { clicks: 0, adsShown: 0, startTime: Date.now() };
        this.geo = 'DEFAULT';
    }

    setGeo(countryCode) {
        this.geo = countryCode || 'DEFAULT';
    }

    calculateThreshold() {
        let threshold = AI_CONFIG.BASE_CLICKS_FOR_AD;
        const hour = new Date().getHours();
        let timeMult = 1.0;
        Object.values(AI_CONFIG.TRAFFIC_LEVELS).forEach(lvl => {
            if (lvl.hours.includes(hour)) timeMult = lvl.multiplier;
        });
        threshold *= timeMult;
        if (AI_CONFIG.GEO_TIERS.TIER1.includes(this.geo)) threshold *= 0.7;
        else if (AI_CONFIG.GEO_TIERS.TIER3.includes(this.geo)) threshold *= 1.2;
        return Math.max(AI_CONFIG.MIN_CLICKS_FOR_AD, Math.round(threshold));
    }

    shouldShowAd() {
        const threshold = this.calculateThreshold();
        if (this.session.clicks >= threshold) {
            return { show: true, threshold };
        }
        return { show: false, threshold, clicks: this.session.clicks };
    }

    registerClick() {
        this.session.clicks++;
    }

    registerAdShown() {
        this.session.adsShown++;
        this.session.clicks = 0;
    }
}

let optimizer = null;

export function getAIOptimizer() {
    if (!optimizer && typeof window !== 'undefined') {
        optimizer = new AIOptimizer();
    }
    return optimizer;
}

export function handleAdsterraAIClick(e, targetUrl) {
    const opt = getAIOptimizer();
    if (!opt) return { adShown: false };
    opt.registerClick();
    const status = opt.shouldShowAd();
    if (status.show) {
        const adLink = opt.linkManager.getNextLink();
        opt.registerAdShown();
        opt.linkManager.trackClick(adLink.id);
        return { adShown: true, adUrl: adLink.url, redirectTarget: targetUrl };
    }
    return { adShown: false };
}

export function getAdsterraAIStats() {
    const opt = getAIOptimizer();
    if (!opt) return null;
    const threshold = opt.calculateThreshold();
    return {
        session: opt.session,
        optimizer: {
            currentThreshold: threshold,
            clicksToNextAd: Math.max(0, threshold - opt.session.clicks),
            trafficLevel: 'Dynamic',
            userEngagement: 1.0
        }
    };
}

// Tambahkan alias untuk kompatibilitas dengan index.js
export const getAdStatus = getAdsterraAIStats;

export function handleAdsterraClickThrottled(e, targetUrl) {
    return handleAdsterraAIClick(e, targetUrl);
}

export function willNextClickShowAd() {
    const opt = getAIOptimizer();
    if (!opt) return false;
    return opt.shouldShowAd().show;
}

export function resetAIOptimizer() {
    const opt = getAIOptimizer();
    if (opt) opt.session.clicks = 0;
}

export function getOptimizationReport() {
    return getAdsterraAIStats();
}

export function changeRotationStrategy(strategy) {
    console.log('Strategy changed to:', strategy);
}
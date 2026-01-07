// app/sitemap.js
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://123movies-lab.vercel.app';

// Helper function untuk fetch dari TMDB
async function fetchFromTMDB(endpoint) {
  const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const baseUrl = 'https://api.themoviedb.org/3';
  
  if (!apiKey) {
    console.error('TMDB API key is not configured');
    return [];
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}?api_key=${apiKey}&language=en-US&page=1`, {
      next: { revalidate: 86400 }
    });
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Failed to fetch from TMDB ${endpoint}:`, error.message);
    return [];
  }
}

// Improved slug function dengan sanitization lebih baik
const createSlug = (text, year, id) => {
  if (!text) return '';
  
  // Buat slug dari text
  let slug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Hapus karakter khusus
    .replace(/\s+/g, '-')     // Ganti spasi dengan dash
    .replace(/-+/g, '-')      // Hapus multiple dash
    .trim();
  
  // Tambahkan tahun jika valid
  if (year && typeof year === 'string' && year.length === 4 && !isNaN(parseInt(year))) {
    slug = `${slug}-${year}`;
  }
  
  // SELALU tambahkan ID untuk menghindari konflik
  return `${id}-${slug}`;
};

export default async function sitemap() {
  try {
    console.log('Generating sitemap...');
    
    // 1. URL statis (priority tinggi)
    const staticUrls = [
      { 
        url: `${BASE_URL}/`, 
        lastModified: new Date(), 
        changeFrequency: 'daily', 
        priority: 1.0 
      },
      { 
        url: `${BASE_URL}/trending`, 
        lastModified: new Date(), 
        changeFrequency: 'daily', 
        priority: 0.9 
      },
      { 
        url: `${BASE_URL}/movie`, 
        lastModified: new Date(), 
        changeFrequency: 'daily', 
        priority: 0.8 
      },
      { 
        url: `${BASE_URL}/tv-show`, 
        lastModified: new Date(), 
        changeFrequency: 'daily', 
        priority: 0.8 
      },
    ];
    
    // 2. Kategori URLs
    const movieCategories = ['popular', 'now-playing', 'upcoming', 'top-rated'];
    const movieCategoryUrls = movieCategories.map((category) => ({
      url: `${BASE_URL}/movie/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7
    }));
    
    const tvCategories = ['popular', 'airing-today', 'on-the-air', 'top-rated'];
    const tvCategoryUrls = tvCategories.map((category) => ({
      url: `${BASE_URL}/tv-show/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7
    }));
    
    // 3. Ambil data dari TMDB
    const [moviesData, tvShowsData] = await Promise.allSettled([
      fetchFromTMDB('/movie/popular'),
      fetchFromTMDB('/tv/popular')
    ]);
    
    const movies = moviesData.status === 'fulfilled' ? moviesData.value : [];
    const tvShows = tvShowsData.status === 'fulfilled' ? tvShowsData.value : [];
    
    // Filter hanya yang sudah rilis/tayang
    const today = new Date();
    const releasedMovies = movies.filter(movie => {
      if (!movie.release_date) return false;
      const releaseDate = new Date(movie.release_date);
      return releaseDate <= today;
    }).slice(0, 50); // Batasi 50 film
    
    const airedTvShows = tvShows.filter(tv => {
      if (!tv.first_air_date) return false;
      const airDate = new Date(tv.first_air_date);
      return airDate <= today;
    }).slice(0, 50); // Batasi 50 TV show
    
    // 4. Generate detail URLs DENGAN ID
    const movieDetailUrls = releasedMovies.map((movie) => {
      const year = movie.release_date?.substring(0, 4) || '';
      const slug = createSlug(movie.title, year, movie.id);
      return {
        url: `${BASE_URL}/movie/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6
      };
    });
    
    const tvDetailUrls = airedTvShows.map((tvShow) => {
      const year = tvShow.first_air_date?.substring(0, 4) || '';
      const slug = createSlug(tvShow.name, year, tvShow.id);
      return {
        url: `${BASE_URL}/tv-show/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6
      };
    });
    
    // 5. Stream URLs (jika ada route terpisah)
    const movieStreamUrls = releasedMovies.slice(0, 30).map((movie) => {
      const year = movie.release_date?.substring(0, 4) || '';
      const slug = createSlug(movie.title, year, movie.id);
      return {
        url: `${BASE_URL}/movie/${slug}/stream`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5
      };
    });
    
    const tvStreamUrls = airedTvShows.slice(0, 30).map((tvShow) => {
      const year = tvShow.first_air_date?.substring(0, 4) || '';
      const slug = createSlug(tvShow.name, year, tvShow.id);
      return {
        url: `${BASE_URL}/tv-show/${slug}/stream`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5
      };
    });
    
    // 6. Gabungkan semua URLs
    const allUrls = [
      ...staticUrls,
      ...movieCategoryUrls,
      ...tvCategoryUrls,
      ...movieDetailUrls,
      ...tvDetailUrls,
      ...movieStreamUrls,
      ...tvStreamUrls,
    ];
    
    console.log(`✅ Sitemap generated with ${allUrls.length} URLs`);
    console.log(`   - Movies: ${releasedMovies.length}`);
    console.log(`   - TV Shows: ${airedTvShows.length}`);
    
    return allUrls;
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    
    // Minimal fallback
    return [
      { 
        url: `${BASE_URL}/`, 
        lastModified: new Date(), 
        changeFrequency: 'daily', 
        priority: 1.0 
      },
      { 
        url: `${BASE_URL}/movie`, 
        lastModified: new Date(), 
        changeFrequency: 'daily', 
        priority: 0.9 
      },
      { 
        url: `${BASE_URL}/tv-show`, 
        lastModified: new Date(), 
        changeFrequency: 'daily', 
        priority: 0.9 
      },
    ];
  }
}
// api.jsx

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TMDB_API_URL;

// ========== VALIDASI KONFIGURASI ==========
if (typeof window === 'undefined' && (!apiKey || !apiUrl)) {
  console.error('TMDB API keys are not configured. Please check your .env.local file.');
}

// ========== FUNGSI HELPER ==========
const createUrl = (path, params = {}) => {
  const url = new URL(`${apiUrl}${path}`);
  url.searchParams.append('api_key', apiKey);
  url.searchParams.append('language', 'en-US');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  
  return url.toString();
};

const fetchApi = async (path, options = {}, params = {}) => {
  if (!apiKey || !apiUrl) {
    throw new Error('API keys are not configured. Please check your .env.local file.');
  }

  const url = createUrl(path, params);
  
  const defaultOptions = {
    next: { 
      revalidate: 3600, // Default: cache 1 jam
      tags: ['tmdb-data'] 
    }
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    next: {
      ...defaultOptions.next,
      ...options.next,
    }
  };

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      // Handle specific HTTP errors
      if (res.status === 404) {
        throw new Error(`Resource not found: ${path}`);
      }
      if (res.status === 401) {
        throw new Error('Invalid API key');
      }
      if (res.status === 429) {
        throw new Error('Rate limit exceeded');
      }
      
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`API Error (${res.status}): ${errorData.status_message || res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Fetch error for ${path}:`, error);
    throw error;
  }
};

// Fungsi untuk data yang perlu real-time (short cache)
const fetchWithShortCache = async (path, options = {}, params = {}) => {
  return fetchApi(path, {
    next: { revalidate: 300 }, // 5 menit untuk data trending
    ...options
  }, params);
};

// Fungsi untuk data yang jarang berubah (long cache)
const fetchWithLongCache = async (path, options = {}, params = {}) => {
  return fetchApi(path, {
    next: { revalidate: 86400 }, // 24 jam untuk data static
    ...options
  }, params);
};

// ========== VALIDASI RESPONSE ==========
const validateResponse = (data, type = 'general') => {
  if (!data) return false;
  if (data.success === false) return false;
  
  switch (type) {
    case 'movie':
      return !!(data.id && data.title);
    case 'tv':
      return !!(data.id && data.name);
    case 'list':
      return Array.isArray(data.results || data.items);
    default:
      return true;
  }
};

// ========== FUNGSI DETAIL (Long Cache) ==========
export async function getMovieById(movieId) {
  try {
    console.log(`Fetching movie details for ID: ${movieId}`);
    const data = await fetchWithLongCache(`/movie/${movieId}`);
    
    if (!validateResponse(data, 'movie')) {
      console.warn(`Movie with ID ${movieId} not found or invalid data`);
      return null;
    }
    
    console.log(`Successfully fetched movie: ${data.title} (ID: ${movieId})`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
}

export async function getTvSeriesById(tvId) {
  try {
    console.log(`Fetching TV series details for ID: ${tvId}`);
    const data = await fetchWithLongCache(`/tv/${tvId}`);
    
    if (!validateResponse(data, 'tv')) {
      console.warn(`TV series with ID ${tvId} not found or invalid data`);
      return null;
    }
    
    console.log(`Successfully fetched TV series: ${data.name} (ID: ${tvId})`);
    return data;
  } catch (error) {
    console.error(`Error fetching TV series details for ID ${tvId}:`, error);
    return null;
  }
}

export async function getMovieCredits(movieId) {
  try {
    const data = await fetchWithLongCache(`/movie/${movieId}/credits`);
    return validateResponse(data) ? data : { cast: [], crew: [] };
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${movieId}:`, error);
    return { cast: [], crew: [] };
  }
}

export async function getTvSeriesCredits(tvId) {
  try {
    const data = await fetchWithLongCache(`/tv/${tvId}/credits`);
    return validateResponse(data) ? data : { cast: [], crew: [] };
  } catch (error) {
    console.error(`Error fetching TV series credits for ID ${tvId}:`, error);
    return { cast: [], crew: [] };
  }
}

// ========== FUNGSI DYNAMIC (Short Cache) ==========
export async function getMovieVideos(movieId) {
  try {
    const data = await fetchWithShortCache(`/movie/${movieId}/videos`);
    return validateResponse(data) ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${movieId}:`, error);
    return [];
  }
}

export async function getTvSeriesVideos(tvId) {
  try {
    const data = await fetchWithShortCache(`/tv/${tvId}/videos`);
    return validateResponse(data) ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching TV series videos for ID ${tvId}:`, error);
    return [];
  }
}

export async function getMovieReviews(movieId) {
  try {
    const data = await fetchWithShortCache(`/movie/${movieId}/reviews`);
    return validateResponse(data) ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching movie reviews for ID ${movieId}:`, error);
    return [];
  }
}

export async function getTvSeriesReviews(tvId) {
  try {
    const data = await fetchWithShortCache(`/tv/${tvId}/reviews`);
    return validateResponse(data) ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching TV series reviews for ID ${tvId}:`, error);
    return [];
  }
}

// ========== FUNGSI LIST/CATEGORY (Medium Cache) ==========
export async function getMoviesByCategory(category, page = 1) {
  try {
    const data = await fetchApi(`/movie/${category}`, {}, { page });
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
}

export async function getTvSeriesByCategory(category, page = 1) {
  try {
    const data = await fetchApi(`/tv/${category}`, {}, { page });
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching ${category} TV series:`, error);
    return [];
  }
}

export async function getSimilarMovies(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/similar`);
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    return [];
  }
}

export async function getSimilarTvSeries(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/similar`);
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching similar TV series for ID ${tvId}:`, error);
    return [];
  }
}

export async function getMoviesByGenre(genreId, page = 1) {
  try {
    console.log(`Fetching movies by genre ID: ${genreId}, page: ${page}`);
    const data = await fetchApi(`/discover/movie`, {}, { with_genres: genreId, page });
    console.log(`Movies by genre result:`, data.results?.length || 0);
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching movies by genre ID ${genreId}:`, error);
    return [];
  }
}

export async function getTvSeriesByGenre(genreId, page = 1) {
  try {
    console.log(`Fetching TV series by genre ID: ${genreId}, page: ${page}`);
    const data = await fetchApi(`/discover/tv`, {}, { with_genres: genreId, page });
    console.log(`TV series by genre result:`, data.results?.length || 0);
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching TV series by genre ID ${genreId}:`, error);
    return [];
  }
}

// ========== FUNGSI TRENDING/SEARCH (Short Cache) ==========
export async function getTrendingMoviesDaily(page = 1) {
  try {
    const data = await fetchWithShortCache(`/trending/movie/day`, {}, { page });
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error('Error fetching daily trending movies:', error);
    return [];
  }
}

export async function getTrendingTvSeriesDaily(page = 1) {
  try {
    const data = await fetchWithShortCache(`/trending/tv/day`, {}, { page });
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error('Error fetching daily trending TV series:', error);
    return [];
  }
}

export async function searchMoviesAndTv(query, page = 1) {
  try {
    console.log(`Searching for: "${query}", page: ${page}`);
    const data = await fetchWithShortCache(`/search/multi`, {}, { 
      query, 
      page, 
      include_adult: false 
    });
    
    if (!validateResponse(data, 'list')) return [];
    
    // Filter out adult content dan items tanpa poster
    const filteredResults = data.results.filter(item => 
      item && 
      !item.adult &&
      (item.media_type === 'movie' || item.media_type === 'tv') &&
      (item.poster_path || item.backdrop_path)
    );
    
    console.log(`Search results for "${query}":`, filteredResults.length);
    return filteredResults;
  } catch (error) {
    console.error(`Error fetching search results for query '${query}':`, error);
    return [];
  }
}

export async function searchMovieById(movieId) {
  try {
    console.log(`Searching movie by ID: ${movieId}`);
    // Coba ambil detail langsung
    const movie = await getMovieById(movieId);
    if (movie) return [movie];
    
    // Fallback: search by ID pattern (jarang diperlukan)
    const data = await fetchWithShortCache(`/search/movie`, {}, { query: movieId });
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error searching movie by ID ${movieId}:`, error);
    return [];
  }
}

export const getMovieByTitle = async (title) => {
  try {
    console.log(`Searching movie by title: "${title}"`);
    const data = await fetchWithShortCache(`/search/movie`, {}, { 
      query: title, 
      include_adult: false 
    });
    
    if (!validateResponse(data, 'list') || data.results.length === 0) {
      console.log(`No movies found for title: "${title}"`);
      return null;
    }
    
    // Filter out adult content
    const filteredResults = data.results.filter(movie => !movie.adult);
    console.log(`Movies found for "${title}":`, filteredResults.length);
    return filteredResults.length > 0 ? filteredResults : null;
  } catch (error) {
    console.error(`Error fetching movie by title: "${title}"`, error);
    return null;
  }
};

export const getTvSeriesByTitle = async (title) => {
  try {
    console.log(`Searching TV series by title: "${title}"`);
    const data = await fetchWithShortCache(`/search/tv`, {}, { 
      query: title, 
      include_adult: false 
    });
    
    if (!validateResponse(data, 'list') || data.results.length === 0) {
      console.log(`No TV series found for title: "${title}"`);
      return null;
    }
    
    console.log(`TV series found for "${title}":`, data.results.length);
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series by title: "${title}"`, error);
    return null;
  }
};

// ========== FUNGSI STATIC (Very Long Cache) ==========
export async function getMovieGenres() {
  try {
    const data = await fetchWithLongCache('/genre/movie/list');
    return validateResponse(data) ? (data.genres || []) : [];
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return [];
  }
}

export async function getTvSeriesGenres() {
  try {
    const data = await fetchWithLongCache('/genre/tv/list');
    return validateResponse(data) ? (data.genres || []) : [];
  } catch (error) {
    console.error('Error fetching TV series genres:', error);
    return [];
  }
}

// ========== FUNGSI ADULT CONTENT (Medium Cache) ==========
export async function getMoviesByKeyword(keywordId = 256466, page = 1) {
  try {
    console.log(`Fetching movies by keyword: ${keywordId}, page: ${page}`);
    const data = await fetchApi(`/discover/movie`, {}, { 
      with_keywords: keywordId, 
      page 
    });
    console.log(`Movies by keyword result:`, data.results?.length || 0);
    return validateResponse(data, 'list') ? (data.results || []) : [];
  } catch (error) {
    console.error(`Error fetching movies by keyword ID ${keywordId}:`, error);
    return [];
  }
}

export async function getMoviesByList(listId = "143347", page = 1) {
  try {
    console.log(`Fetching movies from list: ${listId}, page: ${page}`);
    const data = await fetchApi(`/list/${listId}`, {}, { page });
    console.log(`Movies from list result:`, data.items?.length || 0);
    return validateResponse(data, 'list') ? (data.items || []) : [];
  } catch (error) {
    console.error(`Error fetching movies from list ID ${listId}:`, error);
    return [];
  }
}

// ========== UTILITY FUNCTIONS ==========
export const validateMovieData = (movieData) => {
  if (!movieData) return false;
  if (movieData.success === false) return false;
  if (!movieData.id) return false;
  if (!movieData.title && !movieData.name) return false;
  return true;
};

export const createSlug = (title, releaseDate = '') => {
  if (!title) return '';
  
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const year = releaseDate ? releaseDate.substring(0, 4) : '';
  return year ? `${baseSlug}-${year}` : baseSlug;
};

// Export khusus untuk sitemap dengan caching yang lebih agresif
export const sitemapFetchApi = async (path, params = {}) => {
  const url = createUrl(path, params);
  
  const res = await fetch(url, {
    next: { 
      revalidate: 86400, // 24 jam untuk sitemap
      tags: ['sitemap'] 
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return res.json();
};

// FUNGSI BARU: Health check API
export const checkApiHealth = async () => {
  try {
    const data = await fetchWithShortCache('/configuration');
    return { 
      healthy: true, 
      timestamp: new Date().toISOString(),
      data 
    };
  } catch (error) {
    console.error('API Health check failed:', error);
    return { 
      healthy: false, 
      timestamp: new Date().toISOString(),
      error: error.message 
    };
  }
};
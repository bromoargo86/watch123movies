"use client";

import React from 'react';
import Link from 'next/link';
import { FaHome, FaFilm, FaTv, FaSearch, FaStar, FaUsers, FaGlobe, FaUser, FaCalendar, FaTrophy } from 'react-icons/fa';

export default function About() {
  const genres = [
    { name: 'Action', link: '/movie/genre/action', color: 'text-orange-300' },
    { name: 'Adventure', link: '/movie/genre/adventure', color: 'text-blue-300' },
    { name: 'Sci-Fi', link: '/movie/genre/science-fiction', color: 'text-purple-300' },
    { name: 'Anime', link: '/movie/genre/animation', color: 'text-pink-300' },
    { name: 'Crime', link: '/movie/genre/crime', color: 'text-yellow-300' },
    { name: 'Horror', link: '/movie/genre/horror', color: 'text-red-300' },
    { name: 'Comedy', link: '/movie/genre/comedy', color: 'text-green-300' },
    { name: 'Romance', link: '/movie/genre/romance', color: 'text-pink-400' },
    { name: 'Thriller', link: '/movie/genre/thriller', color: 'text-indigo-300' },
    { name: 'Mystery', link: '/movie/genre/mystery', color: 'text-gray-300' },
    { name: 'War', link: '/movie/genre/war', color: 'text-amber-300' },
    { name: 'Fantasy', link: '/movie/genre/fantasy', color: 'text-teal-300' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-900/50 to-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-orange-400">
            Cinevisio Your Ultimate Movie & TV Database
            <span className="block text-xl md:text-4xl font-extrabold mt-2 text-orange-400">
              Watch Stream and Discover Cinema
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Your complete guide to thousands of movies, TV series, streaming info, and actor profiles. Find where to watch free and premium content in HD quality.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/movie/popular" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FaFilm /> Watch Movies
            </Link>
            <Link href="/tv-show/popular" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FaTv /> Stream Series
            </Link>
            <Link href="/people" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FaUser /> Explore Actors
            </Link>
            <Link href="/rankings" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FaTrophy /> Top Rankings
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm">
          {/* Introduction */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <img
                src="https://live.staticflickr.com/65535/54812286746_f853554453_b.jpg"
                alt="Movie streaming platform - Watch movies online in HD quality"
                width={1024}
                height={416}
                className="rounded-xl shadow-2xl mx-auto mb-8"
              />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-300">
                Watch Movies & Stream Series Anywhere
                <span className="block text-xl md:text-4xl font-bold mt-2 text-orange-300">
                  Your Complete Streaming Guide
                </span>
              </h2>
              <div className="text-lg text-gray-400 max-w-4xl mx-auto space-y-4 text-center">
                <p>
                  <strong>Cinevisio</strong> is America's premier movie database and streaming guide platform. Whether you want to <strong>watch movies online</strong>, <strong>stream TV series</strong>, or find <strong>free movie streaming</strong> options, we provide comprehensive information across all major platforms including <strong>Netflix</strong>, <strong>Disney+</strong>, <strong>Prime Video</strong>, HBO Max, Hulu, and more. Our database helps you discover where to watch content in <strong>HD quality</strong>, track <strong>box office</strong> performance, and explore detailed information about your favorite films and shows.
                </p>
                <p>
                  We specialize in helping users find exactly what to watch across all genres. Love <strong>action</strong> movies? We've got the latest blockbusters. Prefer <strong>adventure</strong> or <strong>sci-fi</strong>? Explore our curated collections. Looking for <strong>anime</strong> series, <strong>crime mystery</strong> thrillers, intense <strong>drama</strong>, chilling <strong>horror</strong>, heartwarming <strong>comedy</strong>, suspenseful <strong>thriller</strong>, intriguing <strong>mystery</strong>, historical <strong>war</strong> films, or magical <strong>fantasy</strong>? Cinevisio has you covered with detailed genre pages and personalized recommendations.
                </p>
              </div>
            </div>
          </section>

          {/* SEO-Optimized About Section */}
          <section className="mb-16 bg-gray-900/50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-orange-300">
              About Cinevisio: Your Ultimate Streaming Companion
              <span className="block text-xl md:text-3xl font-bold mt-2 text-orange-300">
                Watch • Stream • Discover • Enjoy
              </span>
            </h2>
            
            <div className="space-y-6 text-gray-400 text-justify">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">What is Cinevisio?</h3>
              
              <p>
                Cinevisio is a comprehensive movie and TV series database designed to help users <strong>watch movies online</strong>, <strong>stream TV shows</strong>, and discover new content across all streaming platforms. We answer the most common search queries like "where to watch [movie title]", "movies like [favorite film]", "best shows on Netflix", and "free movie streaming sites". Our platform covers everything from Hollywood blockbusters to international cinema, with a focus on delivering accurate streaming availability information in real-time.
              </p>

              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Streaming Guide & Platform Coverage</h3>
              
              <p>
                We provide detailed information about where to watch content across all major streaming services. Whether you're looking for <strong>Netflix</strong> originals, <strong>Disney+</strong> exclusives, <strong>Prime Video</strong> movies, or free streaming options, our database shows availability, pricing, and quality options (including <strong>HD quality</strong> and 4K). We track regional availability and help users find content that's accessible in their location. Our platform also compares subscription costs, identifies free trials, and highlights platform-exclusive content.
              </p>

              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Genre-Specific Content Discovery</h3>
              
              <p>
                Cinevisio excels at helping users explore content by genre. Our specialized sections include:
              </p>
              <ul className="ml-6 space-y-2">
                <li>• <strong>Action & Adventure</strong>: Latest blockbusters, stunt-filled sequences, and epic journeys</li>
                <li>• <strong>Sci-Fi & Fantasy</strong>: Space operas, futuristic worlds, and magical realms</li>
                <li>• <strong>Anime & Animation</strong>: Japanese anime, animated features, and family-friendly content</li>
                <li>• <strong>Crime Mystery & Thriller</strong>: Whodunits, police procedurals, and suspenseful stories</li>
                <li>• <strong>Comedy & Drama</strong>: Hilarious comedies, emotional storytelling, and character-driven narratives</li>
                <li>• <strong>Horror & Mystery</strong>: Scary movies, psychological thrillers, and paranormal content</li>
                <li>• <strong>War & Historical</strong>: Historical battles, military dramas, and epic war stories</li>
              </ul>

              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Box Office & Popularity Tracking</h3>
              
              <p>
                Stay updated with the latest <strong>box office</strong> results, trending movies, and most-watched TV series. We track financial performance, opening weekend numbers, and streaming popularity metrics to help you discover what's hot right now. Our charts show top-performing content across platforms, so you can join the conversation about trending shows and films.
              </p>

              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Free & Premium Streaming Options</h3>
              
              <p>
                We help users find both <strong>free movie streaming</strong> options (ad-supported platforms) and premium subscription content. Our database includes information about free trials, bundle deals, and cost-effective ways to access multiple streaming services. Whether you want to watch free content or maximize your premium subscriptions, Cinevisio provides the information you need to make smart viewing choices.
              </p>

              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Quality & Experience Features</h3>
              
              <p>
                We prioritize content quality information, highlighting availability in <strong>HD quality</strong>, 4K, HDR, and Dolby Atmos. Our platform also includes parental guides, content ratings, and detailed episode information for TV series. We help users create watchlists, receive notifications when content becomes available on their preferred platforms, and share recommendations with friends.
              </p>

              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Why Choose Cinevisio?</h3>
              
              <p>
                Cinevisio stands out as the most user-friendly and comprehensive movie database because:
              </p>
              <ul className="ml-6 space-y-2">
                <li>• <strong>Real-time streaming availability</strong> across all major platforms</li>
                <li>• <strong>Personalized recommendations</strong> based on your viewing preferences</li>
                <li>• <strong>Comprehensive genre coverage</strong> from action to fantasy</li>
                <li>• <strong>Box office and trending data</strong> to stay current</li>
                <li>• <strong>Free and premium streaming guides</strong> for budget-conscious viewers</li>
                <li>• <strong>Quality information</strong> including HD, 4K, and audio formats</li>
                <li>• <strong>Mobile-friendly design</strong> for on-the-go browsing</li>
              </ul>

              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Start Your Streaming Journey Today</h3>
              
              <p>
                Join millions of users who trust Cinevisio to help them decide what to watch next. Whether you're searching for "watch movie online free", "stream movies HD", "best Netflix series", "Disney+ new releases", "Prime Video movies", or specific genre content like "action movies 2024" or "horror series to watch", Cinevisio delivers accurate, up-to-date information to enhance your viewing experience. Our platform continuously updates with new releases, streaming changes, and trending content to ensure you never miss out on great entertainment.
              </p>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center text-orange-300">
              Key Features for Movie Lovers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaFilm className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Watch Movies Online</h3>
                <p className="text-gray-400">Find where to stream thousands of movies across Netflix, Disney+, Prime Video, and more in HD quality.</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaTv className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Stream TV Series</h3>
                <p className="text-gray-400">Complete episode guides and streaming info for drama, anime, comedy, crime, and all popular genres.</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaUser className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Actor & Director Info</h3>
                <p className="text-gray-400">Detailed profiles, filmographies, and streaming content featuring your favorite stars.</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaCalendar className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">New Releases & Box Office</h3>
                <p className="text-gray-400">Track latest movie releases, box office results, and upcoming premieres across all platforms.</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaTrophy className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Top Rankings</h3>
                <p className="text-gray-400">Discover highest-rated movies and series by genre: action, horror, comedy, thriller, and more.</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaSearch className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Advanced Search</h3>
                <p className="text-gray-400">Find content by platform, genre, year, rating, and quality (HD, 4K) with precise filters.</p>
              </div>
            </div>
          </section>

          {/* Streaming Platforms Highlight */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-center text-orange-300">
                Streaming Platforms We Cover
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-red-500 font-bold text-lg mb-2">Netflix</div>
                  <p className="text-gray-400 text-sm">Originals, movies, series in HD</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-blue-400 font-bold text-lg mb-2">Disney+</div>
                  <p className="text-gray-400 text-sm">Marvel, Star Wars, Pixar, classics</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-blue-300 font-bold text-lg mb-2">Prime Video</div>
                  <p className="text-gray-400 text-sm">Included with Prime, 4K content</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-green-400 font-bold text-lg mb-2">Free Streaming</div>
                  <p className="text-gray-400 text-sm">Ad-supported platforms & trials</p>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Genres */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center text-orange-300">
              Explore Popular Genres
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
              {genres.map((genre, index) => (
                <Link 
                  key={index} 
                  href={genre.link}
                  className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-600/50 transition flex flex-col items-center justify-center group"
                >
                  <div className={`font-semibold ${genre.color} group-hover:scale-105 transition-transform`}>
                    {genre.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse {genre.name} →
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 bg-gradient-to-r from-orange-900/30 to-purple-900/30 rounded-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-orange-300">
              Start Streaming Today
              <span className="block text-xl md:text-4xl font-bold mt-2 text-orange-300">
                Find What to Watch Right Now
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join millions who use Cinevisio to watch movies, stream series, and discover new favorites across Netflix, Disney+, Prime Video, and more. Get HD quality recommendations, box office updates, and personalized suggestions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/movie/popular" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2">
                <FaFilm /> Watch Movies Now
              </Link>
              <Link href="/tv-show/popular" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2">
                <FaTv /> Stream TV Series
              </Link>
            </div>
            <p className="mt-8 text-gray-400 max-w-3xl mx-auto">
              <strong>Cinevisio</strong> - Your ultimate guide to watch movies online, stream TV shows, find free streaming options, track box office results, and explore content across Netflix, Disney+, Prime Video and more in HD quality. Discover action, adventure, sci-fi, anime, crime, drama, horror, comedy, thriller, mystery, war, fantasy, and all your favorite genres.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
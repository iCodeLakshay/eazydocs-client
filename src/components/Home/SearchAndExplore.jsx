import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SearchAndExplore = () => {
  return (
    <div className="bricolage-grotesque py-16 md:py-16 px-4">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <div className="relative bg-gradient-to-r from-[#a7c298] to-[#8ba47f] rounded-2xl shadow-xl overflow-hidden">
          {/* Decorative dots */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white">
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="3" fill="currentColor" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icon with pulse animation */}
              <div className="md:static md:-top-0 md:-left-0 flex-shrink-0 relative">
                <div className="bg-white/20 rounded-full p-5 shadow-lg border-4 border-[#FAF9EE] relative z-10">
                  <Search className="text-[#334727] h-10 w-10" />
                </div>
              </div>

              {/* Text Content with subtle animation */}
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2" data-aos="fade-up" data-aos-delay="100">
                  Explore a World of Knowledge
                </h2>
                <p className="text-black/90 max-w-2xl" data-aos="fade-up" data-aos-delay="200">
                  Dive into our extensive library of articles and find the insights you need. Your next discovery is just a click away.
                </p>
                
                {/* Quick tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {['React', 'Node.js', 'Python'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm text-black/80">
                      {tag}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-black/80">+more</span>
                </div>
              </div>

              {/* Button with hover effect */}
              <div className="flex-shrink-0 mt-6 md:mt-0" data-aos="fade-up" data-aos-delay="300">
                <Link href="/blogs">
                  <div className="group px-6 py-3 bg-white text-[#334727] font-bold rounded-lg shadow-md hover:bg-[#334727] hover:text-white hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2">
                    Explore
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndExplore;
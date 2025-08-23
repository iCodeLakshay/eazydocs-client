'use client';
import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/Data/Testimonials.data';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-[#FAF9EE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="bricolage-grotesque  text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Developers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how Eazydocs is helping developers worldwide simplify their learning journey
          </p>
        </div>

        {/* Testimonials Swiper */}
        <div className="testimonials-swiper" data-aos="fade-up" data-aos-delay="200">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={10}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            // pagination={{
            //   clickable: true,
            // }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectCoverflow]}
            className="mySwiper"
            style={{ paddingTop: '50px', paddingBottom: '50px' }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom CTA */}
        <div className="bricolage-grotesque text-center mt-8" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a7c298] to-[#8ba47f] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <Star className="w-5 h-5 fill-yellow-400" />
            <span className="font-medium">Join 100+ Happy Developers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div 
      className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full"
    >
      {/* Quote Icon */}
      <div className="absolute -top-3 -left-3 bg-gradient-to-r from-[#a7c298] to-[#8ba47f] rounded-full p-3 shadow-lg">
        <Quote className="w-5 h-5 text-white" />
      </div>

      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 overflow-hidden rounded-br-2xl">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#a7c298]">
          <pattern id={`dots-${testimonial.id}`} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="currentColor" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#dots-${testimonial.id})`} />
        </svg>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 mb-6 leading-relaxed text-sm">
        "{testimonial.testimonial}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={48}
            height={48}
            className="rounded-full object-cover ring-2 ring-[#a7c298]/20"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
          <p className="text-xs text-gray-500">{testimonial.role}</p>
          <p className="text-xs text-[#a7c298] font-medium">{testimonial.company}</p>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#a7c298]/20 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

export default Testimonials;

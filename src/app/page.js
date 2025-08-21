import AOSInit from '@/components/AOSInit';
import HeroSection from '@/components/Home/HeroSection';
import PopularTopics from '@/components/Home/PopularTopics';
import SearchAndExplore from '@/components/Home/SearchAndExplore';
import WhatWeProvide from "@/components/Home/WhatWeProvide";

export default function Home() {
  return (
    <div>
      <AOSInit />
      <HeroSection />
      <WhatWeProvide />
      <PopularTopics />
      <SearchAndExplore />
    </div>
  );
}

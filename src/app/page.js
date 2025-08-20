import AOSInit from '@/components/AOSInit';
import HeroSection from '@/components/Home/HeroSection';
import WhatWeProvide from "@/components/Home/WhatWeProvide";

export default function Home() {
  return (
    <div>
      <AOSInit />
      <HeroSection />
      <WhatWeProvide />
    </div>
  );
}

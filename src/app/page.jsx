import HeroSection from "@/components/layout/HeroSection";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <HeroSection></HeroSection>
    </div>
  );
}

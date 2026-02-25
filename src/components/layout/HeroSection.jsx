"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import banner1 from "@/../public/banner1.png";
import banner2 from "@/../public/banner2.png";
import banner3 from "@/../public/banner3.png";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import Link from "next/link";

const slides = [
  {
    badge: "Buy Safely",
    subtitle:
      "Discover amazing deals on second-hand electronics, furniture, clothing, and more. Shop smarter by buying used products at a fraction of the original price, all from trusted sellers in your local area.",
    buttonText: "Browse Products",
    buttonLink: "/products",
  },
  {
    badge: "Start Selling",
    subtitle:
      "Turn your unused items into cash within minutes. List your product, set your price, and connect with thousands of nearby buyers who are actively looking for what you have.",
    buttonText: "Sell Now",
    buttonLink: "/sell",
  },
  {
    badge: "Escrow Protection",
    subtitle:
      "Never worry about getting scammed again. Our built-in escrow system holds the payment safely until you confirm the product is received and exactly as described — guaranteed peace of mind for every deal.",
    buttonText: "Learn How It Works",
    buttonLink: "/how-it-works",
  },
];

export default function HeroSection() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const slide = slides[current - 1] || {};

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-10 gap-10">
      {/* Left Text Area with buttons */}
      <div className="md:w-1/2 px-4 flex flex-col items-center md:items-start gap-5">
        <span className="bg-green-100 text-black font-bold text-sm old px-4 py-1 rounded-full tracking-wide">
          {slide.badge}
        </span>
        <p className="text-gray-600 text-lg leading-relaxed text-center md:text-left">
          {slide.subtitle}
        </p>

        <div className="w-16 h-1 bg-green-500 rounded"></div>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === i + 1 ? "w-6 bg-green-500" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <Link href={slide.buttonLink}>
          <Button className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-full shadow-md transition">
            {slide.buttonText} →
          </Button>
        </Link>
      </div>

      {/* Right section carousal  */}
      <div className="flex justify-center md:justify-end">
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ loop: true }}
          className="w-[300px]"
          setApi={setApi}
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative w-[300px] h-[300px]">
                <Image
                  src={banner1}
                  alt="banner1"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-[300px] h-[300px]">
                <Image
                  src={banner2}
                  alt="banner2"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-[300px] h-[300px]">
                <Image
                  src={banner3}
                  alt="banner3"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

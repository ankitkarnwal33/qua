// components/TestimonialCarousel.tsx

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    text: `"I earned ₹10,000 in my first month!"`,
    name: "Priya S.",
  },
  {
    text: `"Our gym doubled membership with Quanutrition leads."`,
    name: "FitnessFirst",
  },
  {
    text: `"The dashboard makes tracking so easy."`,
    name: "Dr. Mehta",
  },
  {
    text: `"The dashboard makes tracking so easy."`,
    name: "Dr. Mehta",
  },
];

export function TestimonialCarousel() {
  return (
    <div className="w-full py-10">
      <h2 className="text-2xl font-bold text-center mb-10  text-[#2F2F2F]">
        What Our Users Say
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto px-5 sm:px-10 md:px-10"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-1/3 "
            >
              <Card className="h-full border border-[#E2E8F0]">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <p className="text-sm text-[#4B5563] italic mb-2">
                    {item.text}
                  </p>
                  <p className="font-semibold text-[#2F2F2F]">— {item.name}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

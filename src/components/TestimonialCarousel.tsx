/* eslint-disable @typescript-eslint/no-explicit-any */
// components/TestimonialCarousel.tsx

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { query } from "@/lib/db";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

export async function TestimonialCarousel() {
  let res: any = [];
  try {
    res = await query("SELECT * FROM testimonials", []);
    if (!res) {
      // Handle errors (e.g. throw to show Next.js error page)
      throw new Error("Failed to fetch posts");
    }
  } catch (error) {
    if (error instanceof Error) {
    }
  }

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
          {res?.map(
            (
              item: {
                author: ReactNode;
                review: ReactNode;
                text:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              },
              index: Key | null | undefined
            ) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3 "
              >
                <Card className="h-full border border-[#E2E8F0]">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <p className="text-sm text-[#4B5563] italic mb-2">
                      {item?.review}
                    </p>
                    <p className="font-semibold text-[#2F2F2F]">
                      — {item?.author}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          {res?.map((_: any, i: Key | null | undefined) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

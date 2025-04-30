'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Typography from '@/components/custom/typography';
import { CAROUSEL } from '@/utils';

const Carousel = ({ items }: { items: CAROUSEL[] }) => {
  const [activeItem, setActiveItem] = useState(items?.[0]);
  const [playIndex, setPlayIndex] = useState(0);

  const playCarousel = (change: number) => {
    setPlayIndex((prev) => {
      const newIndex = (prev + change + items?.length) % items?.length;
      return newIndex;
    });
  };

  useEffect(() => {
    setActiveItem(items?.[playIndex]);
  }, [playIndex]);

  // Automatically move to the next image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      playCarousel(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [playIndex, items]);

  return (
    <div className="flex-[2] bg-neutral-900 space-y-10 bg-carousel-background pt-16 h-full max-h-[95vh] overflow-hidden sticky top-0 bottom-0 right-0 hidden md:block rounded-xl">
      {/* heading text */}
      <div className="w-full text-center">
        <Typography
          variant="h1"
          weight="bold"
          color="text-neutral-0"
          className=""
        >
          {activeItem?.heading}
        </Typography>
        <Typography variant="base" color="text-neutral-100">
          {activeItem?.subText}
        </Typography>
      </div>

      {/* carousel */}
      <div className="ml-8 lg:ml-24 w-full h-full rounded-xl overflow-hidden ">
        <div className="w-full h-full">
          <Image
            src={activeItem?.image}
            className="w-full h-full object-cover object-left-top image-antialiased"
            alt="carousel-image"
            placeholder="blur"
            blurDataURL={activeItem?.image.src}
          />
        </div>
        {/* carousel button */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black/25 h-60 flex items-end justify-center">
          <div className="flex justify-center items-center gap-x-4 mb-8">
            <Button
              className="rounded-full w-[1.9rem] h-[1.9rem] flex justify-center items-center overflow-hidden bg-neutral-700 hover:bg-neutral-800"
              onClick={() => playCarousel(-1)}
            >
              <ArrowLeftIcon className="w-4 h-4 text-primary-300" />
            </Button>
            <div className="flex justify-center items-center  opacity-95 gap-x-3 h-[1.9rem] rounded-3xl p-3 bg-neutral-700 ">
              {items?.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === playIndex ? 'bg-primary-300' : 'bg-neutral-100'}`}
                />
              ))}
            </div>
            <Button
              className="rounded-full w-[1.9rem] h-[1.9rem] flex justify-center items-center overflow-hidden bg-neutral-700 hover:bg-neutral-800"
              onClick={() => playCarousel(1)}
            >
              <ArrowRightIcon className="w-4 h-4 text-primary-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Suspense } from "react";
import LoadThread from "../shared/LoadThread";

const CarouselCard = ({ attachments }: { attachments: string[] }) => {
  return (
    <div className="h-full w-full flex items-start">
      {attachments.length > 1 ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-fit h-full cursor-grab group"
        >
          <CarouselContent className="w-full h-full">
            {attachments.map((imageUrl) => (
              <CarouselItem key={imageUrl} className="carousel-item">
                <Card className="carousel-card ">
                  <CardContent className="carousel-card_content">
                    <Suspense fallback={<LoadThread />}>
                      <Image
                        src={imageUrl}
                        alt="userImage"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-full rounded-xl object-contain shadow-lg"
                      />
                    </Suspense>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="carousel-btn" />
          <CarouselNext className="carousel-btn" />
        </Carousel>
      ) : (
        <div className="h-full w-full">
          <div className="max-w-max">
            <Suspense fallback={<LoadThread />}>
              {attachments.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt={`userImage-${index}`}
                  width={0}
                  height={0}
                  sizes="100dvh"
                  className="w-full max-h-[500px] object-contain rounded-xl"
                />
              ))}
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselCard;

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";

interface Props {
  attachments: string[];
}

const CarouselCard = async ({ attachments }: Props) => {
  return (
    <div className="h-full w-full flex items-start ">
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
                <Card className="carousel-card">
                  <CardContent className="carousel-card_content">
                    <Image
                      src={imageUrl}
                      alt="userImage"
                      width={0}
                      height={0}
                      sizes="100dvw"
                      className="w-full max-h-[440px] rounded-xl object-contain shadow-lg"
                    />
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
          <div className="relative max-w-max">
            {attachments.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt={`userImage-${index}`}
                width={0}
                height={0}
                sizes="100dvh"
                className="w-full max-h-[440px] object-contain rounded-xl"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselCard;

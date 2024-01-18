import React, { Suspense } from "react";
import CarouselCard from "../cards/CarouselCard";
import Link from "next/link";
import Image from "next/image";
import { IUser } from "@/lib/database/models/user.model";
import LazyLoading from "./LazyLoading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

interface Props {
  postData: {
    postId: string;
    content: string;
    attachments?: string[];
    author: IUser;
    createdAt: Date;
  };
}

const CommentPostData = ({ postData }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4">
        {/* Thread Author Pic */}
        <div className="relative p-1 h-full flex flex-col">
          <div className="relative flex flex-col items-start justify-start text-light-1 h-9 w-9 ">
            <Link href={`/profile/${postData.author._id}`}>
              <Image
                src={postData.author?.photoUrl ?? ""}
                alt="profilePic"
                fill
                className="object-contain rounded-full"
              />
            </Link>
          </div>
          <div className="thread-card_bar" />
        </div>

        <div className="flex flex-col flex-1">
          <p className=" text-base-bold text-light-1 mb-1">
            <Link
              href={`/profile/${postData.author._id}`}
              className="hover:underline"
            >
              {postData.author.username}
            </Link>
          </p>

          {/* Show Thread Content */}
          <div className="w-full">
            <p className="text-light-1">{postData.content}</p>
          </div>

          {/* Show Attachments if Any */}
          {postData.attachments && (
            <div className="mt-2">
              <div className="h-full w-full flex items-start ">
                {postData.attachments.length > 1 ? (
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-fit h-full cursor-grab group"
                  >
                    <CarouselContent className="w-full h-full">
                      {postData.attachments.map((imageUrl) => (
                        <CarouselItem key={imageUrl} className="carousel-item">
                          <Card className="carousel-card">
                            <CardContent className="carousel-card_content">
                              <Image
                                src={imageUrl}
                                alt="userImage"
                                width={0}
                                height={0}
                                sizes="100dvw"
                                className="w-full max-h-[270px] rounded-xl object-contain shadow-lg"
                              />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="carousel-btn_comment" />
                    <CarouselNext className="carousel-btn_comment" />
                  </Carousel>
                ) : (
                  <div className="h-full w-full">
                    <div className="relative max-w-max">
                      {postData.attachments.map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`userImage-${index}`}
                          width={0}
                          height={0}
                          sizes="100dvh"
                          className="w-full max-h-[270px] object-contain rounded-xl"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentPostData;

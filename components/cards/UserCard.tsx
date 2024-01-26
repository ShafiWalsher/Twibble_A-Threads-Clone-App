"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  userId: string;
  name: string;
  username: string;
  imgUrl: string;
  from: "SearchPage" | "SearchBox";
}

function UserCard({ userId, name, username, imgUrl, from }: Props) {
  let followers = "582K";

  return (
    <div className="w-full border-b border-b-gray-1/50 py-2">
      <Link href={`/profile/${userId}`} className="flex items-start gap-4 p-1">
        {/* Profile Image */}
        <div className="relative h-9 w-9">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* Username and follow Button */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="user-card_username">
            <div className="flex-1 text-ellipsis">
              <h4 className="text-base-bold text-light-1 hover:underline">
                {username}
              </h4>
              <p className="mt-1 text-base-medium text-gray-1">{name}</p>
            </div>
            <Link className="user-card_btn" href="">
              Follow
            </Link>
          </div>
          {from === "SearchPage" && (
            <div>
              <p className="text-light-1 text-base-semibold">
                {followers} Followers
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default UserCard;

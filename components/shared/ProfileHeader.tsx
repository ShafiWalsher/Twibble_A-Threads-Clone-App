import Link from "next/link";
import Image from "next/image";
import { profilePictures } from "@/constants";

interface Props {
  currUserClerkId: string;
  userInfo: {
    clerkId: string;
    _id: string;
    firstName: string;
    username: string;
    photoUrl: string;
    bio: string;
    threads: string[];
  };
}

function ProfileHeader({ currUserClerkId, userInfo }: Props) {
  const totalfollowers: string = "1.2k";

  return (
    <div className="mt-4 p-4">
      <div className="flex w-full gap-5 flex-col">
        {/* Username And Pfp */}
        <div className="flex items-center justify-between">
          {/* Username */}
          <div className="flex flex-col">
            <h2 className="text-left text-heading2-extrabold text-light-1">
              {userInfo.firstName}
            </h2>
            <p className="text-body-semibold text-light-2">
              {userInfo.username}
            </p>
          </div>
          {/* Profile Icon */}
          <div className="relative h-20 w-20">
            <Image
              src={userInfo.photoUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Followers and Insta and More Icons */}
        <div className="flex justify-between items-center">
          <Link href="">
            <p className=" text-base-regular text-gray-1 hover:underline">
              {totalfollowers} followers
            </p>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="" className="hover:bg-dark-4 p-2 rounded-full">
              <Image
                src="/assets/icons/instagram.svg"
                alt="instagram"
                width={22}
                height={22}
                className="object-contain"
              />
            </Link>
            <Link href="" className="hover:bg-dark-4 p-2 rounded-full">
              <Image
                src="/assets/icons/menu-dots.svg"
                alt="menu"
                width={22}
                height={22}
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Bio */}
        {!userInfo.bio && (
          <p className=" text-base-medium text-light-2">
            {userInfo?.bio} Something of bio
          </p>
        )}

        {/* Follow - Mention or Edit Profile */}
        {currUserClerkId === userInfo.clerkId ? (
          <Link
            href="/profile/edit"
            className="w-full rounded-lg border border-gray-1 p-1 flex items-center justify-center"
          >
            <p className="text-light-1 text-body-semibold">Edit Profile</p>
          </Link>
        ) : (
          <div className="mt-2 flex gap-2">
            <Link
              href=""
              className="w-full bg-light-1 rounded-lg p-1 flex items-center justify-center"
            >
              <p className="text-dark-1 text-body-semibold">Follow</p>
            </Link>
            <Link
              href=""
              className="w-full rounded-lg border border-gray-1 p-1 flex items-center justify-center"
            >
              <p className="text-light-1 text-body-semibold">Mention</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;

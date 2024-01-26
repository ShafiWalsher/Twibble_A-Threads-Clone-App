import Image from "next/image";
import UserCard from "./UserCard";
import { IUser } from "@/lib/database/models/user.model";

interface Props {
  value: string;
  searchedResult: IUser[] | null | undefined;
}

const SearchModalCard = ({ value, searchedResult }: Props) => {
  return (
    <div className="searchbar_input-modal">
      <div className="flex p-3 gap-3 justify-between">
        <Image
          src="/assets/icons/search-gray.svg"
          alt="search"
          width={18}
          height={18}
          className="object-contain"
        />
        <div className="flex-1">
          <p className="text-light-1">
            Search for <span className=" text-base-bold">"{value}"</span>
          </p>
        </div>
        <Image
          src="/assets/icons/arrow-right.svg"
          alt="search"
          width={14}
          height={14}
          className="object-contain opacity-50"
        />
      </div>
      <div className="h-[2px] w-5/6 ml-auto mr-8 bg-gray-1/30 rounded-full" />

      <div className="py-5 px-5 flex flex-col gap-5">
        {searchedResult?.length === 0 || !searchedResult ? (
          <div className="w-full flex justify-center py-2">
            <span className="ring-loader" />
          </div>
        ) : (
          <>
            {searchedResult?.map((user) => (
              <UserCard
                key={user._id}
                userId={user._id}
                name={user.firstName}
                username={user.username}
                imgUrl={user.photoUrl || ""}
                from="SearchBox"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchModalCard;

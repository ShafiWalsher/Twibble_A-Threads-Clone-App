import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import { UserInfoParams } from "@/types";
import {
  fetchAllUsers,
  fetchUsers,
  getUserByClerkId,
} from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const clerkId = user?.id;

  // fetch current User
  const userInfo: UserInfoParams = await getUserByClerkId(clerkId);

  const result = await fetchAllUsers({
    currentUserId: userInfo._id,
  });

  let searchedResult;
  if (searchParams.q) {
    searchedResult = await fetchUsers({
      userId: userInfo._id,
      searchString: searchParams.q,
      pageNumber: searchParams?.page ? +searchParams.page : 1,
      pageSize: 25,
    });
  }

  return (
    <section className="w-full mt-5 flex flex-col">
      <Searchbar routeType="search" searchedResult={searchedResult?.users} />
      <div className="flex flex-col gap-9 mt-5">
        {result?.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result?.users.map((user: IUser) => (
              <UserCard
                key={user._id}
                userId={user._id}
                name={user.firstName}
                username={user.username}
                imgUrl={user.photoUrl || ""}
                from="SearchPage"
              />
            ))}
          </>
        )}
      </div>

      {/* Loader */}
      {/* Enable if any search results */}
      {/* <div className="w-full flex justify-center py-2">
        <span className="ring-loader" />
      </div> */}
    </section>
  );
}

export default Page;

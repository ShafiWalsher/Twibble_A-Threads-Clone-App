import AccountProfile from "@/components/forms/AccountProfile";
import Loading from "@/components/shared/Load";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

const Page = async () => {
  const user = await currentUser();
  const clerkId = user?.id;
  const userInfo = await getUserByClerkId(clerkId);

  const userData = {
    userId: userInfo?._id,
    username: userInfo?.username || "",
    firstName: userInfo?.firstName || "",
    bio: userInfo?.bio || "",
    photoUrl: userInfo?.photoUrl,
  };

  return (
    <div className="bg-dark-1 w-full min-h-screen text-light-1">
      <div className="flex flex-col p-8 mt-40 bg-dark-4 rounded-lg max-w-4xl mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading1-bold">OnBoading</h1>
          <p className=" text-body-medium">
            Welcome to Threads – Your personalized space for shared moments and
            vibrant conversations!.
          </p>
          <p className="text-base-medium italic mt-5">
            Complete your profile now to use Threads!.
          </p>
          <div className="my-6 h-0.5 w-full bg-light-4/40" />
        </div>
        <section className="bg-dark-2 p-6 rounded-xl">
          <Suspense fallback={<Loading />}>
            <AccountProfile
              user={userData}
              btnTitle="Continue"
              type="OnboardingUpdate"
            />
          </Suspense>
        </section>
      </div>
    </div>
  );
};

export default Page;

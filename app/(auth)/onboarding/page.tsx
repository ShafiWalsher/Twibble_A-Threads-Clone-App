import AccountProfileForm from "@/components/forms/AccountProfileForm";
import RippleLoading from "@/components/shared/Loading";
import { fetchUserInfoData } from "@/lib/actions/clerk.actions";
import { Suspense } from "react";

const Page = async () => {
  const path = "/onboarding";
  const { userData } = await fetchUserInfoData({ path: path });

  const type = "OnboardingUpdate";
  const btnTitle = "Continue";
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

        <div className="w-full h-full flex flex-1">
          <Suspense fallback={<RippleLoading />}>
            <AccountProfileForm
              user={userData}
              btnTitle={btnTitle}
              type={type}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;

import AccountProfile from "@/components/forms/AccountProfile";
import RippleLoading from "@/components/shared/Loading";
import { Suspense } from "react";

const Page = async () => {
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

        <Suspense fallback={<RippleLoading />}>
          <AccountProfile btnTitle="Continue" type="OnboardingUpdate" />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;

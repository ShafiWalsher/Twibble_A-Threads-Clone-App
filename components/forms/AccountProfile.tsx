import { fetchUserInfoData } from "@/lib/utils";
import AccountProfileForm from "./AccountProfileForm";

interface Props {
  btnTitle: "Continue" | "";
  type: "OnboardingUpdate" | "ProfileUpdate";
}

const AccountProfile = async ({ btnTitle, type }: Props) => {
  const { userData } = await fetchUserInfoData();

  return (
    <section className="bg-dark-2 p-6 rounded-xl h-full w-full flex items-center justify-center">
      <AccountProfileForm user={userData} btnTitle={btnTitle} type={type} />
    </section>
  );
};

export default AccountProfile;

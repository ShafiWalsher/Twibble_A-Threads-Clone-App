import NavMenu from "./NavMenu";
import { currentUser } from "@clerk/nextjs";
import { getUserByClerkId } from "@/lib/actions/user.actions";

async function Bottombar() {
  const user = await currentUser();
  const clerkId = user?.id;
  const userInfo = await getUserByClerkId(clerkId);

  const userData = {
    userId: userInfo?._id,
    username: userInfo?.username || "",
    photoUrl: userInfo?.photoUrl,
  };

  return (
    <section className="flex justify-center items-center">
      <div className="bottombar">
        <NavMenu userData={userData} from="Bottombar" />
      </div>
    </section>
  );
}

export default Bottombar;

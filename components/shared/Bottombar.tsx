import NavMenu from "./NavMenu";
import { currentUser } from "@clerk/nextjs";
import { getUserByClerkId } from "@/lib/actions/user.actions";

async function Bottombar() {
  try {
    const user = await currentUser();

    if (!user) {
      // Redirect or handle the case where the user is not authenticated
      return null;
    }

    const clerkId = user?.id;
    const userInfo = await getUserByClerkId(clerkId);

    if (!userInfo) {
      // Handle the case where user data is not available (deleted user, etc.)
      return null;
    }

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
  } catch (error) {
    console.error("Error fetching user data in Bottombar:", error);
    // Handle the error as needed
    return null;
  }
}

export default Bottombar;

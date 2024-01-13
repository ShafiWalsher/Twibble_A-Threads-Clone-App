import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { getUserByClerkId, getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const currUserClerkId = user?.id;

  if (!currUserClerkId) redirect("/");

  const userInfo = await getUserById(params.id);
  //   console.log({ currUser });
  // console.log({ userInfo });

  return (
    <section className="h-full w-full flex flex-1 flex-col">
      <ProfileHeader currUserClerkId={currUserClerkId} userInfo={userInfo} />
      <Tabs defaultValue="threads" className="w-full flex-1 flex flex-col">
        <TabsList className="tab bg-transparent">
          <div className="w-full">
            <div className="flex justify-around">
              {profileTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <p>{tab.label}</p>
                  {/* {tab.label === "Threads" &&
                      userInfo.threads.length === 0 && (
                        <p className="ml-1 rounded-sm bg-gray-1/70 px-2 py-1 !text-tiny-medium text-light-2">
                          {userInfo.threads.length}
                        </p>
                      )} */}
                </TabsTrigger>
              ))}
            </div>
            <div className="h-0.5 bg-gray-1/20 w-full" />
          </div>
        </TabsList>
        {profileTabs.map((tab) => (
          <TabsContent
            key={`content-${tab.label}`}
            value={tab.value}
            className="w-full mt-4 flex-1 flex items-center justify-center"
          >
            {userInfo.threads.length === 0 ? (
              <div className="h-full flex-1 flex items-center justify-center">
                <p className="text-light-1">{`No ${tab.label.toLocaleLowerCase()} yet.`}</p>
              </div>
            ) : (
              <p>ThreadCard</p>
              // @ts-ignore
              // <ThreadsTab
              //       userId={userInfo._id}
              //       clerkId={userInfo.clerkId}
              //       accountType="User"
              //     />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default Page;

import ThreadCard from "@/components/cards/ThreadCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUserPosts } from "@/lib/actions/thread.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IPost } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const currUserClerkId = user?.id;

  if (!currUserClerkId) redirect("/");

  const userInfo = await getUserById(params.id);
  const userData = {
    userId: userInfo?._id,
    username: userInfo?.username || "",
    firstName: userInfo?.firstName || "",
    bio: userInfo?.bio || "",
    photoUrl: userInfo?.photoUrl,
  };

  const result = await fetchUserPosts({ userId: params.id });

  return (
    <section className=" h-full w-full flex flex-1 flex-col">
      <ProfileHeader currUserClerkId={currUserClerkId} userInfo={userInfo} />
      <Tabs defaultValue="threads" className="w-full flex-1 flex flex-col">
        <TabsList className="tab bg-transparent">
          <div className="w-full">
            <div className="flex justify-around">
              {profileTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <p>{tab.label}</p>
                  {tab.label === "Threads" && userInfo.threads.length !== 0 && (
                    <p className="ml-1 text-small-medium text-gray-1">
                      {userInfo.threads.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </div>
            <div className="h-0.5 bg-gray-1/20 w-full" />
          </div>
        </TabsList>
        {/* Thread Tab Content */}
        <TabsContent
          value="threads"
          className="w-full mt-4 flex-1 flex items-center justify-center px-10"
        >
          {userInfo.threads.length === 0 ? (
            <div className="w-full h-full flex-1 flex items-center justify-center">
              <p className="text-light-1">No threads yet.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col w-full">
                {result.threads.map((thread: IPost) => (
                  <ThreadCard
                    key={thread._id}
                    postId={thread._id}
                    currentUserId={userInfo._id}
                    parentId={thread.parentId || ""}
                    content={thread.thread_text}
                    attachments={thread.attachments}
                    author={userInfo}
                    createdAt={thread.createdAt}
                    comments={thread.comments}
                    userData={userData}
                  />
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* Replies Tab Content */}
        <TabsContent
          value="replies"
          className="w-full mt-4 flex-1 flex items-center justify-center"
        >
          {true ? (
            <div className="h-full flex-1 flex items-center justify-center">
              <p className="text-light-1">No replies yet.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col">
                {/* {result.threads.map((thread: IPost) => (
                  <ThreadCard
                    key={thread._id}
                    postId={thread._id}
                    currentUserId={userInfo._id}
                    parentId={thread.parentId || ""}
                    content={thread.thread_text}
                    attachments={thread.attachments}
                    author={userInfo}
                    createdAt={thread.createdAt}
                    comments={thread.comments}
                  />
                ))} */}
              </div>
            </>
          )}
        </TabsContent>

        {/* Reposts Tap Content */}
        <TabsContent
          value="reposts"
          className="w-full mt-4 flex-1 flex items-center justify-center"
        >
          {true ? (
            <div className="h-full flex-1 flex items-center justify-center">
              <p className="text-light-1">No reposts yet.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col">
                {/* {result.threads.map((thread: IPost) => (
                  <ThreadCard
                    key={thread._id}
                    postId={thread._id}
                    currentUserId={userInfo._id}
                    parentId={thread.parentId || ""}
                    content={thread.thread_text}
                    attachments={thread.attachments}
                    author={userInfo}
                    createdAt={thread.createdAt}
                    comments={thread.comments}
                  />
                ))} */}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Page;

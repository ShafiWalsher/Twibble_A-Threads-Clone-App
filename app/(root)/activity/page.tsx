import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activityTabs } from "@/constants";
import { getActivity } from "@/lib/actions/user.actions";
import { fetchUserInfoData } from "@/lib/utils";
import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const Page = async () => {
  const { userInfo, userData } = await fetchUserInfoData();

  const activity = await getActivity(userInfo._id);

  // console.log({ activity });

  return (
    <section className="w-[710px] h-screen">
      <Tabs defaultValue="all" className="flex flex-col items-center gap-2">
        <TabsList className="w-full h-full relative flex items-center justify-center gap-2 bg-transparent">
          {activityTabs.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="bg-transparent border border-light-1/30 w-24 px-4 py-1 rounded-lg data-[state=active]:bg-light-1 data-[state=active]:text-dark-1 text-light-1"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="w-full px-20">
          <TabsContent value="all">
            {activity.length > 0 ? (
              <div className="flex flex-col gap-2">
                {activity.map((activity: IPost) => (
                  <Link
                    key={activity._id}
                    href={`/thread/${activity.parentId}`}
                  >
                    <article className="activity-card">
                      <Image
                        src={activity.author.photoUrl || ""}
                        alt="user_logo"
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                      />
                      <div className="w-full flex flex-col justify-center border-b border-b-light-1/20 py-2">
                        <p className="text-base-bold text-light-1">
                          {activity.author.username}
                        </p>
                        <p className="text-base-regular text-gray-1 mb-1">
                          Replied to your Thread.
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="!text-base-regular text-light-3">No activity yet</p>
            )}
          </TabsContent>

          {activityTabs.map((item) => (
            <div key={item.value}>
              {item.label !== "All" && (
                <TabsContent value={item.value}>
                  <p className="text-light-1">
                    Nothing in {item.value} tab yet!
                  </p>
                </TabsContent>
              )}
            </div>
          ))}
        </div>
      </Tabs>
    </section>
  );
};

export default Page;

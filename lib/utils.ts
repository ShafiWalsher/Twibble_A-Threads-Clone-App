import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { IComment, RemoveUrlQueryParams, UrlQueryParams } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { getUserByClerkId, getUserById } from "./actions/user.actions";
import { IThread } from "./database/models/thread.model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  console.log(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

// created by chatgpt
export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

// export function formatPostCreationTime(createdAt: Date) {
//   const now = new Date();
//   const postDate = new Date(createdAt);

//   const timeDifferenceInSeconds = Math.floor(
//     (now.getTime() - postDate.getTime()) / 1000
//   );

//   if (timeDifferenceInSeconds < 60) {
//     return `${timeDifferenceInSeconds}sec`;
//   } else if (timeDifferenceInSeconds < 3600) {
//     const minutes = Math.floor(timeDifferenceInSeconds / 60);
//     return `${minutes}min`;
//   } else if (timeDifferenceInSeconds < 86400) {
//     const hours = Math.floor(timeDifferenceInSeconds / 3600);
//     return `${hours}H`;
//   } else if (timeDifferenceInSeconds < 604800) {
//     const days = Math.floor(timeDifferenceInSeconds / 86400);
//     return `${days}D`;
//   } else if (timeDifferenceInSeconds < 2629746) {
//     const weeks = Math.floor(timeDifferenceInSeconds / 604800);
//     return `${weeks}W`;
//   } else if (timeDifferenceInSeconds < 31556952) {
//     const months = Math.floor(timeDifferenceInSeconds / 2629746);
//     return `${months}M`;
//   } else {
//     const years = Math.floor(timeDifferenceInSeconds / 31556952);
//     return `${years}Y`;
//   }
// }

// Recursive function to calculate the total count of comments and nested comments
export const countReplies = (comments?: IComment[]): number => {
  if (!comments || comments.length === 0) {
    return 0;
  }

  let totalCount = comments.length;

  // Recursively count nested comments
  for (const comment of comments) {
    totalCount += countReplies(comment?.comments);
  }

  return totalCount;
};

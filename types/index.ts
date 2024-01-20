import { IUser } from "@/lib/database/models/user.model";
import { Dispatch, SetStateAction } from "react";

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  username: string;
  email: string;
  photoUrl: string;
  // bio?: string;
  // onboarded?: boolean;
  // threads?: string[]; // Assuming threads is an array of thread IDs (string)
};

export type UpdateUserParams = {
  _id: string;
  user: {
    firstName: string;
    username?: string;
    photoUrl: string;
    bio?: string | "";
    onboarded?: boolean;
  };
  pathname?: string;
};

// ====== USERINFO PARAMS
export interface UserInfoParams {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  photoUrl?: string;
  bio?: string;
  threads: string[];
  onboarded: boolean;
}

// ====== THREADCARD PARAMS
export interface ThreadCardProps {
  postId: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  attachments?: string[];
  author: IUser;
  createdAt: Date;
  comments?: IComment[];
  isComment?: boolean;
  from?: "ThreadPage" | "HomePage";
  userData: {
    userId: string;
    username: string;
    photoUrl: string;
  };
}

// FETCH ALL POSTS PARAMS
export interface IComment {
  _id: string;
  thread_text: string;
  author: IUser;
  createdAt: Date;
}

export interface IPost {
  _id: string;
  thread_text: string;
  attachments: string[];
  author: IUser;
  createdAt: Date;
  parentId?: string;
  comments?: IComment[];
}

export interface IFetchPostsResult {
  posts: IPost[];
  isNext: boolean;
}

// USERCARD PROPS
// export interface UserCardProps {
//   postId: string;
//   currentUserId: string;
//   parentId: string | null;
//   content: string;
//   attachments?: string[];
//   author: IUser;
//   createdAt: Date;
//   comments?: IComment[];
//   isComment?: boolean;
// }

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Add Comment Params
export interface AddCommentParams {
  postId: string;
  parentId: string | null;
  content: string;
  attachments?: string[];
  author: IUser;
  createdAt: Date;
  imgSrc?: string;
  imgLabel?: string;
  userData: {
    userId: string;
    username: string;
    photoUrl: string;
  };
}

// Add Comment Form Params
export interface AddCommentFormParams {
  postData: {
    postId: string;
    content: string;
    attachments?: string[];
    author: IUser;
    createdAt: Date;
  };
  userData: {
    userId: string;
    username: string;
    photoUrl: string;
  };
  parentId: string | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface EditThreadParams {
  currentUserId: string;
  threadAuthorId: string;
  postId: string;
  parentId: string | null;
  content: string;
  attachments?: string[];
  author: IUser;
  createdAt: Date;
  userData: {
    userId: string;
    username: string;
    photoUrl: string;
  };
  isComment?: boolean;
}

export interface EditThreadFormParams {
  postData: {
    postId: string;
    content: string;
    attachments?: string[];
    author: IUser;
    createdAt: Date;
    currentUserId: string;
  };
  userData: {
    userId: string;
    username: string;
    photoUrl: string;
  };
  parentId: string | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

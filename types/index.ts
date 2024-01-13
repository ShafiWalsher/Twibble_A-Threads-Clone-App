import { IUser } from "@/lib/database/models/user.model";

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
    username: string;
    photoUrl: string;
    bio?: string | "";
    onboarded: boolean;
  };
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
  author: IUser;
  createdAt: Date;
  comments?: IComment[];
  isComment?: boolean;
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
  author: IUser;
  createdAt: Date;
  parentId?: string;
  comments?: IComment[];
}

export interface IFetchPostsResult {
  posts: IPost[];
  isNext: boolean;
}

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

// ====== FEEDBACK PARAMS
export type CreateFeedbackParams = {
  name: string;
  message: string;
};

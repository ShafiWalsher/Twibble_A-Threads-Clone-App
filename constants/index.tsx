export const menuLinks = [
  {
    imgURL: "/assets/icons/home-for-you.svg",
    route: "/",
    label: "Home For You",
  },
  {
    imgURL: "/assets/icons/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/icons/create.svg",
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    imgURL: "/assets/icons/activity.svg",
    route: "/activity",
    label: "Activity",
  },
  {
    imgURL: "/assets/icons/profile.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/icons/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/icons/members.svg" },
  { value: "reposts", label: "Reposts", icon: "/assets/icons/repost.svg" },
];

export const activityTabs = [
  { value: "all", label: "All" },
  { value: "follows", label: "Follows" },
  { value: "replies", label: "Replies" },
  { value: "mentions", label: "Mentions" },
  { value: "quotes", label: "Quotes" },
  { value: "reposts", label: "Reposts" },
  { value: "varified", label: "Varified" },
];

export const menuItems = [
  {
    value: "GitHub Repo 🡵",
    href: "https://github.com/ShafiWalsher/Twibble_A-Threads-Clone-App",
  },
  { value: "Switch appearance", href: "" },
  { value: "Settings", href: "" },
  { value: "About", href: "" },
  { value: "Report a problem", href: "" },
  { value: "Logout", href: "" },
];

export const profileDefaultValues = {
  photoUrl: "",
  firstName: "",
  username: "",
  bio: "",
};

export const profilePictures = [
  { src: "/assets/profilepps/image1.jpg", label: "image1" },
  { src: "/assets/profilepps/image2.jpg", label: "image2" },
  { src: "/assets/profilepps/image3.jpg", label: "image3" },
];

export const threadInteractIcons = [
  { src: "/assets/icons/heart-white.svg", label: "heart" },
  { src: "/assets/icons/chat.svg", label: "reply" },
  { src: "/assets/icons/repost.svg", label: "repost" },
  { src: "/assets/icons/share.svg", label: "share" },
];

export const threadCardMenuItems = [
  { key: "mute", value: "Mute" },
  { key: "block", value: "Block" },
  { key: "hide", value: "Hide" },
  { key: "report", value: "Report" },
];
export const threadCardMenuItems_User = [
  { key: "pin_to_profile", value: "Pin to profile" },
  { key: "who_can_reply", value: "Who can reply" },
  { key: "hide_likes_and_share_counts", value: "Hide likes and share counts" },
  { key: "delete", value: "Delete" },
];

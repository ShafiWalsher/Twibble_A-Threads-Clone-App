import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/webhook/clerk", "/api/webhook/uploadthing"],
  ignoredRoutes: ["/api/webhook/clerk", "/api/webhook/uploadthing"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

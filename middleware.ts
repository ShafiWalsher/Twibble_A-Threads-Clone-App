import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/webhooks/clerk(.*)", "/api/webhooks/uploadthing(.*)"],
  ignoredRoutes: ["/api/webhooks/clerk(.*)", "/api/webhooks/uploadthing(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

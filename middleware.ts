// // import { clerkMiddleware } from "@clerk/nextjs/server";

// // export default clerkMiddleware();

// // export const config = {
// //   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// // };

import { updateSession } from "@/app/api/sessions";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

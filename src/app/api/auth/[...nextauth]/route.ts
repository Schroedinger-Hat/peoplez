import NextAuth from "next-auth";

import { authOptions } from "@/server/auth";

const nextHandler = NextAuth(authOptions);

export { nextHandler as GET, nextHandler as POST };

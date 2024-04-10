import NextAuth from "next-auth";

import { authOptions } from "@/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const nextHandler = NextAuth(authOptions);

export {
    nextHandler as GET,
    nextHandler as POST
};

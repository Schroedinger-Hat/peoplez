"use client";

import { signIn } from "next-auth/react";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

export function DiscordSignIn() {
  return (
    <button
      onClick={() => signIn("discord")}
      className={
        "flex items-center rounded-md bg-[#5865F2] px-5 py-3 text-gray-100 hover:bg-[#5865F2]/80"
      }
    >
      <DiscordLogoIcon className={"mr-2"} width={20} height={20} />
      <span className={"text-sm font-semibold"}>Sign in with Discord</span>
    </button>
  );
}

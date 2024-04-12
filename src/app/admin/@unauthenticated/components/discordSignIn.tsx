"use client";

import Image from "next/image";
import {signIn} from "next-auth/react";
import {DiscordLogoIcon} from "@radix-ui/react-icons";

export function DiscordSignIn() {
    return (
        <button
            onClick={() => signIn("discord")}
            className={
                "flex rounded-md bg-[#5865F2] px-5 py-3 text-gray-100 hover:bg-[#5865F2]/80 items-center"
            }
        >
            <DiscordLogoIcon className={'mr-2'} width={20} height={20}/>
            <span className={"text-sm font-semibold"}>Sign in with Discord</span>
        </button>
    );
}

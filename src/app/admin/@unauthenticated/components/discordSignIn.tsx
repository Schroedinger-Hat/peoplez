'use client'

import Image from "next/image";
import {signIn} from "next-auth/react";

export function DiscordSignIn() {
    return (
        <button onClick={() => signIn('discord')}
                className={'bg-[#5865F2] hover:bg-[#5865F2]/80 py-3 px-5 rounded-md text-gray-100 flex'}>
            <Image src={'https://authjs.dev/img/providers/discord.svg'} width={20} height={20} alt={'discord icon'} className={'mr-2'}/>
            <span className={'text-sm font-semibold'}>Sign in with Discord</span>
        </button>
    )
}
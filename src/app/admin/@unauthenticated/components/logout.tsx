'use client'

import {signOut} from "next-auth/react";

export function Logout() {
    return (
        <button onClick={() => signOut()}
                className={'bg-red-600 hover:bg-red-600/80 py-3 px-5 rounded-md text-gray-100 flex'}>
            <span className={'text-sm font-semibold'}>Logout</span>
        </button>
    )
}
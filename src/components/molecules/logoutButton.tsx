'use client'

import {signOut} from "next-auth/react";

// TODO: Add confirm modal before triggering logout
export function LogoutButton () {
    return <span onClick={() => signOut()} className={'cursor-pointer'}>Logout</span>
}
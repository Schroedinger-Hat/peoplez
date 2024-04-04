import {DebugDisplay} from "@/components/debug/display";
import {getServerAuthSession} from "@/server/auth";
import {getProviders} from "next-auth/react";
import {AdminLogin} from "@/components/login/admin/login";

export default async function AdminPage() {
    const session = await getServerAuthSession();
    const providers = await getProviders()

    if(!session) return <AdminLogin/>

    return (
        <>
            <h1>Admin</h1>
            <DebugDisplay>{session}</DebugDisplay>
            <DebugDisplay>{providers}</DebugDisplay>
            <p>Welcome {session?.user?.name}!</p>

        </>
    )
}


import {DiscordSignIn} from "@/components/login/admin/components/discordSignIn";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export function AdminLogin() {
    return (
        <main className="h-screen flex justify-center items-center bg-zinc-900">
            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        You need to login in order to access the admin
                    </CardDescription>
                </CardHeader>
                <CardFooter className={'flex justify-center'}>
                    <DiscordSignIn/>
                </CardFooter>
            </Card>
        </main>
    )
}
import {DiscordSignIn} from "@/app/admin/@unauthenticated/components/discordSignIn";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default function AdminLogin() {
    return (
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
    )
}
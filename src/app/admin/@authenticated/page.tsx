import {getServerAuthSession} from "@/server/auth";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {SectionTitle} from "@/components/typography/sectionTitle";

export default async function AdminPage() {
    const session = await getServerAuthSession()

    return (
        <>
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Welcome, {session?.user.name}</h1>
            </div>
            <div
                className="mx-auto grid w-full max-w-6xl items-start gap-6">
                <div className="grid gap-6">
                    {/*Tutorial*/}
                    <Card className={'bg-gray-100'}>
                        <CardHeader>
                            <SectionTitle
                                title={'Create a Membership'}
                                description={'Create a membership to start accepting new members and grow your organization'}
                            />
                        </CardHeader>
                    </Card>

                    <div className="h-2"></div>

                    {/*Help*/}
                    <SectionTitle
                        title={'Explore Peoplez'}
                        description={'Learn the basics, and access advanced tips and resources'}
                    />
                    <div className="grid grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Support</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Create a Membership</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}


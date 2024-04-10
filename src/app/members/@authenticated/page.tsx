import {getServerAuthSession} from "@/server/auth";
import {MembershipCard, PricePeriod, PriceUnit} from "@/app/signup/components/membershipCard";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function MembershipPortalHomePage() {
    const session = await getServerAuthSession()

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Welcome, {session?.user.name}</h1>
            </div>
            <div className={'grid grid-cols-2 gap-8'}>
                <p className={'text-md txt-gray-800'}>
                    Thanks for being a member of Schroedinger.
                    <br/>In this portal you can manage your subscription, read announcements partecipate in the
                    association governance
                </p>

                <MembershipCard
                    showPrice={false}
                    title={'SH 2024 Membership'}
                    features={[
                        'Be part of the community',
                        'Early-access to event tickets and contents',
                        'Dedicated 5€ discount on all shop orders',
                        'Exclusive members meetups and dinners'
                    ]}
                    price={{value: 2400, unit: PriceUnit.Eur, period: PricePeriod.Yearly}}
                    description={'Support groundbreaking open source initiatives and join us in our mission to create an international community of open source lovers.'}
                />

                <div className={'grid gap-4'}>
                    <h3 className={'text-lg'}>Latest Announcements</h3>
                    <Card>
                        <CardHeader>
                            <CardTitle>Lorem Ipsum</CardTitle>
                        </CardHeader>
                        <CardContent>Nam lacus odio, commodo nec viverra et, molestie id odio. Fusce varius auctor
                            purus, a ullamcorper tellus lacinia lacinia. Nulla at convallis lorem, non mollis neque.
                            Suspendisse consequat auctor lectus at suscipit. Morbi viverra turpis id urna ullamcorper,
                            vel tristique odio iaculis. Praesent fringilla tortor et tellus fringilla fringilla. Nulla
                            commodo eu eros sit amet cursus. Etiam tincidunt tortor in dignissim ultrices.</CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ipsum Lorem</CardTitle>
                        </CardHeader>
                        <CardContent>Quisque posuere scelerisque tellus, sed elementum lacus feugiat vitae. Nam iaculis,
                            risus vitae ultrices dictum, mi eros fermentum purus, nec finibus arcu risus sit amet enim.
                            Etiam non accumsan nulla. Cras imperdiet laoreet turpis sit amet aliquet. Vivamus non varius
                            ipsum, at sagittis magna. Sed mattis est ac nisi volutpat, vitae fermentum nulla
                            congue.</CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
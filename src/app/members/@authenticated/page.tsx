import { MembershipTemplateCard } from "@/components/molecules/membershipTemplateCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerAuthSession } from "@/server/auth"
import { MembershipStatus, PricePeriod, PriceUnit } from "@prisma/client"
import { db } from "@/services/db"

function getData(userId) {
  return db.membership.findFirst({
    where: {
      status: {
        not: MembershipStatus.PENDING,
      },
      userId: userId,
    },
    include: {
      membershipTemplate: true,
    },
  })
}

export default async function MembershipPortalHomePage() {
  const session = await getServerAuthSession()
  const membership = await getData(session?.user.id!)

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Welcome, {session?.user.name}
        </h1>
      </div>
      <div className={"grid grid-cols-2 gap-8"}>
        <p className={"text-md txt-gray-800"}>
          Thanks for being a member of Schroedinger.
          <br />
          In this portal you can manage your subscription, read announcements
          partecipate in the association governance
        </p>

        {membership && (
          <MembershipTemplateCard
            showPrice={false}
            title={membership.membershipTemplate.title}
            features={membership.membershipTemplate.features}
            price={{
              period: membership.membershipTemplate.pricePeriod,
              unit: membership.membershipTemplate.priceUnit,
              value: membership.membershipTemplate.priceAmount,
            }}
            description={membership.membershipTemplate.description}
          />
        )}

        <div className={"grid gap-4"}>
          <h3 className={"text-lg"}>Latest Announcements</h3>
          <Card>
            <CardHeader>
              <CardTitle>Lorem Ipsum</CardTitle>
            </CardHeader>
            <CardContent>
              Nam lacus odio, commodo nec viverra et, molestie id odio. Fusce
              varius auctor purus, a ullamcorper tellus lacinia lacinia. Nulla
              at convallis lorem, non mollis neque. Suspendisse consequat auctor
              lectus at suscipit. Morbi viverra turpis id urna ullamcorper, vel
              tristique odio iaculis. Praesent fringilla tortor et tellus
              fringilla fringilla. Nulla commodo eu eros sit amet cursus. Etiam
              tincidunt tortor in dignissim ultrices.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ipsum Lorem</CardTitle>
            </CardHeader>
            <CardContent>
              Quisque posuere scelerisque tellus, sed elementum lacus feugiat
              vitae. Nam iaculis, risus vitae ultrices dictum, mi eros fermentum
              purus, nec finibus arcu risus sit amet enim. Etiam non accumsan
              nulla. Cras imperdiet laoreet turpis sit amet aliquet. Vivamus non
              varius ipsum, at sagittis magna. Sed mattis est ac nisi volutpat,
              vitae fermentum nulla congue.
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

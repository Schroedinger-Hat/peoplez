import Link from "next/link"

import { Placeholder } from "@/components/devtool/placeholder"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LinkLabel, Paragraph, SectionTitle } from "@/components/ui/typography"
import { getServerAuthSession } from "@/server/auth"

export default async function AdminHomePage() {
  const session = await getServerAuthSession()

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">
          Welcome, {session?.user.name}
        </h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid gap-6">
          {/*Tutorial*/}
          <Card className={"bg-gray-100"}>
            <CardHeader>
              <div className="flex justify-between">
                <SectionTitle
                  title={"Create a Membership"}
                  description={
                    "Start accepting new members and grow your organization by creating your first membership"
                  }
                />
                <Button>Create Membership</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Paragraph>Alternatively you could:</Paragraph>
              <div className="mt-2 flex gap-2">
                <Card className={"w-48"}>
                  <CardContent className={"p-4"}>
                    <div className={"grid justify-items-center gap-2"}>
                      <Placeholder w={128} h={128} />
                      <p className={"block text-center text-sm"}>
                        Invite new users in the dashboard
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={"w-48"}>
                  <CardContent className={"p-4"}>
                    <div className={"grid justify-items-center gap-2"}>
                      <Placeholder w={128} h={128} />
                      <p className={"block text-center text-sm"}>
                        Upload the organization statute
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={"w-48"}>
                  <CardContent className={"p-4"}>
                    <div className={"grid justify-items-center gap-2"}>
                      <Placeholder w={128} h={128} />
                      <p className={"block text-center text-sm"}>
                        Bring your organisation branding
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={"w-48"}>
                  <CardContent className={"p-4"}>
                    <div className={"grid justify-items-center gap-2"}>
                      <Placeholder w={128} h={128} />
                      <p className={"block text-center text-sm"}>
                        Some other feature highlight
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="h-2"></div>

          {/*Help*/}
          <SectionTitle
            title={"Explore Peoplez"}
            description={
              "Learn the basics, and access advanced tips and resources"
            }
          />
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className={"flex flex-col content-between p-6"}>
                <Placeholder w={38} h={38} />
                <div className="h-6"></div>
                <SectionTitle
                  title={"Help Center"}
                  description={
                    "Check out articles with frequently asked questions, tips, and tricks."
                  }
                />
                <div className="h-12"></div>
                <Link href={"/documents/help"}>
                  <LinkLabel>Open Help Center</LinkLabel>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className={"flex flex-col content-between p-6"}>
                <Placeholder w={38} h={38} />
                <div className="h-6"></div>
                <SectionTitle
                  title={"Contribute to Peoplez"}
                  description={
                    "Missing a feature? Peoplez is open-source! Contribute to the project and expands is functionalities"
                  }
                />
                <div className="h-12"></div>
                <Link href={"/documents/help"}>
                  <LinkLabel>Go to Github</LinkLabel>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

import { db } from "@/services/db"
import { AdminMembershipEditPageClient } from "@/app/admin/@authenticated/membership/manage/@modal/edit/[id]/client"

const getData = (id: string) => {
  return db.membershipTemplate.findUnique({
    where: {
      id,
    },
  })
}

interface AdminMembershipEditPageProps {
  params: {
    id: string
  }
}

export default async function AdminMembershipEditPage({
  params,
}: AdminMembershipEditPageProps) {
  const membershipTemplate = await getData(params.id)

  return (
    <div className={"lg:w-2/3"}>
      <AdminMembershipEditPageClient previousValues={membershipTemplate!} />
    </div>
  )
}

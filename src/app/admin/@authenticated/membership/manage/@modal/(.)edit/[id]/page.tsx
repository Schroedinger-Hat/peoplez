import { Modal } from "@/components/molecules/modal"
import { db } from "@/services/db"
import { AdminMembershipEditModalClient } from "@/app/admin/@authenticated/membership/manage/@modal/(.)edit/[id]/client"

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

export default async function AdminMembershipModalEditPage({
  params,
}: AdminMembershipEditPageProps) {
  const membershipTemplate = await getData(params.id)

  return (
    <Modal>
      <AdminMembershipEditModalClient previousValues={membershipTemplate!} />
    </Modal>
  )
}

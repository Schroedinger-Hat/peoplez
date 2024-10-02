import { Modal } from "@/components/molecules/modal"
import { AdminMembershipCRUDForm } from "@/app/admin/@authenticated/membership/manage/form"
import { CRUDFormIntent } from "@/modules/crudForm/types"

export default function AdminMembershipModalCreatePage() {
  return (
    <Modal>
      <AdminMembershipCRUDForm intent={CRUDFormIntent.Create} />
    </Modal>
  )
}

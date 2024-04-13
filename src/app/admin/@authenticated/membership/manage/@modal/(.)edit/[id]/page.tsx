import {Modal} from "@/components/molecules/modal";
import {
    AdminMembershipCRUDForm
} from "@/app/admin/@authenticated/membership/manage/form";
import {CRUDFormIntent} from "@/modules/crudForm/types";
import {db} from "@/services/db";

const getData = (id: string) => {
    return db.membershipTemplate.findUnique({
        where: {
            id
        }
    })
}
export default async function AdminMembershipModalEditPage({params}) {
    const membershipTemplate = await getData(params.id)

    return <Modal>
        <AdminMembershipCRUDForm intent={CRUDFormIntent.Edit} previousValues={membershipTemplate}/>
    </Modal>
}
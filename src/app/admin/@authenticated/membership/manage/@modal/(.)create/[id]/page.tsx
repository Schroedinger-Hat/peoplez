import {Modal} from "@/components/molecules/modal";

export default function AdminMembershipModalCreatePage({
                                                           params: {id},
                                                       }: {
    params: { id: string };
}) {
    return <Modal>AdminMembership<b>Modal</b>CreatePage: {id}</Modal>
}
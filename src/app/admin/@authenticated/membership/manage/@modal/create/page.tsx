import {CRUDFormIntent} from "@/modules/crudForm/types";
import {AdminMembershipCreatePageClient} from "@/app/admin/@authenticated/membership/manage/@modal/create/client";

export default function AdminMembershipCreatePage() {
    return <div className={'lg:w-2/3'}>
        <AdminMembershipCreatePageClient />
    </div>;
}


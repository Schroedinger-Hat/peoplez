"use client";

import { AdminMembershipCRUDForm } from "@/app/admin/@authenticated/membership/manage/form";
import { CRUDFormIntent } from "@/modules/crudForm/types";

export function AdminMembershipCreatePageClient() {
  const onSubmit = () => {
    alert("Done");
  };

  return (
    <AdminMembershipCRUDForm
      intent={CRUDFormIntent.Create}
      onSuccess={onSubmit}
    />
  );
}

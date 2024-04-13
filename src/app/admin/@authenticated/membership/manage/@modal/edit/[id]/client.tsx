"use client";

import { AdminMembershipCRUDForm } from "@/app/admin/@authenticated/membership/manage/form";
import { CRUDFormIntent } from "@/modules/crudForm/types";
import { type MembershipTemplate } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface AdminMembershipEditPageClient {
  previousValues: MembershipTemplate;
}

export function AdminMembershipEditPageClient({
  previousValues,
}: AdminMembershipEditPageClient) {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = () => {
    toast({
      title: "Success",
      description: "Membership Template updated",
      variant: "success",
    });
    router.replace("/admin/membership/manage");
    router.refresh();
  };

  return (
    <AdminMembershipCRUDForm
      intent={CRUDFormIntent.Edit}
      previousValues={previousValues}
      onSuccess={onSubmit}
    />
  );
}

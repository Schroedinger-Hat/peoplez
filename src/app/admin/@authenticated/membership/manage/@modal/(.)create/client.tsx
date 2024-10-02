"use client"

import { AdminMembershipCRUDForm } from "@/app/admin/@authenticated/membership/manage/form"
import { CRUDFormIntent } from "@/modules/crudForm/types"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function AdminMembershipCreateModalClient() {
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = () => {
    toast({
      title: "Success",
      description: "Membership Template created",
      variant: "success",
    })
    router.back()
    router.refresh()
  }

  return (
    <AdminMembershipCRUDForm
      intent={CRUDFormIntent.Create}
      onSuccess={onSubmit}
    />
  )
}

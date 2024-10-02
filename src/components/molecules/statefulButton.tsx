"use client"
import { noop } from "lodash"
import { useFormStatus } from "react-dom"

import { Button, type ButtonProps } from "@/components/ui/button"

interface StatefulButtonProps extends ButtonProps {
  loading?: boolean
}

export function StatefulButton({
  loading,
  children,
  ...props
}: StatefulButtonProps) {
  const formStatus = useFormStatus()
  const isLoading = formStatus.pending || loading

  if (isLoading)
    return (
      <Button {...props} onClick={noop} disabled={true}>
        Loading...
      </Button>
    )
  else return <Button {...props}>{children}</Button>
}

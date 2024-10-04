export enum Target {
  MembershipPortal = "membership_portal",
  AdminPortal = "admin_portal",
}

export interface LoginFormProps {
  description?: string
  target: Target
}

import { type UserRole } from "@prisma/client"

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    role: UserRole
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    role: UserRole
  }
}

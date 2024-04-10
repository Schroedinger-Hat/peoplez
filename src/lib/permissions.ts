// Receives a required role and a session and return a boolean indicating if the provided session matches the required role
import {isNil} from "lodash";
import {type UserRole} from "@prisma/client";

export function hasRequiredRole(role: UserRole, session: any) {
    if (isNil(session)) return false
    return session?.user?.role === role
}
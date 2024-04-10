"use server";

import {db} from "@/services/db";
import {MembershipStatus} from "@prisma/client";

export interface ServerActionState {
    checked: boolean,
    valid: boolean,
    email?: string
}

export async function validateUserEmail(prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
    const user = await db.user.findUnique({
        where: {
            email: formData.email,
        },
    });

    // No user means that is not valid
    if (!user) return {
        checked: true,
        valid: false
    };

    // User without membership means that is not valid
    const membership = await db.membership.findFirst({
        where: {
            userId: user.id,
            status: {
                not: MembershipStatus.PENDING
            }
        }
    })
    if (!membership) return {
        checked: true,
        valid: false
    };

    return {
        checked: true,
        valid: true,
        email: formData.email
    };
}

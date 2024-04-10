"use server";

import {db} from "@/services/db";
import {MembershipStatus} from "@prisma/client";

export async function validateUserEmail(prevState: any, formData: FormData) {
    const user = await db.user.findUnique({
        where: {
            email: formData.email,
        },
    });

    // No user means that is not valid
    if (!user) return {checked: true, valid: false};

    // User without membership means that is not valid
    let membership = await db.membership.findFirst({
        where: {
            userId: user.id,
            status: {
                not: MembershipStatus.PENDING
            }
        }
    })
    if (!membership) return {checked: true, valid: false};

    return {checked: true, valid: true, email: formData.email};
}

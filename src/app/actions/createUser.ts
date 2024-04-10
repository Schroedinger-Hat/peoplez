"use server";

import {type ServerActionState, ServerActionStatus} from "@/app/actions/types";
import {db} from "@/services/db";

export async function createUser(prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
    const user = await db.user.findFirst({
        where: {
            email: formData.email,
        },
    });

    if (user) {
        return {
            status: ServerActionStatus.Error,
            errors: [{
                message: "User already exist"
            }],
        };
    }

    const newUser = await db.user.create({
        data: {
            email: formData.email,
            name: "Davide Imola",
        },
    });

    await db.membership.create({
        data: {
            userId: newUser.id,
            status: "PENDING",
            stripeSubscriptionId: "xxx",
        },
    });

    return {
        status: ServerActionStatus.Success
    };
}

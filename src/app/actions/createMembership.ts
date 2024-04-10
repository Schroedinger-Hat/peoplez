"use server";

import {MembershipStatus} from "@prisma/client";

import {type ServerActionState, ServerActionStatus} from "@/app/actions/types";
import {db} from "@/services/db";
import {stripe} from "@/services/stripe";

const MEMBERSHIP_PRICE_ID = 'price_1P3HNlCXdJySzBrwlcoAQqS2'

export async function createMembership(prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
    // Avoid double membership creation
    if (prevState.nextStep === 'providePayment') return prevState

    // Check for user
    let user = await db.user.findFirst({
        where: {
            email: formData.email,
        },
    });

    // No User found, creates it
    if (!user) {
        // Query to create user
        user = await db.user.create({
            data: {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                emailVerified: new Date()
            }
        })
    }

    // User is not linked to Stripe, creates it
    if (!user.stripeCustomerId) {
        // Create customer to Stripe and link it to user
        const stripeCustomer = await stripe.customers.create({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
        })

        user.stripeCustomerId = stripeCustomer.id
        await db.user.update({
            where: {id: user.id},
            data: {stripeCustomerId: stripeCustomer.id},
        })
    }

    // Lookup for membership
    let membership = await db.membership.findFirst({
        where: {
            userId: user.id,
            status: {
                not: MembershipStatus.PENDING
            }
        }
    })

    // Membership already exists, block creation
    if (membership) {
        return {
            status: ServerActionStatus.Error,
            errors: [{
                message: "Membership already exists"
            }],
        }
    }

    // Creates membership
    membership = await db.membership.create({
        data: {
            userId: user.id,
            status: MembershipStatus.PENDING,
            socialSecurityNumber: formData.socialSecurityNumber
        }
    })

    // Create Stripe subscription
    const stripeSubscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [{
            price: MEMBERSHIP_PRICE_ID
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        payment_settings: {
            payment_method_types: ['card', 'link', 'paypal', 'sepa_debit']
        }
    });

    // Update membership
    membership.stripeSubscriptionId = stripeSubscription.id
    await db.membership.update({
        where: {id: membership.id},
        data: {stripeSubscriptionId: stripeSubscription.id},
    })

    // Return secret to client to finalize payment
    return {
        status: ServerActionStatus.Success,
        payload: {
            // eslint-disable-next-line
            clientSecret: stripeSubscription?.latest_invoice?.payment_intent?.client_secret,
            membershipId: membership.id,
        },
        nextStep: 'providePayment'
    };
}
'use client'

import Link from "next/link"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {StepForm} from "@/app/signup/stepForm";
import {DebugDisplay} from "@/components/debug/display";

const formSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        }),
    surname: z
        .string()
        .min(2, {
            message: "Surname must be at least 2 characters.",
        }),
    email: z
        .string()
        .email(),
    socialSecurityCode: z
        .string()
        .regex(new RegExp(/^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/), 'Invalid format, only italians "codice fiscale" are accepted'),
    approvedStatute: z
        .boolean()
        .refine(val => val, {
            message: "Please read and accept the statute",
        })
})

export default function SignupPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            socialSecurityCode: "",
        },
    })

    return (
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Activate a Membership
                </h1>
                <p className="text-sm text-muted-foreground">
                    Fill the form below to request a membership number for the association: <b>Schroedinger Hat</b>
                </p>
            </div>

            <StepForm form={form}/>

            <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                    href="/legal/terms-of-service"
                    target={'_blank'}
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    href="/legal/privacy-policy"
                    target={'_blank'}
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    )
}
'use client'

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {StepForm} from "@/app/signup/stepForm";
import {useFormState} from "react-dom";
import {createMembership} from "@/app/actions/createMembership";
import {loadStripe} from "@stripe/stripe-js";

const formSchema = z.object({
    firstName: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        }),
    lastName: z
        .string()
        .min(2, {
            message: "Surname must be at least 2 characters.",
        }),
    email: z
        .string()
        .email(),
    socialSecurityNumber: z
        .string()
        .regex(new RegExp(/^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/), 'Invalid format, only italians "codice fiscale" are accepted'),
    statuteApproval: z
        .boolean()
        .refine(val => val, {
            message: "Please read and accept the statute",
        })
})

export default function SignupPage() {
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

            <PageLogic/>
        </div>
    )
}

function PageLogic() {
    const [state, formAction] = useFormState(createMembership, {
        state: 'incomplete',
        payload: {}
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            socialSecurityNumber: "",
            statuteApproval: true
        },
    })

    const handleForm = async (data: FormData) => {
        if (state.nextStep === 'confirmPayment') {

        } else {
            formAction(data)
        }
    }

    return (
        <form action={form.handleSubmit(handleForm)}>
            <StepForm form={form} state={state}/>
        </form>
    )
}
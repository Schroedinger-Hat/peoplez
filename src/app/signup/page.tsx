'use client'

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {useSignUpStore} from "@/app/store/signup";

export default function SignupPage() {
    const [step, setStep] = useState<number>(1)
    const state = useSignUpStore()

    function FormStep1() {
        return (
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="name"
                        placeholder="John"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="surname">Surname</Label>
                    <Input
                        id="surname"
                        type="surname"
                        placeholder="Doe"
                        required
                    />
                </div>

                <div className={'col-span-2 mt-4'}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john.d@example.com"
                        required
                    />
                </div>

                <div className={'col-span-2 pt-3'}>
                    <div className={'flex-row-reverse flex'}>
                        <Button onClick={() => setStep(2)}>Next</Button>
                    </div>
                </div>
            </div>
        )
    }

    function FormStep2() {
        return (
            <div className="grid grid-cols-2 gap-2">
                <div className={'col-span-2'}>
                    <Label htmlFor="socialSecurityCode">Social Security Code</Label>
                    <Input
                        id="socialSecurityCode"
                        type="socialSecurityCode"
                        placeholder="LBRMTT..."
                        required
                    />
                </div>

                <div className={'col-span-2 mt-4'}>
                    <div className={'p-3 border-blue-200 border-2 rounded-2xl'}>
                        <div className={'flex'}>
                            <div>
                                <Checkbox id="terms1"/>
                            </div>
                            <div className={'ml-2'}>
                                <p className={'text-sm font-semibold'}>Statute</p>
                                <p className={'text-sm'}>I've read and approved the statute</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'col-span-2 pt-3'}>
                    <div className={'flex-row-reverse flex'}>
                        <Button onClick={() => setStep(3)}>Next</Button>
                    </div>
                </div>
            </div>
        )
    }

    function FormStep3() {
        return <>
            <div className="grid gap-2 animate-in slide-it-from-top">
                <p className={'text-sm'}>
                    We're going to redirect you to our PaymentProvider stripe to setup the last details of your
                    subscription.
                    Click Next to be redirected
                </p>
            </div>
            <div className={'float-right'}>
                <Button>Next</Button>
            </div>
        </>
    }

    return (
        <>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Activate a Membership
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Fill the form below to request a membership number for the association: <b>Schroedinger Hat</b>
                    </p>
                </div>

                <pre>{JSON.stringify(state)}</pre>

                {step === 1 && <FormStep1/>}
                {step === 2 && <FormStep2/>}
                {step === 3 && <FormStep3/>}

                <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link
                        href="/legal-terms-of-service"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/legal/privacy-policy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </>
    )
}
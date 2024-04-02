'use client'

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useState} from "react";

export default function SignupPage() {
    const [step, setStep] = useState()

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

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="email">Name</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Surname</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Doe"
                            required
                        />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john.d@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Social Security Code</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="LBRMTT..."
                        required
                    />
                </div>
                <div className={'float-right'}>
                    <Button>Next</Button>
                </div>

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
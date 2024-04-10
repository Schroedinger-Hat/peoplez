'use client'

import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {MembershipCard, PricePeriod, PriceUnit} from "@/app/signup/components/membershipCard";
import {loadStripe} from "@stripe/stripe-js";
import checkmark from '@/images/checkmark.svg'
import Image from "next/image";
import {useFormStatus} from "react-dom";
import {StatefulButton} from "@/components/molecules/statefulButton";
import {type UseFormReturn} from "react-hook-form";
import type {ServerActionState} from "@/app/actions/types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StepFormProps {
    form: UseFormReturn
    state: ServerActionState
}

export function StepForm({form, state}: StepFormProps) {
    const [step, setStep] = useState<number>(1)
    const formState = useFormStatus()

    const validateStep1 = async (): Promise<void> => {
        await form.trigger(['name', 'surname', 'email'])
        setStep(2)
    }
    const validateStep2 = async (): Promise<void> => {
        await form.trigger(['socialSecurityCode', 'statuteApproval'])
        setStep(3)
    }

    return (
        <Form {...form}>
            {/*Account data*/}
            {
                (state.state === 'incomplete' && step === 1) && <>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Surname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className={'col-span-2 mt-4'}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@doe.com" type={'email'} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className={'col-span-2 pt-3'}>
                            <div className={'flex-row-reverse flex'}>
                                <Button onClick={validateStep1}>Continue</Button>
                            </div>
                        </div>
                    </div>
                    <p className={'text-xs text-gray-600 text-center mt-4'}>
                        By clicking Continue, you agree to our<br/>
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
                </>
            }

            {/*Organisation required data*/}
            {
                (state.state === 'incomplete' && step === 2) &&
                <div className="grid grid-cols-2 gap-2 animate-in slide-in-from-right-12 duration-300">
                    <div className={'col-span-2'}>
                        <FormField
                            control={form.control}
                            name="socialSecurityNumber"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Social Security Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="LBRMTT..." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className={'col-span-2 mt-4'}>
                        <div className={'p-3 border-blue-200 border-2 rounded-2xl'}>
                            <FormField
                                control={form.control}
                                name="statuteApproval"
                                render={({field}) => (
                                    <FormItem>
                                        <div className={'flex'}>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className={'ml-2'}>
                                                <p className={'text-sm font-semibold'}>Statute</p>
                                                <p className={'text-sm'}>I've read and approved <Link target="_blank"
                                                                                                      className={'underline'}
                                                                                                      href={'/documents/legal/statute'}>the
                                                    statute</Link></p>
                                                <FormMessage/>
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className={'col-span-2 pt-3'}>
                        <div className={'flex-row-reverse flex'}>
                            <Button onClick={validateStep2}>Continue</Button>
                        </div>
                    </div>
                </div>
            }

            {/*Membership level*/}
            {
                (state.state === 'incomplete' && step === 3) &&
                <div className="grid grid-cols-1 animate-in slide-in-from-right-12 duration-300">

                    <div className="flex flex-col">
                        <MembershipCard
                            title={'SH 2024 Membership'}
                            features={[
                                'Be part of the community',
                                'Early-access to event tickets and contents',
                                'Dedicated 5€ discount on all shop orders',
                                'Exclusive members meetups and dinners'
                            ]}
                            price={{value: 2400, unit: PriceUnit.Eur, period: PricePeriod.Yearly}}
                            description={'Support groundbreaking open source initiatives and join us in our mission to create an international community of open source lovers.'}
                        />
                    </div>

                    <div className={'col-span-2 mt-8'}>
                        <div className={'flex-row-reverse flex'}>
                            <StatefulButton loading={formState.pending}>Subscribe</StatefulButton>
                        </div>
                    </div>
                    <p className={'text-xs text-gray-600 text-center mt-4'}>
                        By clicking Subscribe, you will proceed to payment.
                        <br/>Payment is processed through our partner Stripe
                    </p>
                </div>
            }

            {/*Payment*/}
            {
                (state.nextStep === 'providePayment' && step !== 5) &&
                <Elements stripe={stripePromise} options={{clientSecret: state.payload.clientSecret}}>
                    <Step4 state={state} setStep={setStep}/>
                </Elements>
            }

            {/*Success*/}
            {
                step === 5 &&
                <div className="grid grid-cols-1 justify-items-center">
                    <Image
                        src={checkmark} alt={'Success'} width={128} height={128}
                        className={'animate-in zoom-in duration-500'}
                    />
                    <p className={'font-semibold text-2xl my-4'}>
                        Welcome aboard!
                    </p>
                    <p className={'text-gray-800 text-md'}>
                        Admins will review your application and let know your membership number in the following days.
                    </p>
                </div>
            }
        </Form>
    )
}

interface Step4Props {
    state: ServerActionState
    setStep: unknown
}

function Step4({state, setStep}: Step4Props) {
    const stripe = useStripe()
    const elements = useElements()

    const handlePaymentSubmit = async () => {
        await elements?.submit()
        const confirmPayment = await stripe?.confirmPayment({
            elements,
            redirect: 'if_required',
            clientSecret: state?.payload?.clientSecret
        });
        console.log(confirmPayment)
        if (confirmPayment?.paymentIntent?.status === 'succeeded') {
            setStep(5)
        }
    }

    return (
        <div className="flex flex-col animate-in slide-in-from-right-12 duration-300">
            <p className={'text-gray-800 text-md mb-5'}>
                Provide your payment informations to complete your membership subscription
            </p>

            <div>
                <PaymentElement/>
            </div>

            <div className={'col-span-2 pt-3'}>
                <div className={'flex-row-reverse flex'}>
                    <Button onClick={() => handlePaymentSubmit()}>Next</Button>
                </div>
            </div>
        </div>

    )
}
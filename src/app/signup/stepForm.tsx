'use client'

import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {PaymentElement} from "@stripe/react-stripe-js";
import {MembershipCard, PricePeriod, PriceUnit} from "@/app/signup/components/membershipCard";

// @ts-ignore
export function StepForm({form}) {
    const [step, setStep] = useState<number>(1)

    return (
        <Form {...form}>
            {/*Account data*/}
            {
                step === 1 && <div className="grid grid-cols-2 gap-2">
                    <div>
                        <FormField
                            control={form.control}
                            name="name"
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
                            name="surname"
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
                            <Button
                                onClick={async () => await form.trigger(['name', 'surname', 'email']) && setStep(2)}>Next</Button>
                        </div>
                    </div>
                </div>
            }

            {/*Organisation required data*/}
            {
                step === 2 && <div className="grid grid-cols-2 gap-2 animate-in slide-in-from-right-12 duration-300">
                    <div className={'col-span-2'}>
                        <FormField
                            control={form.control}
                            name="socialSecurityCode"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Social Security Code</FormLabel>
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
                            <Button
                                onClick={async () => await form.trigger(['socialSecurityCode', 'statuteApproval']) && setStep(3)}>Next</Button>
                        </div>
                    </div>
                </div>
            }

            {/*Membership level*/}
            {
                step === 3 && <div className="grid grid-cols-1 animate-in slide-in-from-right-12 duration-300">

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
                        <p className={'text-xs text-gray-600 text-center mb-4'}>By clicking 'Subscribe' you will proceed to payment.<br/>Payment is processed through our partner Stripe</p>
                        <div className={'flex-row-reverse flex'}>
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </div>
            }

            {/*Payment*/}
            {
                step === 4 && <div className="grid grid-cols-1 gap-2 animate-in slide-in-from-right-12 duration-300">
                    {/*Payment Layout*/}
                    <PaymentElement/>

                    <div className={'col-span-2 pt-3'}>
                        <div className={'flex-row-reverse flex'}>
                            <Button>Next</Button>
                        </div>
                    </div>
                </div>
            }
        </Form>
    )
}
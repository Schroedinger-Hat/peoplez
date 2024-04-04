'use client'

import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";

// @ts-ignore
export function StepForm({form}) {
    const [step, setStep] = useState<number>(1)

    return (
        <Form {...form}>
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
                                name="approvedStatute"
                                render={({field}) => (
                                    <FormItem>
                                        <div className={'flex'}>
                                            <FormControl>
                                                <Checkbox/>
                                            </FormControl>
                                            <div className={'ml-2'}>
                                                <p className={'text-sm font-semibold'}>Statute</p>
                                                <p className={'text-sm'}>I've read and approved <Link target="_blank" className={'underline'} href={'/legal/statute'}>the statute</Link></p>
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
                                onClick={async () => await form.trigger(['socialSecurityCode', 'approvedStatute']) && setStep(3)}>Next</Button>
                        </div>
                    </div>
                </div>
            }
            {
                step === 3 && <div className="grid grid-cols-1 gap-2 animate-in slide-in-from-right-12 duration-300">
                    <p className={'text-sm'}>
                        We're going to redirect you to our PaymentProvider stripe to setup the last details of your
                        subscription.
                        Click Next to be redirected
                    </p>
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
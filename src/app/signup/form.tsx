"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import Link from "next/link"
import { type Dispatch, type SetStateAction, useState } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  createMembership,
  type FormProps,
} from "@/app/actions/createMembership"
import type { ServerActionState } from "@/app/actions/types"
import { ServerActionStatus } from "@/app/actions/types"
import { MembershipTemplateCard } from "@/components/molecules/membershipTemplateCard"
import { StatefulButton } from "@/components/molecules/statefulButton"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import checkmark from "@/images/checkmark.svg"
import { type MembershipTemplate } from "@prisma/client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Debug } from "@/components/devtool/debug"

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  socialSecurityNumber: z
    .string()
    .regex(
      new RegExp(
        /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/,
      ),
      'Invalid format, only italians "codice fiscale" are accepted',
    ),
  statuteApproval: z.boolean().refine((val) => val, {
    message: "Please read and accept the statute",
  }),
  membershipTemplateId: z.string(),
})

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

interface SignupFormProps {
  membershipTemplates: MembershipTemplate[]
}

export default function SignupForm({ membershipTemplates }: SignupFormProps) {
  const [createMembershipState, createMembershipAction] = useFormState(
    createMembership,
    {
      payload: {},
      status: ServerActionStatus.Pending,
    },
  )

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "lobetia@gmail.com",
      firstName: "Mattia",
      lastName: "Lobertini",
      socialSecurityNumber: "LBRMTT92E14B157T",
      statuteApproval: true,
    },
    resolver: zodResolver(formSchema),
  })

  const handleForm = async (data: FormProps) => {
    if (createMembershipState.nextStep === "confirmPayment") {
    } else {
      createMembershipAction(data)
    }
  }
  const [step, setStep] = useState<number>(1)

  const validateStep1 = async (): Promise<void> => {
    const stepIsValid = await form.trigger(["firstName", "lastName", "email"])
    if (stepIsValid) setStep(2)
  }
  const validateStep2 = async (): Promise<void> => {
    const stepIsValid = await form.trigger([
      "socialSecurityNumber",
      "statuteApproval",
    ])
    if (stepIsValid) setStep(3)
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Activate a Membership
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill the form below to request a membership number for the
          association: <b>Schroedinger Hat</b>
        </p>
      </div>

      <form action={form.handleSubmit(handleForm) as any}>
        <Form {...form}>
          {/*Account data*/}
          {createMembershipState.status === ServerActionStatus.Pending &&
            step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Surname</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className={"col-span-2 mt-4"}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@doe.com"
                              type={"email"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className={"col-span-2 pt-3"}>
                    <div className={"flex flex-row-reverse"}>
                      <Button onClick={validateStep1}>Continue</Button>
                    </div>
                  </div>
                </div>

                <p className={"mt-4 text-center text-xs text-gray-600"}>
                  By clicking Continue, you agree to our
                  <br />
                  <Link
                    href="/legal/terms-of-service"
                    target={"_blank"}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/legal/privacy-policy"
                    target={"_blank"}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </>
            )}

          {/*Organisation required data*/}
          {createMembershipState.status === ServerActionStatus.Pending &&
            step === 2 && (
              <div className="grid grid-cols-2 gap-2 duration-300 animate-in slide-in-from-right-12">
                <div className={"col-span-2"}>
                  <FormField
                    control={form.control}
                    name="socialSecurityNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Security Number</FormLabel>
                        <FormControl>
                          <Input placeholder="LBRMTT..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={"col-span-2 mt-4"}>
                  <div className={"rounded-2xl border-2 border-blue-200 p-3"}>
                    <FormField
                      control={form.control}
                      name="statuteApproval"
                      render={({ field }) => (
                        <FormItem>
                          <div className={"flex"}>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className={"ml-2"}>
                              <p className={"text-sm font-semibold"}>Statute</p>
                              <p className={"text-sm"}>
                                I've read and approved{" "}
                                <Link
                                  target="_blank"
                                  className={"underline"}
                                  href={"/documents/legal/statute"}
                                >
                                  the statute
                                </Link>
                              </p>
                              <FormMessage />
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className={"col-span-2 pt-3"}>
                  <div className={"flex flex-row-reverse"}>
                    <Button onClick={validateStep2}>Continue</Button>
                  </div>
                </div>
              </div>
            )}

          {/*Membership level*/}
          {createMembershipState.status === ServerActionStatus.Pending &&
            step === 3 && (
              <div className="grid grid-cols-1 duration-300 animate-in slide-in-from-right-12">
                <FormField
                  control={form.control}
                  name="membershipTemplateId"
                  render={({ field }) => (
                    <>
                      <Input type={"hidden"} {...field} />
                      <ScrollArea className="-ml-[58px] w-[436px] p-2">
                        <div className="mb-2 flex w-max space-x-4">
                          {membershipTemplates.map((membershipTemplate) => (
                            <div
                              onClick={() => {
                                form.setValue(
                                  "membershipTemplateId",
                                  membershipTemplate.id,
                                  {
                                    shouldTouch: true,
                                    shouldDirty: true,
                                  },
                                )
                              }}
                            >
                              <MembershipTemplateCard
                                className={
                                  form.getValues("membershipTemplateId") ===
                                  membershipTemplate.id
                                    ? "cursor-pointer border-blue-500"
                                    : "cursor-pointer"
                                }
                                key={membershipTemplate.id}
                                title={membershipTemplate.title}
                                features={membershipTemplate.features}
                                price={{
                                  period: membershipTemplate.pricePeriod,
                                  unit: membershipTemplate.priceUnit,
                                  value: membershipTemplate.priceAmount,
                                }}
                                description={membershipTemplate.description}
                              />
                            </div>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </>
                  )}
                />

                <div className={"col-span-2 mt-8"}>
                  <div className={"flex flex-row-reverse"}>
                    <StatefulButton>Subscribe</StatefulButton>
                  </div>
                </div>
                <p className={"mt-4 text-center text-xs text-gray-600"}>
                  By clicking Subscribe, you will proceed to payment.
                  <br />
                  Payment is processed through our partner Stripe
                </p>
              </div>
            )}

          {/*Payment*/}
          {createMembershipState.nextStep === "providePayment" &&
            step !== 5 && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: (createMembershipState?.payload as any)
                    ?.clientSecret,
                }}
              >
                <Step4 state={createMembershipState} setStep={setStep} />
              </Elements>
            )}

          {/*Success*/}
          {step === 5 && (
            <div className="grid grid-cols-1 justify-items-center">
              <Image
                src={checkmark}
                alt={"Success"}
                width={128}
                height={128}
                className={"duration-500 animate-in zoom-in"}
              />
              <p className={"my-4 text-2xl font-semibold"}>Welcome aboard!</p>
              <p className={"text-md text-gray-800"}>
                Admins will review your application and let know your membership
                number in the following days.
              </p>
            </div>
          )}
        </Form>
      </form>
    </div>
  )
}

interface Step4Props {
  state: ServerActionState
  setStep: Dispatch<SetStateAction<number>>
}

function Step4({ state, setStep }: Step4Props) {
  const stripe = useStripe()
  const elements = useElements()

  const handlePaymentSubmit = async () => {
    await elements?.submit()
    const confirmPayment = await stripe?.confirmPayment({
      clientSecret: (state?.payload as any)?.clientSecret,
      elements: elements!,
      redirect: "if_required",
    })
    console.log(confirmPayment)
    if ((confirmPayment?.paymentIntent as any)?.status === "succeeded") {
      setStep(5)
    }
  }

  return (
    <div className="flex flex-col duration-300 animate-in slide-in-from-right-12">
      <p className={"text-md mb-5 text-gray-800"}>
        Provide your payment informations to complete your membership
        subscription
      </p>

      <div>
        <PaymentElement />
      </div>

      <div className={"col-span-2 pt-3"}>
        <div className={"flex flex-row-reverse"}>
          <Button onClick={() => handlePaymentSubmit()}>Next</Button>
        </div>
      </div>
    </div>
  )
}

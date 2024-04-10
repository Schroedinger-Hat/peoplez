'use client'

import {useFormState, useFormStatus} from "react-dom";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {StatefulButton} from "@/components/molecules/statefulButton";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {type ServerActionState, validateUserEmail} from "@/app/actions/validateUserEmail";
import {signIn} from "next-auth/react";

export default function MembershipPortalLoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    const [working, setWorking] = useState<boolean>(false)
    const [requestedMagicLink, setRequestedMagicLink] = useState<boolean>(false)
    const [validateUserEmailState, validateUserEmailAction] = useFormState(validateUserEmail, {
        valid: false,
        checked: false
    });

    useEffect(() => {
        const handler = async () => {
            if (!requestedMagicLink && validateUserEmailState.valid) {
                setWorking(true)
                const reply = await signIn('email', {
                    email: validateUserEmailState.email,
                    redirect: false
                })
                console.log(reply)
                setRequestedMagicLink(true)
                setWorking(false)
            }
        };

        void handler()
    }, [requestedMagicLink, validateUserEmailState])

    return (
        <main className="flex h-screen items-center justify-center bg-zinc-900">
            <div>
                <form action={form.handleSubmit(validateUserEmailAction)}>
                    <LoginForm form={form}
                               state={validateUserEmailState} working={working} requestedMagicLink={requestedMagicLink}
                    />
                </form>
            </div>
        </main>
    );
}


const formSchema = z.object({
    email: z.string().email(),
});

// TODO: Too much props drilling, refactor to shared zustand state
interface LoginFormProps {
    form: unknown
    state: ServerActionState
    working: boolean
    requestedMagicLink: boolean
}

function LoginForm({form, state, working, requestedMagicLink}: LoginFormProps) {
    const formStatus = useFormStatus();

    return (
        <Form {...form}>
            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below, we're going to send you a magic link
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {
                        (state?.checked && state?.valid === false) && <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4"/>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                This email doesn't have an account.
                                <br/>You can create one by <Link href={'/signup'} className={'underline'}>requesting a
                                membership</Link>
                            </AlertDescription>
                        </Alert>
                    }

                    {
                        requestedMagicLink && <Alert variant="positive">
                            <ExclamationTriangleIcon className="h-4 w-4"/>
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>

                                We've sent you a "magic link" via email.
                                <br/>Please check your inbox (or spam folder) and click on the link to proceed.
                            </AlertDescription>
                        </Alert>
                    }

                    {
                        !requestedMagicLink && <>
                            <div className="grid">
                                <FormField
                                    control={form?.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={"email"}
                                                    placeholder="john@doe.com"
                                                    // The following two attributes disables password manager on this input
                                                    autoComplete={'new-password'}
                                                    id={'search-address'}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <StatefulButton className="w-full" type="submit" loading={formStatus.pending || working}>
                                Sign in
                            </StatefulButton>
                        </>
                    }
                </CardContent>
            </Card>
        </Form>
    );
}
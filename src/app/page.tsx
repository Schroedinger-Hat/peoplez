'use client'
import {useFormStatus, useFormState} from 'react-dom'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {sendMagicLink} from "@/app/actions/sendMagicLink";
import {DebugDisplay} from "@/components/debug/display";

export default function HomePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    const [state, formAction] = useFormState(sendMagicLink, {})

    return (
        <main className="h-screen flex justify-center items-center bg-zinc-900">
            <div>
                <form action={form.handleSubmit(formAction)}>
                    <LoginForm form={form} state={state}/>
                </form>
            </div>
        </main>
    );
}

const formSchema = z.object({
    email: z
        .string()
        .email(),
})

export function LoginForm({form,state}) {
    const formStatus = useFormStatus()

    return (
        <Form {...form}>
            <DebugDisplay title={'formStatus'}>{formStatus}</DebugDisplay>
            <DebugDisplay title={'state'}>{state}</DebugDisplay>
            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below, we're going to send you a magic link
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type={'email'} placeholder="john@doe.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">Sign in</Button>
                </CardFooter>
            </Card>
        </Form>
    )
}
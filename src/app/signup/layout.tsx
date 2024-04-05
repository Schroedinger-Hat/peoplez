import Image from "next/image"
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import logoWhite from '@/images/logo-white.svg'

export default function SignUpLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full">
            <div className="md:hidden">
                <Image
                    src="/examples/authentication-light.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/authentication-dark.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block"
                />
            </div>
            <div className="container relative hidden h-dvh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href={process.env.MARKETING_WEBSITE_URL!}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Back
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                       <Image src={logoWhite} alt={'logo'} width={42} className={'mr-3'}/>
                        {process.env.MARKETING_NAME}
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Un socio é un pó come un amico.&rdquo;
                            </p>
                            <footer className="text-sm">Il Presidente</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
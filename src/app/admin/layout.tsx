import {getServerAuthSession} from "@/server/auth";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {LogoutButton} from "@/app/admin/@authenticated/components/logout";
import logo from "@/images/logo.svg";
import Image from "next/image";

function usernameToInitials(username: string) {
    return username.split(' ').filter(Boolean).slice(0, 2).map((word: string) => word[0]).join('').toUpperCase()
}

const mainMenu = [
    {url: '/memberships', label: 'Memberships'},
    {url: '/users', label: 'Users'},
    {url: '/settings', label: 'Settings'},
]

export default async function Layout({
                                         children,
                                         authenticated,
                                         unauthenticated,
                                     }: {
    children: React.ReactNode;
    authenticated: React.ReactNode;
    unauthenticated: React.ReactNode;
}) {
    const session = await getServerAuthSession()
    const isLoggedIn = session !== null

    return isLoggedIn
        ? (
            <div className="flex min-h-screen w-full flex-col">
                {/*Navigation*/}
                <header
                    className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
                    <div className={'flex gap-1 items-center'}>
                        <Image src={logo} alt={'logo'} width={36} className={'mr-3'}/>
                        <span className="test-sm font-semibold">Schroedinger Hat</span>
                    </div>
                    <nav
                        className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        >

                        </Link>
                        {
                            mainMenu.map(mainMenuItem => (
                                <Link href={mainMenuItem.url}
                                      className="text-muted-foreground transition-colors hover:text-foreground">
                                    {mainMenuItem.label}
                                </Link>
                            ))
                        }
                    </nav>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Image src={logo} alt={'logo'} width={42} className={'mr-3'}/>
                                    <span className="sr-only">Schroedinger Hat</span>
                                </Link>
                                {
                                    mainMenu.map(mainMenuItem => (
                                        <Link href={mainMenuItem.url}
                                              className="text-muted-foreground hover:text-foreground">
                                            {mainMenuItem.label}
                                        </Link>
                                    ))
                                }
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    {usernameToInitials(session.user.name || '')}
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <Link href={'/documents/help'}>
                                    <DropdownMenuItem>
                                        Support
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                    <LogoutButton/>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/*Body*/}
                <main
                    className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                    {authenticated}
                </main>
            </div>
        )
        : (
            <main className="h-screen flex justify-center items-center bg-zinc-900">
                {unauthenticated}
            </main>
        )
}
import { UserRole } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

import { Logout } from "@/app/admin/@unauthenticated/components/logout"
import { adminMenuTreeConfig } from "@/app/admin/const"
import { LogoutButton } from "@/components/molecules/logoutButton"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import logo from "@/images/logo.svg"
import { hasRequiredRole } from "@/lib/permissions"
import { usernameToInitials } from "@/lib/utils"
import { getServerAuthSession } from "@/server/auth"

interface LayoutInterface {
  children: React.ReactNode
  authenticated: React.ReactNode
  unauthenticated: React.ReactNode
}

export default async function Layout({
  authenticated,
  unauthenticated,
}: LayoutInterface) {
  const session = await getServerAuthSession()
  const isLoggedIn = session !== null

  if (!isLoggedIn) {
    return (
      <main className="flex h-screen items-center justify-center bg-zinc-900">
        {unauthenticated}
      </main>
    )
  }

  if (!hasRequiredRole(UserRole.admin, session)) {
    return (
      <main className="flex h-screen items-center justify-center bg-zinc-900">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Unauthorized</CardTitle>
            <CardDescription>
              <p className={"text-md text-gray-800"}>
                Your account does not have the required permissions to access
                the admin portal.
              </p>
            </CardDescription>
          </CardHeader>
          <CardFooter className={"flex flex-col justify-center"}>
            <p className={"mb-2 text-xs font-light text-gray-600"}>
              You are currently logged as <b>{session.user.email}</b>
            </p>
            <Logout />
          </CardFooter>
        </Card>
      </main>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/*Navigation*/}
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/admin">
          <div className={"flex items-center gap-1"}>
            <Image src={logo} alt={"logo"} width={36} className={"mr-3"} />
            <span className="test-sm font-semibold">Schroedinger Hat</span>
          </div>
        </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          ></Link>
          {adminMenuTreeConfig.map((mainMenuItem) => (
            <Link
              href={mainMenuItem.url}
              key={mainMenuItem.id}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {mainMenuItem.label}
            </Link>
          ))}
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
                href="/admin"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Image src={logo} alt={"logo"} width={42} className={"mr-3"} />
                <span className="sr-only">Schroedinger Hat</span>
              </Link>
              {adminMenuTreeConfig.map((mainMenuItem) => (
                <Link
                  href={mainMenuItem.url}
                  key={mainMenuItem.id}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {mainMenuItem.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {usernameToInitials(session.user.name ?? "")}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <Link href={"/documents/help"}>
                <DropdownMenuItem>Support</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/*Body*/}
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {authenticated}
      </main>
    </div>
  )
}

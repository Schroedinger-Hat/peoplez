import {LinkWithActive} from "@/components/molecules/linkWithActive";
import {adminMenuTreeConfig} from "@/app/admin/const";
import {find} from "lodash";

interface AdminAuthenticatedLayoutInterface {
    children: React.ReactNode
}

export default async function AdminAuthenticatedLayout({children}: AdminAuthenticatedLayoutInterface) {
    const settingsChildren = find(adminMenuTreeConfig, {id: 'settings'})!

    return (
        <>
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
            <div
                className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    {
                        settingsChildren.children!.map((item) => <LinkWithActive key={item.id} href={item.url}>{item.label}</LinkWithActive>)
                    }
                </nav>
                <div className="grid gap-6">
                    {children}
                </div>
            </div>
        </>
    )
}


import {toPlainObject} from "lodash";
import Link from "next/link";

import {Debug} from "@/components/devtool/debug";
import {Button} from "@/components/ui/button";
import {getServerAuthSession} from "@/server/auth";

export async function DevPage() {
    const session = await getServerAuthSession()

    return (
        <div className={'p-4 bg-gray-200 h-dvh'}>
            <div className={'grid grid-cols-2 bg-gray-50 border-2 border-dashed p-8 rounded-xl'}>
                <div className={'grid gap-4 content-start'}>
                    <h1 className={'text-xl'}>Peoplez</h1>
                    <p className={'text-md text-gray-800'}>
                        This page is only displayed on dev environment, in production a landing page with some marketing
                        material will be displayed
                    </p>

                    <div className={'flex gap-2'}>
                        <Link href={'/signup'}><Button>SignUp</Button></Link>
                        <Link href={'/members'}><Button>Member Portal</Button></Link>
                        <Link href={'/admin'}><Button>Admin Portal</Button></Link>
                    </div>

                    <Debug title={'session'}>{session}</Debug>
                </div>

                <div className={'grid overflow-auto'}>
                    <Debug title={'process.env'}>{toPlainObject(process.env)}</Debug>
                </div>
            </div>
        </div>
    )
}




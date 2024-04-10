'use client'

import {usePathname} from "next/navigation";
import Link, {type LinkProps} from "next/link";
import {type ReactNode} from "react";

interface LinkWithActiveProps extends LinkProps{
    children: ReactNode
}
export function LinkWithActive(props: LinkWithActiveProps) {
    const currentPath = usePathname();

    if(currentPath === props.href) return <Link {...props} className={'font-semibold text-primary'}>{props.children}</Link>
    else return <Link {...props} className={''}>{props.children}</Link>
}
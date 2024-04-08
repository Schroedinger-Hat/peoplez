'use client'

import {usePathname} from "next/navigation";
import Link from "next/link";

// TODO: Add Types
export function LinkWithActive({children, ...props}: any) {
    const currentPath = usePathname();

    console.log(currentPath,props.href)
    return <Link {...props} className={currentPath === props.href ? 'font-semibold text-primary' : ''}>{children}</Link>
}
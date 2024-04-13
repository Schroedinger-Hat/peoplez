'use client'

import {useRouter} from 'next/navigation'
import {Dialog, DialogContent, DialogDescription, DialogHeader} from "@/components/ui/dialog";
import {noop} from "lodash";
import {useState} from "react";

interface ModalProps {
    children: React.ReactNode
    navigateOnClose?: boolean
}

export function Modal({children, navigateOnClose = true}: ModalProps) {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(true)

    const onOpenChange = () => {
        if (navigateOnClose) router.back()
        else setOpen(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            {children}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
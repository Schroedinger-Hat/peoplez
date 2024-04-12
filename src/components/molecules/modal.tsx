'use client'

import {useRouter} from 'next/navigation'
import {Dialog, DialogContent, DialogDescription, DialogHeader} from "@/components/ui/dialog";

export function Modal({children}: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <>
            <Dialog defaultOpen={true}>
                <DialogContent>
                    <DialogHeader>
                        <button
                            onClick={() => {
                                router.back()
                            }}
                        >
                            Close modal
                        </button>
                    </DialogHeader>
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
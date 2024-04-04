import {Inter} from "next/font/google";
import Image from "next/image";
import logo from "@/images/logo.svg";
import Link from "next/link";

export default function LegalLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <div className={'bg-zinc-900 py-4 px-8 flex items-center justify-between'}>
                <div className={'flex items-center'}>
                    <Image src={logo} alt={'logo'} width={42} className={'mr-4'}/>
                    <span className={'text-sm font-bold text-gray-200 inline'}>{process.env.MARKETING_NAME}</span>
                </div>
                <div>
                    <Link
                        href={'/'}
                        className={'text-sm text-gray-200 inline'}
                    >
                        Back
                    </Link>
                </div>
            </div>
            <div className="container lg:w-3/4 py-16 sm:px-8 md:px-8">
                {children}
            </div>
            <footer>

            </footer>
        </>
    );
}
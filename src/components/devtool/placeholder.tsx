import Image from "next/image";
import placeholder from '@/images/placeholder.svg'

interface PlaceholderInterface {
    w: number
    h: number
}

export function Placeholder({w, h}:PlaceholderInterface) {
    return <Image src={placeholder} alt={'placeholder'} width={w} height={h}/>
}
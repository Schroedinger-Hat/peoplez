interface GenericChildrenInterface {
    children: React.ReactNode
    props: React.PropsWithChildren
}

export function Paragraph({children}: GenericChildrenInterface) {
    return <p className={'font text-md text-gray-600'}>{children}</p>
}


interface SectionTitleInterface {
    title: string
    description: string,
    size?: SizeEnum
}

enum SizeEnum {
    small,
    default
}

export function SectionTitle({title, description, size = SizeEnum.default}: SectionTitleInterface) {
    return <div>
        {size === SizeEnum.small && <h3 className={'font-light text-md text-gray-800'}>{title}</h3>}
        {size === SizeEnum.default && <h3 className={'font-light text-xl text-gray-800'}>{title}</h3>}
        <Paragraph>{description}</Paragraph>
    </div>
}

export function LinkLabel({children}: GenericChildrenInterface) {
    return <span className={'underline underline-offset-2 font-semibold text-gray-400'}>{children}</span>
}
interface SectionTitleInterface {
    title: string
    description: string
}

export function SectionTitle({title, description}: SectionTitleInterface) {
    return <div>
        <h3 className={'font-light text-xl text-gray-800'}>{title}</h3>
        <p className={'font text-sm text-gray-600'}>{description}</p>
    </div>
}
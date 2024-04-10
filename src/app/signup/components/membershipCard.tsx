import {Card, CardContent} from "@/components/ui/card";

interface Price {
    value: number
    period: PricePeriod
    unit: PriceUnit
}

export enum PriceUnit {
    Eur = "EUR",
    Usd = "USD",
}

export enum PricePeriod {
    Monthly = 'month',
    Yearly = 'year'
}

interface Membership {
    showPrice?: boolean
    title: string
    features: string[]
    description?: string
    price: Price
}


export function MembershipCard({title, features, description, price, showPrice = true}: Membership) {
    let moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.unit,
        minimumFractionDigits: 0,
    });

    return <Card>
        <CardContent className={'p-6'}>
            <div className="flex justify-between items-start mb-4">
                <h4 className={'text-lg font-semibold'}>{title}</h4>
                {
                    showPrice &&
                    <span className={'font-bold bg-gray-200 px-3 py-2 rounded-md'}>
                        {moneyFormatter.format(price.value / 100)}<sub>/{price.period}</sub>
                    </span>
                }
            </div>
            {
                features.length && <ul className={'list-disc pl-3'}>{features.map((feature, index) => <li key={index}
                                                                                                          className={'text-sm text-gray-800'}>{feature}</li>)}</ul>
            }
            {
                description && <p className={'mt-4 font-light text-sm italic'}>{description}</p>
            }
        </CardContent>
    </Card>
}
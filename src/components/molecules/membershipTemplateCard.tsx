import { Card, CardContent } from "@/components/ui/card"
import { type PricePeriod, type PriceUnit } from "@prisma/client"
import { cn } from "@/lib/utils"

interface Price {
  value: number
  period: PricePeriod
  unit: PriceUnit
}

interface MembershipTemplateCardProps {
  className?: string
  showPrice?: boolean
  title: string
  features: string[]
  description: string | null
  price: Price
}

export function MembershipTemplateCard({
  className = "",
  title,
  features,
  description,
  price,
  showPrice = true,
}: MembershipTemplateCardProps) {
  const moneyFormatter = new Intl.NumberFormat("en-US", {
    currency: price.unit,
    minimumFractionDigits: 0,
    style: "currency",
  })

  return (
    <Card className={cn("w-[320px]", className)}>
      <CardContent className={"p-6"}>
        <div className="mb-4 flex items-start justify-between">
          <h4 className={"text-lg font-semibold"}>{title}</h4>
          {showPrice && (
            <span className={"rounded-md bg-gray-200 px-3 py-2 font-bold"}>
              {moneyFormatter.format(price.value / 100)}
              <sub>/{price.period}</sub>
            </span>
          )}
        </div>
        {features.length && (
          <ul className={"list-disc pl-3"}>
            {features.map((feature, index) => (
              <li key={index} className={"text-sm text-gray-800"}>
                {feature}
              </li>
            ))}
          </ul>
        )}
        {description && (
          <p className={"mt-4 text-sm font-light italic"}>{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

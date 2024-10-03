import { PricePeriod, PriceUnit } from "@prisma/client"

export const membershipTemplatesSeeds = [
  {
    title: "Cinema Club 2024 Membership",
    description:
      "Support the magic of cinema and join our mission to create a vibrant international community of movie lovers.",
    features: [
      "Join an exclusive community of film enthusiasts",
      "Early access to tickets for premieres and special screenings",
    ],
    priceAmount: 3000,
    pricePeriod: PricePeriod.Yearly,
    priceUnit: PriceUnit.EUR,
    stripePriceId: "price_123456789",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Cinema Club 2024 Premium",
    description:
      "Contribute to the celebration of cinematic art and be part of our effort to build a global network of individuals passionate about film.",
    features: [
      "Priority booking for new releases and exclusive content",
      "Enjoy a 10€ discount on every purchase at our cinema shops",
    ],
    priceAmount: 6000,
    pricePeriod: PricePeriod.Yearly,
    priceUnit: PriceUnit.EUR,
    stripePriceId: "price_987654321",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Cinema Club 2024 Elite",
    description:
      "Support leading-edge film presentations and help us foster a worldwide community that celebrates and enhances the cinematic experience.",
    features: [
      "Advanced access to workshops with filmmakers and special movie content",
      "Receive a 15€ discount on all merchandise and concession orders",
      "Exclusive invitations to members-only previews and gala events",
    ],
    priceAmount: 9000,
    pricePeriod: PricePeriod.Yearly,
    priceUnit: PriceUnit.EUR,
    stripePriceId: "price_483123255",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

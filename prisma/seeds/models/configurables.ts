import { ConfigurableType } from "@prisma/client"

export const configurablesSeeds = [
  {
    name: "org_name",
    type: ConfigurableType.STRING,
    value: "ACME Cinema.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "org_url",
    type: ConfigurableType.STRING,
    value: "https://example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

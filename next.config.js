import withMDX from "@next/mdx"

await import("./src/env.js")

const withMDXWrapper = withMDX()

/** @type {import("next").NextConfig} */
const config = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  eslint: {
    dirs: ["src", "prisma"],
  },
  experimental: {
    instrumentationHook: true,
  },
}

export default withMDXWrapper(config)

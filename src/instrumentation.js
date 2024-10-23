import { registerOTel } from "@vercel/otel"

export function register() {
  console.log("### Tracing started")
  registerOTel({
    serviceName: "peoplez",
  })
}

import { registerOTel } from "@vercel/otel"

export function register() {
  console.log("Tracing")
  registerOTel({
    serviceName: "peoplez",
  })
}

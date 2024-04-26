import pino, { Logger } from "pino";
import { env } from "@/env";

export function getLogger(name: string): Logger {
  return pino({ name, level: env.LOG_LEVEL });
}

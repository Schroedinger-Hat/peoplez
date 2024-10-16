import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function usernameToInitials(username: string) {
  return username
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
}

export function stringToBoolean(str: string): boolean {
  if (typeof str !== "string") {
    throw new Error("Input must be a string")
  }

  if (str.toLowerCase() === "true") {
    return true
  } else if (str.toLowerCase() === "false") {
    return false
  } else {
    throw new Error(`Invalid input: "${str}". Expected "true" or "false".`)
  }
}

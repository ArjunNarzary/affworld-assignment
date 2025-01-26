import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const getFirstTwoChars = (str: string | undefined) => {
  if (!str) return "0"
  return (str[0] || "" + str[1] || "").toUpperCase()
}

export const formatDate = (utcDateString: string) => {
  const options = {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Enables am/pm format
  } as const

  const localDate = new Date(utcDateString)
  return new Intl.DateTimeFormat("en-US", options).format(localDate)
}

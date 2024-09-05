import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const customErrorResponse = (
  message: string,
  statusCode?: number,
  statusText?: string
) =>
  new Response(
    JSON.stringify({
      message,
    }),

    {
      status: statusCode ?? 400,
      statusText: statusText ?? message,
    }
  );

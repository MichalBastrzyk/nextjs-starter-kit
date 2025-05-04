//
// CREDITS: https://x.com/dillionverma/status/1917639091228926311
//
// This fixes the issue with auto-imports collding with next.js and shadcn/ui module.

declare module "lucide-react" {
  export * from "lucide-react/dist/lucide-react.suffixed"
}

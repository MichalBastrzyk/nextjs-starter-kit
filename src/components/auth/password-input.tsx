"use client"

import * as React from "react"

import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export function PasswordInput({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible((prev) => !prev)

  return (
    <div className="relative">
      <Input
        placeholder="Password"
        className={cn("pe-9", className)}
        type={isVisible ? "text" : "password"}
        {...props}
      />
      <button
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none transition-[color,box-shadow] focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <EyeOffIcon size={16} aria-hidden="true" />
        ) : (
          <EyeIcon size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 md:py-8", {
  variants: {
    variant: {
      default: "container",
      sidebar: "px-6",
      centered: "container flex h-dvh max-w-2xl flex-col justify-center py-16",
      markdown: "container max-w-3xl py-8 md:py-10 lg:py-10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ShellProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

export function Shell({
  className,
  as: Comp = "section",
  variant,
  ...props
}: ShellProps) {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  )
}

interface ShellHeadingProps extends React.ComponentProps<"div"> {
  as?: React.ElementType
}

export function ShellHeading({
  className,
  as: Comp = "div",
  ...props
}: ShellHeadingProps) {
  return <Comp className={cn("space-y-2", className)} {...props} />
}

interface ShellTitleProps extends React.ComponentProps<"h1"> {
  as?: React.ElementType
}

export function ShellTitle({
  className,
  as: Comp = "h1",
  ...props
}: ShellTitleProps) {
  return (
    <Comp
      className={cn("text-3xl font-bold tracking-tight", className)}
      {...props}
    />
  )
}

interface ShellDescriptionProps extends React.ComponentProps<"p"> {
  as?: React.ElementType
}

export function ShellDescription({
  className,
  as: Comp = "p",
  ...props
}: ShellDescriptionProps) {
  return <Comp className={cn("text-muted-foreground", className)} {...props} />
}

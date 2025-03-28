import { and, gte, lte, type AnyColumn } from "drizzle-orm"

export function dateRange(input: number[], column: AnyColumn) {
  return and(
    input[0]
      ? gte(
          column,
          (() => {
            const date = new Date(input[0])
            date.setHours(0, 0, 0, 0)
            return date
          })()
        )
      : undefined,
    input[1]
      ? lte(
          column,
          (() => {
            const date = new Date(input[1])
            date.setHours(23, 59, 59, 999)
            return date
          })()
        )
      : undefined
  )
}

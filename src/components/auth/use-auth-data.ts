import * as React from "react"

import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"

/**
 * A minimal hook that fetches data from the database and returns the data and the status of the fetch.
 * Simpler alternative to `useQuery` from `tanstack/react-query`.
 * @param queryFn - A function that returns a promise of the data and the error.
 * @returns The data and the status of the fetch.
 */
export function useAuthData<T>({
  queryFn,
}: {
  queryFn: () => Promise<{ data: T | null; error?: Error | null }>
}) {
  const { data: sessionData, isPending: sessionPending } =
    authClient.useSession()

  const [data, setData] = React.useState<T | null>(null)
  const [isPending, setIsPending] = React.useState(true)
  const initialized = React.useRef(false)

  const refetch = React.useCallback(async () => {
    const { data, error } = await queryFn()

    if (error) toast.error(error.message)

    setData(data)
    setIsPending(false)
  }, [queryFn])

  React.useEffect(() => {
    if (!sessionData) {
      setIsPending(sessionPending)
      setData(null)
      initialized.current = false
      return
    }

    if (initialized.current) return

    initialized.current = true
    void refetch()
  }, [refetch, sessionData, sessionPending])

  return {
    data,
    isPending,
    refetch,
  }
}

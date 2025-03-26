import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Shell } from "@/components/shell"

export default function Home() {
  return (
    <Shell>
      <ol>
        <li>
          <Button variant="link" asChild>
            <Link href="/server-action-example">
              Partial Prerendering with Server Action Example
            </Link>
          </Button>
        </li>
      </ol>
    </Shell>
  )
}

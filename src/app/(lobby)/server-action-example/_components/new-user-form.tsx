"use client"

import { useTransition } from "react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { addUser } from "./actions"

export function NewUserForm() {
  const [isPending, startTransition] = useTransition()

  // Client-side form submission handler
  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addUser(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("User added successfully")

        // Clear form fields
        const form = document.querySelector("form") as HTMLFormElement
        form?.reset()
      }
    })
  }

  return (
    <form action={handleSubmit}>
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">Add User</h1>
        <Input type="text" name="name" placeholder="Name" required />
        <Input type="number" name="age" placeholder="Age" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add User"}
        </Button>
      </div>
    </form>
  )
}

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useAddTaskMutation } from "@/services"
import { toast } from "@/hooks/use-toast"
import { APIError } from "@/interfaces"

export default function NewTaskDialog() {
  const [addTask, { isLoading }] = useAddTaskMutation()
  const [error, setError] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const { name, description } = Object.fromEntries(formData)
    if (typeof name !== "string" || typeof description !== "string" || !name) {
      setError(true)
      return false
    }

    try {
      await addTask({ name, description }).unwrap()
      setError(false)
      form.reset()
      setIsDialogOpen(false)
    } catch (error: unknown) {
      const apiError = error as APIError
      toast({
        variant: "destructive",
        title: "Error",
        description: apiError?.data?.message || "Something went wrong",
      })
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsDialogOpen(true)}
      >
        ＋ Add New Task
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            What do you want to get done today?
          </DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4">
              <Input
                id="name"
                name="name"
                placeholder="Task name..."
                className={cn("w-full", {
                  " border-red-500": error,
                })}
              />
              {error && (
                <p className="w-full text-red-500 text-sm">
                  Please enter a task name.
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea
              id="description"
              name="description"
              placeholder="Description..."
              className="col-span-4"
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" size="sm" form="todo-form" disabled={isLoading}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

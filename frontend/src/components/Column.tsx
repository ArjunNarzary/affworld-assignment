import { useDroppable } from "@dnd-kit/core"
import { ITaskStatus } from "@/interfaces"
import Task from "./Task"
import { useMemo } from "react"
import { selectTasks } from "@/services/task/taskSlice"
import { useSelector } from "react-redux"

export default function Column({
  title,
  status,
  onDeleteClick,
}: {
  title: string
  status: ITaskStatus
  onDeleteClick: (id: string) => void
}) {
  const { setNodeRef } = useDroppable({ id: status })
  const tasks = useSelector(selectTasks)
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  )

  return (
    <section className="h-[600px] flex-1">
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>

      <div className="mt-3.5 h-full w-full rounded-xl bg-gray-700/50 p-4">
        <div className="flex flex-col gap-4 h-full" ref={setNodeRef}>
          {filteredTasks.map((task) => (
            <Task key={task._id} {...task} onDeleteClick={onDeleteClick} />
          ))}

          {filteredTasks.length === 0 && status === "TODO" && (
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Create a new task</p>
            </div>
          )}

          {tasks.length && filteredTasks.length === 0 && status !== "TODO" ? (
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Drag your tasks here</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

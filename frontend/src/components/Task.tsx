import { useDraggable } from "@dnd-kit/core"
import { ITaskStatus } from "@/interfaces"
import { cn } from "@/lib/utils"
import { Trash2Icon } from "lucide-react"

export default function Task({
  _id,
  name,
  description,
  status,
  onDeleteClick,
}: {
  _id: string
  name: string
  description?: string
  status: ITaskStatus
  onDeleteClick: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: _id,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      style={style}
      className={cn(
        "flex cursor-move items-start justify-between rounded-lg bg-white px-3 py-2 text-gray-900",
        {
          "border-2 border-sky-500": status === "TODO",
          "border-2 border-amber-500": status === "INPROGRESS",
          "border-2 border-emerald-500": status === "DONE",
        }
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div>
        <h3 className="font-medium text-gray-700">{name}</h3>
        <p className="text-sm font-light text-gray-500">{description}</p>
      </div>

      <div className="flex justify-end items-center gap-2">
        <button className="cursor-pointer" onClick={() => onDeleteClick(_id)}>
          <Trash2Icon className="h-5 w-5 text-gray-500 hover:text-rose-400" />
        </button>
      </div>
    </div>
  )
}

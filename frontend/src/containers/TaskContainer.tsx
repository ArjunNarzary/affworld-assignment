import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { NewTaskDialog, AlertDialogBox } from "@/components"
import Column from "@/components/Column"
import { toast } from "@/hooks/use-toast"
import { APIError, ITask, ITaskStatus } from "@/interfaces"
import {
  useDeleteTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
} from "@/services"
import {
  selectTasks,
  setTask,
  updateTask as updateTaskStore,
} from "@/services/task/taskSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { COLUMNS } from "@/constants"

const TaskContainer = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasks)
  const { data: tasksResponse } = useGetAllTaskQuery()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const [showAlert, setShowAlert] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleSelection = (id: string) => {
    const task = tasks.find((task: ITask) => task._id === id)
    if (!task) return
    setSelectedTask(task)
    return true
  }

  const onDeleteClick = (id: string) => {
    if (handleSelection(id)) {
      setShowAlert(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedTask) return
    try {
      const deleteTaskResponse = await deleteTask(selectedTask._id)
      if (deleteTaskResponse?.data?.success) {
        setShowAlert(false)
        toast({
          variant: "default",
          title: "Success",
          description: "Task deleted successfully",
        })
      }
    } catch (error: unknown) {
      const apiError = error as APIError
      toast({
        variant: "destructive",
        title: "Error",
        description: apiError?.data?.message || "Something went wrong",
      })
    }
  }

  useEffect(() => {
    if (tasksResponse) {
      dispatch(setTask(tasksResponse))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksResponse])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as ITaskStatus

    const currentTask = tasks.find((task: ITask) => task._id === taskId)

    if (currentTask) {
      const newPayload = {
        ...currentTask,
        status: newStatus,
      }
      dispatch(updateTaskStore(newPayload))
      try {
        const response = await updateTask(newPayload).unwrap()
        if (response.success) {
          toast({
            variant: "default",
            title: "Success",
            description:
              response?.message || "Task status updated successfully",
          })
        }
      } catch (error: unknown) {
        const apiError = error as APIError
        toast({
          variant: "destructive",
          title: "Error",
          description: apiError?.data?.message || "Something went wrong",
        })
      }
    }
  }

  return (
    <div>
      <NewTaskDialog />
      <AlertDialogBox
        onCancel={() => setShowAlert(false)}
        open={showAlert}
        title="Are you sure?"
        onConfirm={handleDeleteConfirm}
        description="This action cannot be undone!"
      />
      <section className="mt-10 flex gap-6 lg:gap-12">
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              title={column.title}
              status={column.status}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </DndContext>
      </section>
    </div>
  )
}

export default TaskContainer

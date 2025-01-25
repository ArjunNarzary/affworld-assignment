import { ITask, ITaskResponse, ITasksInitialState } from "@/interfaces"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ITasksInitialState = {
  tasks: [],
}

const taskSlice = createSlice({
  name: "taskReducer",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<ITaskResponse>) => {
      const { tasks } = action.payload
      state.tasks = tasks
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const { _id } = action.payload
      const newTasks = state.tasks.map((task) => {
        if (task._id === _id) {
          return {
            ...task,
            ...action.payload,
          }
        } else {
          return task
        }
      })

      state.tasks = newTasks
    },
  },
})

export const { setTask, updateTask } = taskSlice.actions
export default taskSlice.reducer

export const selectTasks = createSelector(
  (state: { task: ITaskResponse }) => state.task.tasks,
  (value) => [...value]
)

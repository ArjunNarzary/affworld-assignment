// Users
export interface IUserData {
  name: string
  email: string
  createAt: string
  updatedAt: string
}

export interface IRegisterPayload {
  name: string
  email: string
  password: string
}

export interface ILoginPayload {
  email: string
  password: string
}

export interface IDefaultResponse {
  success: string
  message: string
}

export interface ILoginResponse extends IDefaultResponse {
  user: IUserData
  token: string
}

export interface IAuthInitailState {
  token: string | null
  user: IUserData | null
}

export interface APIError {
  data: {
    message: string
    success: boolean
  }
}

// Tasks
export type ITaskStatus = "TODO" | "INPROGRESS" | "DONE"

export interface ITask {
  _id: string
  name: string
  description?: string
  status: ITaskStatus
}

export interface ITasksInitialState {
  tasks: ITask[]
}

export interface ITaskResponse extends IDefaultResponse {
  tasks: ITask[]
}

export interface IAddTaskPayload {
  name: string
  description: string
}

export interface IUpdateTaskResponse extends IDefaultResponse {
  task: ITask
}

//Columns
export interface IColumnType {
  id: string
  title: string
  status: ITaskStatus
}

//Feeds

export interface IFeed {
  _id: string
  caption: string
  imgUrl: string
  user: {
    name: string
  }
  createdAt: string
}

export interface ICreateFeedPayload {
  caption: string
  image: File
}

export interface IGetFeedsPayload {
  skip: number
  limit: number
  date: Date | string | undefined
}

export interface IFeedsResponse extends IDefaultResponse {
  feeds: IFeed[]
}

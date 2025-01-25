import { IColumnType } from "@/interfaces"

export interface IFormField {
  id: string
  type: string
  label: string
  placeholder: string
  value: string
  error?: boolean
  errorMessage?: string
  required: boolean
}

export const registerFormFields: IFormField[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    value: "",
    required: true,
  },
  {
    id: "email",
    label: "Email Address",
    type: "text",
    placeholder: "Enter your email address",
    value: "",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    value: "",
    required: true,
  },
  {
    id: "confirm_password",
    label: "Confirm Password",
    type: "password",
    placeholder: "Re-enter your password",
    value: "",
    required: true,
  },
]

export const loginFormFields: IFormField[] = [
  {
    id: "email",
    label: "Email Address",
    type: "text",
    placeholder: "Enter your email address",
    value: "",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    value: "",
    required: true,
  },
]

export const COLUMNS: IColumnType[] = [
  {
    id: "todo",
    title: "To Do",
    status: "TODO",
  },
  {
    id: "inprogress",
    title: "In Progress",
    status: "INPROGRESS",
  },
  {
    id: "done",
    title: "Done",
    status: "DONE",
  },
]

import { InputForm } from "@/components"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loginFormFields } from "@/constants"
import { toast } from "@/hooks/use-toast"
import { APIError } from "@/interfaces"
import { isEmail } from "@/lib/utils"
import { AppPath } from "@/routes"
import { useLoginUserMutation } from "@/services"
import { setToken } from "@/services/auth/authSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router"

const LoginContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const [formFields, setFormFields] = useState(loginFormFields)

  const isValidData = () => {
    let isValid = true
    const newFormFields = formFields.map((field) => {
      if (field.required && !field.value.trim()) {
        field.error = true
        field.errorMessage = "This field is required"
        isValid = false
      } else if (field.id === "email" && !isEmail(field.value)) {
        field.error = true
        field.errorMessage = "Provide a valid email address"
        isValid = false
      } else {
        field.error = false
        field.errorMessage = ""
      }
      return field
    })
    setFormFields(newFormFields)
    return isValid
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidData()) return
    const payload = {
      email: formFields.find((field) => field.id === "email")?.value || "",
      password:
        formFields.find((field) => field.id === "password")?.value || "",
    }
    try {
      const response = await loginUser(payload).unwrap()
      if (response.success) {
        dispatch(setToken(response))
        navigate(AppPath.tasks)
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

  return (
    <section className="flex justify-center items-center h-[100vh] w-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            {formFields.map((field) => (
              <InputForm key={field.id} setFields={setFormFields} {...field} />
            ))}
            <div className="flex justify-center items-center">
              <Button
                className="px-6 w-full"
                onClick={handleLogin}
                disabled={isLoading}
              >
                Login
              </Button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-4">
            <Button variant="outline" className="px-6 w-full">
              Login with Google
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <hr className="h-[1px] bg-black w-[40%]"></hr>
            or
            <hr className="h-[1px] bg-black w-[40%]"></hr>
          </div>
          <div className="flex justify-center w-full items-center">
            <NavLink className="text-blue-800" to={AppPath.register}>
              Create new account
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default LoginContainer

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { registerFormFields } from "@/constants"
import { AppPath } from "@/routes"
import { NavLink, useNavigate } from "react-router"
import { InputForm } from "@/components"
import { toast } from "@/hooks/use-toast"
import { isEmail } from "@/lib/utils"
import { useRegisterUserMutation } from "@/services"
import { APIError } from "@/interfaces"
import { useDispatch } from "react-redux"
import { setToken } from "@/services/auth/authSlice"

const RegisterContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const [formFields, setFormFields] = useState(registerFormFields)

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
      } else if (field.id === "password" && field.value.length < 8) {
        field.error = true
        field.errorMessage = "Password must be atleast 8 characters"
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

  const validatePasswordMatch = () => {
    let isValid = true
    const password = formFields.find((field) => field.id === "password")
    const confirmPassword = formFields.find(
      (field) => field.id === "confirm_password"
    )

    if (password?.value !== confirmPassword?.value) {
      setFormFields((prev) =>
        prev.map((field) => {
          if (field.id === "confirm_password") {
            field.error = true
            field.errorMessage = "Passwords do not match"
          } else {
            field.error = false
            field.errorMessage = ""
          }
          return field
        })
      )
      isValid = false
    }
    return isValid
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const isDataValid = isValidData()
    const isPasswordValid = validatePasswordMatch()
    if (!isDataValid || !isPasswordValid) return
    const payload = {
      name: formFields.find((field) => field.id === "name")?.value || "",
      email: formFields.find((field) => field.id === "email")?.value || "",
      password:
        formFields.find((field) => field.id === "password")?.value || "",
    }

    try {
      const response = await registerUser(payload).unwrap()
      if (response.success) {
        dispatch(setToken(response))
        navigate(AppPath.tasks)
      }
    } catch (error: unknown) {
      const apiError = error as APIError
      toast({
        variant: "destructive",
        title: "Register Failed!",
        description: apiError?.data?.message || "Something went wrong",
      })
    }
  }

  return (
    <section className="flex justify-center items-center h-[100vh] w-full">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            {formFields.map((field) => (
              <InputForm key={field.id} setFields={setFormFields} {...field} />
            ))}
            <div className="flex justify-center items-center">
              <Button
                className="px-6 w-full"
                onClick={handleRegister}
                disabled={isLoading}
              >
                Register
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
            <NavLink className="text-blue-800" to={AppPath.login}>
              Already have an account
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default RegisterContainer

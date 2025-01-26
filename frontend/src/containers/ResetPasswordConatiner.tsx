import { AlertDialogBox, InputForm } from "@/components"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { resetPasswordFormFields } from "@/constants"
import { toast } from "@/hooks/use-toast"
import { APIError } from "@/interfaces"
import { AppPath } from "@/routes"
import { useResetPasswordMutation } from "@/services"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"

const ResetPasswordContainer = () => {
  const navigate = useNavigate()
  const [searchPrams] = useSearchParams()
  const token = searchPrams.get("token")
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [formFields, setFormFields] = useState(resetPasswordFormFields)
  const [showAlert, setShowAlert] = useState(false)

  const isValidData = () => {
    let isValid = true
    const newFormFields = formFields.map((field) => {
      if (field.required && !field.value.trim()) {
        field.error = true
        field.errorMessage = "This field is required"
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const isDataValid = isValidData()
    const isPasswordValid = validatePasswordMatch()
    if (!isDataValid || !isPasswordValid) return
    const payload = {
      password:
        formFields.find((field) => field.id === "password")?.value || "",
      token: token as string,
    }

    try {
      const response = await resetPassword(payload).unwrap()
      if (response.success) {
        setShowAlert(true)
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
    <div className="flex justify-center items-center min-h-[100vh]">
      <AlertDialogBox
        open={showAlert}
        onCancel={() => setShowAlert(false)}
        onConfirm={() => navigate(AppPath.login, { replace: true })}
        title="Success"
        description="Password Reset Successfully"
        showCancel={false}
      />
      <Card className="w-[30rem]">
        <CardHeader className="text-center font-semibold">
          Reset Password
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            {formFields.map((field) => (
              <InputForm key={field.id} setFields={setFormFields} {...field} />
            ))}
            <div className="flex justify-center items-center">
              <Button
                className="w-full bg-darkBlue mt-4 text-lightGrey"
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default ResetPasswordContainer

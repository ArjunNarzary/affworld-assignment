import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { APIError } from "@/interfaces"
import { isEmail } from "@/lib/utils"
import { useForgetPasswordMutation } from "@/services"
import { useState } from "react"

const ForgotPasswordContainer = () => {
  const [handleForgetPassword, { isLoading }] = useForgetPasswordMutation()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter you email address")
      return
    }
    if (!isEmail(email)) {
      setError("Please enter valid email address")
      return
    }

    try {
      setEmail("")
      const response = await handleForgetPassword({ email }).unwrap()
      console.log(response)
      if (response.success) {
        window.location.replace(response.redirectUrl)
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
    <div className="flex justify-center items-center min-h-[100vh]">
      <Card className="w-[30rem]">
        <CardHeader className="text-center font-semibold">
          Forgot Password
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Enter registered email address</Label>
              <Input
                id="name"
                placeholder="Email Address"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Button
              className="w-full bg-darkBlue mt-4 text-lightGrey"
              variant="outline"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPasswordContainer

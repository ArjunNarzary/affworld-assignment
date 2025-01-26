import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { AppPath } from "@/routes"
import { useGoogleLoginMutation } from "@/services"
import { setToken } from "@/services/auth/authSlice"
import { useGoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

const GoogleAuthButton = ({ title }: { title: string }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [googleLogin, { isLoading }] = useGoogleLoginMutation()
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const response = await googleLogin({ code }).unwrap()
      if (response.success) {
        dispatch(setToken(response))
        navigate(AppPath.tasks)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
        })
      }
    },
    flow: "auth-code",
  })
  return (
    <Button
      variant="outline"
      className="px-6 w-full"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      {title}
    </Button>
  )
}

export default GoogleAuthButton

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AppPath } from "@/routes"
import { NavLink } from "react-router"

const LoginContainer = () => {
  return (
    <section className="flex justify-center items-center h-[100vh] w-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div>
              <label>Username</label>
              <Input />
            </div>
            <div>
              <label>Password</label>
              <Input type="password" />
            </div>
            <div className="flex justify-center items-center">
              <Button className="px-6 w-full">Login</Button>
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

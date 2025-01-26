import { formatDate, getFirstTwoChars } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface IFeedProps {
  caption: string
  user: {
    name: string
  }
  imgUrl: string
  createdAt: string
}

const Feed = ({ caption, imgUrl, createdAt, user }: IFeedProps) => {
  return (
    <Card className="w-[40rem]">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-row items-center gap-3">
          <div className="bg-redPurple h-10 w-10 rounded-full flex justify-center items-center">
            <span className="text-lightGrey font-semibold">
              {getFirstTwoChars(user?.name)}
            </span>
          </div>
          <CardTitle>{user.name}</CardTitle>
        </div>
        <CardTitle>{formatDate(createdAt)}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={imgUrl}
          alt="post"
          className="w-full max-h-[25rem] object-scale-down"
        />
      </CardContent>
      <CardFooter className="break-all">{caption}</CardFooter>
    </Card>
  )
}

export default Feed

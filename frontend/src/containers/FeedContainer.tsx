import Feed from "@/components/Feed"
import { IFeed } from "@/interfaces"
import { useGetAllFeedsQuery } from "@/services"
import { useEffect, useState } from "react"
import NewFeedDialog from "./NewFeedDialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

const FeedContainer = () => {
  const [allFeeds, setAllFeeds] = useState<IFeed[]>([])
  const { data: feedsResponse, isLoading } = useGetAllFeedsQuery()

  useEffect(() => {
    if (feedsResponse?.feeds) {
      setAllFeeds(feedsResponse?.feeds)
    }
  }, [feedsResponse])
  return (
    <main>
      <NewFeedDialog />
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="mt-4 flex justify-center flex-col gap-3 items-center">
          {allFeeds.map((feed) => (
            <Feed key={feed._id} {...feed} />
          ))}
        </div>
      )}
    </main>
  )
}

const LoadingSkeleton = () => {
  return (
    <div className="mt-4 flex justify-center flex-col gap-3 items-center">
      <Card className="w-[40rem] p-5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <Skeleton className="w-full h-[25rem]" />
        <Skeleton className="h-6 w-full" />
      </Card>

      <Card className="w-[40rem] p-5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <Skeleton className="w-full h-[25rem]" />
        <Skeleton className="h-6 w-full" />
      </Card>

      <Card className="w-[40rem] p-5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <Skeleton className="w-full h-[25rem]" />
        <Skeleton className="h-6 w-full" />
      </Card>
    </div>
  )
}

// <Card className="w-[40rem]">
//   <CardHeader className="flex flex-row items-center justify-between gap-3">
//     <div className="flex flex-row items-center gap-3">
//       <div className="bg-redPurple h-10 w-10 rounded-full flex justify-center items-center">
//         <span className="text-lightGrey font-semibold">
//           {getFirstTwoChars(user?.name)}
//         </span>
//       </div>
//       <CardTitle>{user.name}</CardTitle>
//     </div>
//     <CardTitle>{formatDate(createdAt)}</CardTitle>
//   </CardHeader>
//   <CardContent>
//     <img
//       src={imgUrl}
//       alt="post"
//       className="w-full max-h-[25rem] object-scale-down"
//     />
//   </CardContent>
//   <CardFooter className="break-all">{caption}</CardFooter>
// </Card>

export default FeedContainer

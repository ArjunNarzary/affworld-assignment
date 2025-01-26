import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { APIError } from "@/interfaces"
import { useCreateFeedMutation } from "@/services"

const NewFeedDialog = () => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [createFeed, { isLoading }] = useCreateFeedMutation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedFile(file)
      setSelectedImage(imageUrl)
    }
  }

  useEffect(() => {
    resetForm()
  }, [isDialogOpen])

  const handleChooseBtnClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  const resetForm = () => {
    handleRemoveImage()
    setCaption("")
  }

  const handleRemoveImage = () => {
    setSelectedImage("")
    setSelectedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an image",
      })
      return
    }
    const formData = new FormData()
    formData.append("image", selectedFile as File)
    formData.append("caption", caption)

    try {
      await createFeed(formData).unwrap()
      setIsDialogOpen(false)
      resetForm()
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setIsDialogOpen(true)}
        className="bg-redPurple text-lightGrey"
      >
        ＋ Add New Feed
      </Button>
      <DialogContent className="sm:max-w-[40rem]">
        <DialogHeader>
          <DialogTitle>Add New Feed</DialogTitle>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 flex flex-col gap-2 items-center justify-center">
              <ImageUploadPreview
                selectedImage={selectedImage}
                handleRemoveImage={handleRemoveImage}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <input
                  ref={inputFileRef}
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleChooseBtnClick}
                >
                  Choose Image
                </Button>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea
              id="caption"
              name="caption"
              placeholder="Add caption..."
              className="col-span-4"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" size="sm" form="todo-form" disabled={isLoading}>
            Add Feed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const ImageUploadPreview = ({
  selectedImage,
  handleRemoveImage,
}: {
  selectedImage: string | null
  handleRemoveImage: () => void
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Card className="w-[35rem]">
        <CardContent className="py-4">
          {selectedImage ? (
            <div className="relative w-full h-[20rem] rounded-md overflow-hidden border border-dashed border-gray-300">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="w-full h-[20rem] flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md text-gray-500">
              <p>No image selected</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default NewFeedDialog

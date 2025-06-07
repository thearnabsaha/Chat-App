import { BACKEND_URL } from "@/lib/config"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
interface Room {
    id: string;
    slug: string;
}
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const roomSlugSchema = z.object({
    roomSlug: z.string().length(6)
})
import { Input } from "@workspace/ui/components/input";
import toast, { Toaster } from "react-hot-toast";
const Rooms = () => {
    const roomSlugform = useForm<z.infer<typeof roomSlugSchema>>({
        resolver: zodResolver(roomSlugSchema),
        defaultValues: {
            roomSlug: "",
        },
    })
    const [roomData, setroomData] = useState<Room[]>([])
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${BACKEND_URL}/room/`, { headers: { Authorization: token } })
            .then((e) => {
                setroomData(e.data.room)
            })
            .catch((e) => console.log(e))
    }, [])
    const joinHandler = (slug: string) => {
        localStorage.setItem("roomId", slug)
        router.push(`/room/${slug}`)
    }
    return (
        <div className=" overflow-auto w-full">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {
                roomData.length ? roomData.map((e) => {
                    function onSubmit(values: z.infer<typeof roomSlugSchema>) {
                        if (values.roomSlug === e.slug) {
                            console.log("deleted")
                            toast.success("Room Deleted")
                        } else {
                            toast.error("Wrong Room ID")
                        }
                    }
                    return (
                        <div key={e.id}>
                            <div className="flex justify-between items-center p-5 lg:w-[32vw] w-full border mx-[1vw] my-5 rounded-md border-ring">
                                <h1 className="text-xl font-bold">Room No: {e.slug}</h1>
                                <div className="space-x-3">
                                    <Button className="bg-chart-2 text-white hover:bg-chart-4" onClick={() => joinHandler(e.slug)}>Join</Button>
                                    <Dialog>
                                        <DialogTrigger className="bg-destructive text-white hover:bg-destructive-foreground px-4 py-1.5 rounded-md cursor-pointer">
                                            Delete
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl text-center">Are you sure to Delete Rooms</DialogTitle>
                                                <DialogDescription className="text-center">
                                                    This action cannot be undone. This will permanently delete your Room and remove your data from our servers.
                                                </DialogDescription>
                                                <Form {...roomSlugform}>
                                                    <form onSubmit={roomSlugform.handleSubmit(onSubmit)} className="space-y-2">
                                                        <FormField
                                                            control={roomSlugform.control}
                                                            name="roomSlug"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input placeholder="Room ID" {...field} />
                                                                    </FormControl>
                                                                    <FormDescription>
                                                                        Type "{e.slug}" to Confirm Delete Permanently
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <Button type="submit" className="bg-destructive text-white hover:bg-destructive-foreground w-full">Delete Permanently</Button>
                                                    </form>
                                                </Form>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <Button className="bg-chart-3 text-white hover:bg-chart-5">Rename</Button>
                                </div>
                            </div>
                        </div>
                    )
                }) : <div>
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                    <Skeleton className="p-8 w-[32vw] mx-[1vw] my-10 rounded-md bg-ring" />
                </div>
            }

        </div>
    )
}

export default Rooms
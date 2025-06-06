import { BACKEND_URL } from "@/lib/config"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton";
import axios from "axios"
import { useEffect, useState } from "react"
interface Room {
    id: string;
    slug: string;
    // Add other properties if needed
}
const Rooms = () => {
    const [roomData, setroomData] = useState<Room[]>([])
    useEffect(() => {
        const token = localStorage.getItem("token")
        const roomId = localStorage.getItem("roomId")
        axios.get(`${BACKEND_URL}/room/`, { headers: { Authorization: token } })
            .then((e) => {
                // setUser(e.data.message)
                setroomData(e.data.room)
                console.log(e.data.room)
            })
            .catch((e) => console.log(e))
    }, [])

    return (
        <div className=" overflow-auto">
            {
                roomData.length?roomData.map((e) => {
                    return (
                        <div key={e.id}>
                            <div className="flex justify-between items-center p-5 w-[38vw] border mx-[1vw] my-5 rounded-md border-ring">
                                <h1 className="text-xl font-bold">Room No: {e.slug}</h1>
                                <div className="space-x-3">
                                    <Button className="bg-destructive text-white hover:bg-destructive-foreground">Delete</Button>
                                    <Button className="bg-chart-2 text-white hover:bg-chart-4">Join</Button>
                                    <Button className="bg-chart-3 text-white hover:bg-chart-5">Rename</Button>
                                </div>
                            </div>
                        </div>
                    )
                }):<div>
                    <Skeleton className="p-8 w-[35vw] mx-[1vw] my-10 rounded-md bg-ring"/>
                    <Skeleton className="p-8 w-[35vw] mx-[1vw] my-10 rounded-md bg-ring"/>
                    <Skeleton className="p-8 w-[35vw] mx-[1vw] my-10 rounded-md bg-ring"/>
                    <Skeleton className="p-8 w-[35vw] mx-[1vw] my-10 rounded-md bg-ring"/>
                    <Skeleton className="p-8 w-[35vw] mx-[1vw] my-10 rounded-md bg-ring"/>
                    <Skeleton className="p-8 w-[35vw] mx-[1vw] my-10 rounded-md bg-ring"/>
                    <Skeleton className="p-8 w-[35vw] mx-[1vw] my-10 rounded-md bg-ring"/>
                    <Skeleton className="p-8 w-[35vw] mx-[1vw] my-10 rounded-md bg-ring"/>
                </div>
            }

        </div>
    )
}

export default Rooms
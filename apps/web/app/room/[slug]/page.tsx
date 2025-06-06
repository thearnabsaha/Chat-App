"use client"
import { useRoomStore } from "@/lib/store/roomStore"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

const Room = () => {
    const { room } = useRoomStore()
// {room?.RoomId}
    return (
        <div className="flex justify-center mt-10">
            <div className="w-[60vw] h-[70vh] border border-ring rounded-md">
                <div>
                    <h1>Real Time Chat</h1>
                    <p>This Room is Created by Arnab (@thearnabsaha)</p>
                </div>
                <div>
                    <h1>ROOM CODE: GH6GI7</h1>
                    <p>Users: 10/12</p>
                </div>
                <div>
                    <p>My msgs</p>
                    <p>Your msgs</p>
                    <p>Your msgs</p>
                    <p>My msgs</p>
                    <p>My msgs</p>
                    <p>Your msgs</p>
                </div>
                <div>
                    <Input placeholder="Type a Msssage here..."/>
                    <Button>Send</Button>
                </div>
            </div>
        </div>
    )
}

export default Room
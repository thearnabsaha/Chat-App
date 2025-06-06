"use client"
import { useRoomStore } from "@/lib/store/roomStore"

const Room = () => {
    const { room } = useRoomStore()

    return (
        <div>{room?.RoomId}</div>
    )
}

export default Room
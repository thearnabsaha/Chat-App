"use client"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useEffect, useState } from "react"
import { useParams, useRouter } from 'next/navigation';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@workspace/ui/components/form"
import { useUserStore } from "@/lib/store/userStore"
import { Skeleton } from "@workspace/ui/components/skeleton"
import axios from "axios"
import { BACKEND_URL } from "@/lib/config"
const inputSchema = z.object({
    msg: z.string().min(1),
})
const Room = () => {
    const router = useRouter();
    const { user } = useUserStore()
    const [roomId, setroomId] = useState<string|null>("")
    const InputForm = useForm<z.infer<typeof inputSchema>>({
        resolver: zodResolver(inputSchema),
        defaultValues: {
            msg: "",
        },
    })

    function onSubmit(values: z.infer<typeof inputSchema>) {
        const token = localStorage.getItem("token")
        const roomid = localStorage.getItem("roomId")
        axios.post(`${BACKEND_URL}/chat`, {slug:roomid,message:values.msg}, { headers: { Authorization: token } })
            .then((e) => {
                console.log(e)
            }).catch((e) => {
                console.log(e)
            })
        InputForm.reset()
    }
    const params=useParams()
    type Message = {
        id: string;
        userId: string;
        roomId: string;
        message: string;
    };
    const [message, setMessage] = useState<Message[]>([])
    const [userId, setUserId] = useState("")
    useEffect(() => {
        const roomid = localStorage.getItem("roomId")
        const token = localStorage.getItem("token")
        setroomId(roomid)
        if (!roomid) {
            router.push(`/dashboard`)
        }
        if (roomid!=params.slug) {
            router.push(`/dashboard`)
        }
        axios.get(`${BACKEND_URL}/chat/${roomid}`, { headers: { Authorization: token } })
            .then((e) => {
                setMessage(e.data.allchats)
            }).catch((e) => {
                console.log(e)
            })
        axios.get(`${BACKEND_URL}/me`, { headers: { Authorization: token } })
            .then((e) => {
                setUserId(e.data.message.id)
            }).catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <div className="flex justify-center sm:mt-10 mt-1 font-mono">
            <div className="lg:w-[60vw] border border-ring rounded-md md:p-10 p-5 w-full md:m-10 m-2 lg:m-0">
                <div>
                    {user?<h1 className="text-3xl font-bold pb-1">Real Time Chat</h1>:<Skeleton className=" w-96 h-10 mb-1 rounded-md"/>}
                    {user?<p className="font-bold text-ring pb-5">This Room is Created by <span className=" capitalize">{user.name}</span> (@{user.username})</p>:<Skeleton className=" w-[30vw] h-5 rounded-md mb-5"/>}
                </div>
                <div className="bg-accent flex justify-between px-10 py-5 rounded-md text-ring">
                    {roomId?<h1>ROOM CODE: {roomId}</h1>:<Skeleton className="w-40 h-5 bg-ring"/>}
                    <p>Users: 10/12</p>
                </div>
                <div className="border border-ring my-5 h-[40vh] rounded-md flex flex-col items-end overflow-auto py-5">
                    {
                        message.map((e)=>{
                            return(
                                <div key={e.id+e.userId+e.roomId+e.message} className="w-full flex flex-col items-end">
                                    {e.userId===userId?
                                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-primary text-secondary max-w-96">{e.message.charAt(0).toUpperCase() + e.message.slice(1)}</p>
                                    :<p className="py-2 px-5 rounded-lg mx-5 my-1 bg-accent self-start max-w-96">{e.message.charAt(0).toUpperCase() + e.message.slice(1)}</p>}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex">
                    <Form {...InputForm}>
                        <form onSubmit={InputForm.handleSubmit(onSubmit)} className="space-y-1 flex w-full justify-between">
                            <FormField
                                control={InputForm.control}
                                name="msg"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input  placeholder="Type a Msssage here..." className="border-ring lg:w-[45vw] md:w-[70vw] sm:w-full p-5"{...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="ml-5 p-5">Send</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Room
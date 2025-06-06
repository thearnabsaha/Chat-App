"use client"
import { useRoomStore } from "@/lib/store/roomStore"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useEffect } from "react"
import { useRouter } from 'next/navigation';
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
const inputSchema = z.object({
    msg: z.string().min(1),
})
const Room = () => {
    const router = useRouter();
    const { room } = useRoomStore()
    const InputForm = useForm<z.infer<typeof inputSchema>>({
        resolver: zodResolver(inputSchema),
        defaultValues: {
            msg: "",
        },
    })

    function onSubmit(values: z.infer<typeof inputSchema>) {
        console.log(values)
        InputForm.reset()
    }
    useEffect(() => {
        if (!room) {
            router.push(`/dashboard`)
        }
    }, [])
    return (
        <div className="flex justify-center mt-10 font-mono">
            <div className="w-[60vw] h-[72vh] border border-ring rounded-md p-10">
                <div>
                    <h1 className="text-3xl font-bold pb-1">Real Time Chat</h1>
                    <p className="font-bold text-ring pb-5">This Room is Created by Arnab (@thearnabsaha)</p>
                </div>
                <div className="bg-accent flex justify-between px-10 py-5 rounded-md text-ring">
                    <h1>ROOM CODE: {room?.RoomId}</h1>
                    <p>Users: 10/12</p>
                </div>
                <div className="border border-ring my-5 h-[40vh] rounded-md flex flex-col items-end overflow-auto py-5">
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-primary text-secondary max-w-96">My msgs</p>
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-accent self-start max-w-96">Your msgs</p>
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-accent self-start max-w-96">Your msgs</p>
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-primary text-secondary max-w-96">My msgs</p>
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-accent self-start max-w-96">Your msgs</p>
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-primary text-secondary max-w-96">My msgs Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi odio modi harum nam deleniti blanditiis assumenda doloribus perspiciatis reprehenderit numquam.</p>
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-accent self-start max-w-96">Your msgs</p>
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-accent self-start max-w-96">Your msgs Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat excepturi repellat eligendi quia molestias temporibus accusantium, non autem veniam praesentium.</p>
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-primary text-secondary max-w-96">My msgs</p>
                    <p className=" py-2 px-5 rounded-lg mx-5 my-1 bg-primary text-secondary max-w-96">My msgs</p>
                </div>
                <div className="flex">
                    <Form {...InputForm}>
                        <form onSubmit={InputForm.handleSubmit(onSubmit)} className="space-y-8 flex w-full justify-between">
                            <FormField
                                control={InputForm.control}
                                name="msg"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input  placeholder="Type a Msssage here..." className="border-ring w-[50vw]"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="ml-5">Send</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Room
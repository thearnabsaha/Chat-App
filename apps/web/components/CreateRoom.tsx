"use client"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useState } from "react";
import { GoCopy, GoCheck } from "react-icons/go";
const CreateRoom = () => {
    const [toggle, setToggle] = useState(false)
    const [open, setOpen] = useState(false)
    const copyHandler = () => {
        setToggle(true)
        setTimeout(() => {
            setToggle(false)
        }, 800);
    }
    const randomStringGenerator=()=>{
        const values="QWERTYUIOPASDFGHJKLZXCVBNM1234567890"
        let roomString=""
        for (let i = 0; i < 8; i++) {
            const x=Math.floor(Math.random()*36)
            roomString+=values[x]
        }
        console.log(roomString)
    }
    const createHandler=()=>{
        randomStringGenerator()
        setOpen(true)
    }
    return (
        <div className="w-[60vw] h-[54vh] rounded-lg mb-[1vh] bg-accent flex justify-center items-center">
            <div className="rounded-xl flex flex-col w-[600px] p-16 bg-card">
                <h1 className="text-3xl font-bold pb-1">Real Time Chat</h1>
                <p className=" font-bold text-ring pb-5">Make a Room that will be expired</p>
                <div className="flex">
                    <Input className="border border-ring mb-4" placeholder="Room No." />
                    <Button className="ml-4 text-md font-bold">Join Room</Button>
                </div>
                <Button className="font-bold text-md py-3" onClick={createHandler}>Create a New Room</Button>
                {open&&<div className="flex flex-col items-center mt-5 bg-accent p-5 rounded-lg">
                    <p>Share this code with your friend</p>
                    <div className="flex items-center justify-center">
                        <h1 className="text-3xl font-black pt-3">6TYW789</h1>
                        <div onClick={copyHandler}>
                            {
                                toggle ?
                                    <GoCheck className="text-5xl ml-3 translate-y-1 hover:bg-ring cursor-pointer w-10 h-10 p-2 rounded-lg" /> :
                                    <GoCopy className="text-5xl ml-3 translate-y-1 hover:bg-ring cursor-pointer w-10 h-10 p-2 rounded-lg" />
                            }
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default CreateRoom
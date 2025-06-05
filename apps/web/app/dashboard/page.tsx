"use client"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useState } from "react";
import { GoCopy,GoCheck } from "react-icons/go";
const Dashboard = () => {
    const [toggle, setToggle] = useState(false)
    const copyHandler=()=>{
        setToggle(true)
        setTimeout(() => {
            setToggle(false)
        }, 800);
    }
  return (
    <div className="flex my-[2vh] mx-[2vh]">
        <div className="border flex w-[40vw] h-[86vh] mx-[1vh] rounded-lg bg-accent">
            <h1>A</h1>
        </div>
        <div className=" flex flex-col mx-[1vh] rounded-lg font-mono">
            <div className="w-[60vw] h-[54vh] rounded-lg mb-[1vh] bg-accent flex justify-center items-center">
                <div className="rounded-xl flex flex-col w-[600px] p-16 bg-card">
                    <h1 className="text-3xl font-bold pb-1">Real Time Chat</h1>
                    <p className=" font-bold text-ring pb-5">Make a Temporary Room that will be expired</p>
                    <div className="flex">
                        <Input className="border border-ring mb-4" placeholder="Room No."/>
                        <Button className="ml-4 text-md font-bold">Join Room</Button>
                    </div>
                    <Button className="font-bold text-md py-3">Create a New Room</Button>
                    <div className="flex flex-col items-center mt-5 bg-accent p-5 rounded-lg">
                        <p>Share this code with your friend</p>
                        <div className="flex items-center justify-center">
                            <h1 className="text-3xl font-black pt-3">6TYW789</h1>
                            <div onClick={copyHandler}>
                            {
                                toggle?
                                <GoCheck className="text-5xl ml-3 translate-y-1 hover:bg-ring cursor-pointer w-10 h-10 p-2 rounded-lg"/>:
                                // <GoCheck className="text-5xl ml-3 translate-y-1 hover:bg-ring cursor-pointer w-10 h-10 p-2 rounded-lg" onClick={copyHandleer}/>:
                                <GoCopy className="text-5xl ml-3 translate-y-1 hover:bg-ring cursor-pointer w-10 h-10 p-2 rounded-lg"/>
                            }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[60vw] h-[30vh] rounded-lg mt-[1vh] bg-accent">
                <h1>C</h1>
            </div>
        </div>

    </div>
  )
}

export default Dashboard
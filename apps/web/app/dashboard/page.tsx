"use client"
import CreateRoom from "@/components/CreateRoom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
    const router=useRouter()
    useEffect(() => {
        const token=localStorage.getItem("token")
        if(!token){
            router.push("/signin")
        }
    }, [router])
    return (
        <div className="flex my-[2vh] mx-[2vh]">
            <div className="border flex w-[40vw] h-[86vh] mx-[1vh] rounded-lg bg-accent">
                <h1>A</h1>
            </div>
            <div className=" flex flex-col mx-[1vh] rounded-lg font-mono">
                <CreateRoom />
                <div className="w-[60vw] h-[30vh] rounded-lg mt-[1vh] bg-accent">
                    <h1>C</h1>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
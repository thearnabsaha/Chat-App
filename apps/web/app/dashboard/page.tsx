"use client"
import CreateRoom from "@/components/CreateRoom";
import Profile from "@/components/Profile";
import { BACKEND_URL } from "@/lib/config";
import { useUserStore } from "@/lib/store/userStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
    const router=useRouter()
    const { setUser } = useUserStore()
    useEffect(() => {
        const token=localStorage.getItem("token")
        if(!token){
            router.push("/signin")
        }
        axios.get(`${BACKEND_URL}/me`,{headers:{Authorization:token}})
        .then((e)=>{
            setUser(e.data.message)
        })
        .catch((e)=>console.log(e))
    }, [router])
    return (
        <div className="flex my-[2vh] mx-[2vh]">
            <div className="border flex w-[40vw] h-[86vh] mx-[1vh] rounded-lg bg-accent">
                <h1>A</h1>
            </div>
            <div className=" flex flex-col mx-[1vh] rounded-lg font-mono">
                <Profile/>
                <CreateRoom />
            </div>
        </div>
    )
}

export default Dashboard
"use client"
import CreateRoom from "@/components/CreateRoom";
import Profile from "@/components/Profile";
import Rooms from "@/components/Rooms";

const Dashboard = () => {
    return (
        <div className="flex my-[2vh] mx-[2vh]">
            <div className="border flex w-[40vw] h-[86vh] mx-[1vh] rounded-lg bg-accent">
                <Rooms/>
            </div>
            <div className=" flex flex-col mx-[1vh] rounded-lg font-mono">
                <Profile/>
                <CreateRoom />
            </div>
        </div>
    )
}

export default Dashboard
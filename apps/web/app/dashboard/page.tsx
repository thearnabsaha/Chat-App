"use client"
import CreateRoom from "@/components/CreateRoom";
import Profile from "@/components/Profile";
import Rooms from "@/components/Rooms";

const Dashboard = () => {
    return (
        <div className="flex my-[2vh] mx-[2vh] flex-col-reverse lg:flex-row ">
            <div className="border flex w-[40vw] h-[86vh] mx-[1vh] rounded-lg bg-accent mt-[2vh] lg:mt-0">
                <Rooms/>
            </div>
            <div className=" flex flex-col mx-[1vh] rounded-lg font-mono w-full">
                <Profile/>
                <CreateRoom />
            </div>
        </div>
    )
}

export default Dashboard
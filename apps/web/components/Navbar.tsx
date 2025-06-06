"use client"
import { BACKEND_URL } from "@/lib/config"
import { useRoomStore } from "@/lib/store/roomStore"
import { useUserStore } from "@/lib/store/userStore"
import { Button } from "@workspace/ui/components/button"
import axios from "axios"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Navbar = () => {
    const router = useRouter()
    const { setUser } = useUserStore()
    const { setTheme } = useTheme()
    const [toggle, setToggle] = useState<Boolean | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const roomId = localStorage.getItem("roomId")
        if (!token) {
            router.push("/signin")
        }
        if(!roomId){
            router.push("/dashboard")
        }
        const theme = localStorage.getItem("theme")
        setToggle(theme == "light" ? false : true)
        axios.get(`${BACKEND_URL}/me`, { headers: { Authorization: token } })
            .then((e) => {
                setUser(e.data.message)
            })
            .catch((e) => console.log(e))

        axios.get(`${BACKEND_URL}/room/${roomId}`, { headers: { Authorization: token } })
            .then((e) => {
                // setUser(e.data.message)
                console.log(e)
            })
            .catch((e) => console.log(e))
    }, [router])

    const lightThemeHandler = () => {
        setTheme("light")
        setToggle(false)
    }
    const darkThemeHandler = () => {
        setTheme("dark")
        setToggle(true)
    }
    return (
        <div className="bg-accent py-5 my-[1vh] mx-[3vh] rounded-xl flex justify-between">
            <h1 className="text-3xl pl-10">Chaty</h1>
            <div>
                <ul className="flex pr-10 items-center">
                    <li className="px-5">Profile</li>
                    <li className="px-5">Dashboard</li>
                    <li className="px-5">Chat</li>
                    {
                        toggle ? <Button className="px-5" onClick={lightThemeHandler}>Light Mode</Button> :
                            <Button className="px-5" onClick={darkThemeHandler}>Dark Mode</Button>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar
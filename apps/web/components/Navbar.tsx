"use client"
import { BACKEND_URL } from "@/lib/config"
import { useRoomStore } from "@/lib/store/roomStore"
import { useUserStore } from "@/lib/store/userStore"
import { Button } from "@workspace/ui/components/button"
import axios from "axios"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Navbar = () => {
    const router = useRouter()
    const { setUser } = useUserStore()
    const { setTheme } = useTheme()
    const [toggle, setToggle] = useState<Boolean | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/signin")
        }
        const theme = localStorage.getItem("theme")
        setToggle(theme == "light" ? false : true)
        axios.get(`${BACKEND_URL}/me`, { headers: { Authorization: token } })
            .then((e) => {
                setUser(e.data.message)
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
    const logoutHandler = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("roomId")
        router.push("/signin")
    }
    return (
        <div className="bg-accent py-5 my-5 mx-10 rounded-xl flex justify-between">
            <h1 className="text-3xl pl-10">Chaty</h1>
            <div>
                <ul className="flex pr-10 items-center">
                    <Link className="pr-5 cursor-pointer hover:underline" href={"/dashboard"}>Dashboard</Link>
                    <li className="pr-5 hover:underline cursor-pointer" onClick={logoutHandler}>Logout</li>
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
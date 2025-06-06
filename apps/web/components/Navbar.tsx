"use client"
import { Button } from "@workspace/ui/components/button"
import axios from "axios"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const Navbar = () => {
    const { setTheme } = useTheme()
    const [toggle, setToggle] = useState<Boolean | null>(null)
    useEffect(() => {
        const theme = localStorage.getItem("theme")
        setToggle(theme == "light" ? false : true)
        // axios.get("/me")
    }, [])

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
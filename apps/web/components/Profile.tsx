import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
const Profile = () => {
  return (
    <div className='w-[60vw] h-[30vh] rounded-lg mb-[2vh] bg-accent flex flex-col items-center pt-10 space-y-3'>
        <Avatar className='size-15'>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className='text-3xl font-bold bg-primary text-secondary'>{"Aranb Saha".split(" ").map(e=>e[0]).join("")}</AvatarFallback>
        </Avatar>
        <h1>Name: Arnab</h1>
        <p>Username: @username</p>
        <p>Email: thearnasbnaja@gmail.com</p>
    </div>
  )
}

export default Profile
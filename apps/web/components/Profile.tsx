import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
const Profile = () => {
    const getInitials = (fullName: string) => {
        const parts = fullName.trim().split(" ");
        if (parts.length === 1) return (parts[0]?.[0] ?? '').toUpperCase();
        const firstInitial = parts[0]?.[0] ?? '';
        const lastInitial = parts[parts.length - 1]?.[0] ?? '';
        return (firstInitial + lastInitial).toUpperCase();
        };
    return (
        <div className='w-[60vw] h-[30vh] rounded-lg mb-[2vh] bg-accent flex flex-col items-center pt-10 space-y-3'>
            <Avatar className='size-15'>
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className='text-3xl font-bold bg-primary text-secondary'>{getInitials("Arnab Kumar Saha")}</AvatarFallback>
            </Avatar>
            <h1>Name: Arnab</h1>
            <p>Username: @username</p>
            <p>Email: thearnasbnaja@gmail.com</p>
        </div>
    )
}

export default Profile
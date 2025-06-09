"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@workspace/ui/components/form"
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link"
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
const SigninSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
const Signin = () => {
    const router = useRouter();
    const SigninForm = useForm<z.infer<typeof SigninSchema>>({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            username: "",
            password: '',
        },
    })
    function onSubmit(values: z.infer<typeof SigninSchema>) {
            axios.post(`${BACKEND_URL}/signin`, { username: values.username, password: values.password})
            .then((e) => {
                toast.success("Login Successfully!")
                localStorage.setItem("token",e.data.token)
            })
            .then(()=>{
                router.push('/dashboard')
            })
            .catch((e) => {
                toast.error("Signin Failed")
                console.log(e)
            })
            SigninForm.reset()
    }
    return (
        <div className=" md:w-96 w-full p-5">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Form {...SigninForm}>
                <h1 className="text-3xl text-center">Login to Your Account</h1>
                <p className="text-center pt-3 pb-5 text-ring">User login page to access account using username and password.</p>
                <form onSubmit={SigninForm.handleSubmit(onSubmit)} className="space-y-4 flex justify-center flex-col">
                    <FormField
                        control={SigninForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={SigninForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Password" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Link href={"signup"} className="text-end underline">Don't Have a Account? Signup</Link>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default Signin
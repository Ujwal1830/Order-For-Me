'use client'
import Image from "next/image"
import Link from "next/link"
import {useState} from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function LoginForm({role}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit= async(e)=>{
        e.preventDefault();

        try {
            setLoading(true);
            const res = await signIn("credentials", {
                email, 
                password, 
                redirect: false,
            })

            if(res.error){
                setError("Invalid Credentials");
                return;
            }
            setTimeout(()=>{
                setLoading(true);
                router.replace("/")
            }, 1500)
        } catch (error) {
            console.log("error during registration :: ", error);
        }
    }

    return (
        <div className='mt-20 flex flex-col justify-center items-center '>
            { loading ? (
                <div >
                    <Loader />
                </div>
            ) : ( <div className="md:w-1/2 bg-white/50 border-2 border-white/5 px-8 py-2 rounded-3xl mb-5">
                    <div>
                        <h1 className='text-center text-cyan-800 font-bold text-3xl mb-6'>
                            {role=="admin" ? "Admin Login" : "Login"}
                        </h1>
                        <form onSubmit={handleSubmit} className="transition-all duration-1000 ease-out  flex flex-col items-center gap-5">
                            <div className="w-60 sm:w-96">
                                {/* <label for="email" className="block text-cyan-800 text-base mb-1 ml-3">Email</label> */}
                                <input onChange={e=>setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email" className="shadow appearance-none rounded-full w-full py-2 px-3 text-lime-200 bg-black/60" />
                            </div>
                            <div className="w-60 sm:w-96">
                                {/* <label for="password" className="block text-cyan-800 text-base mb-1 ml-3">Password</label> */}
                                <input onChange={e=>setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" className="shadow appearance-none rounded-full w-full py-2 px-3 text-lime-200 bg-black/60" />
                            </div>
                            <div className="mb-4">
                                <button type="submit" className="bg-cyan-800 hover:bg-cyan-800 text-white/90 py-2 px-10 rounded-full ">Sign In</button>
                            </div>
                        </form>
                        {error && <div className="px-5 py-2 bg-red-400">
                            {error}
                        </div>}
                    </div>
                    <div className='border-t'>
                        <Link href={'/api/auth/signin'} className='mt-3 w-full flex justify-center items-center border-2 rounded-full bg-white text-cyan-700 gap-2 text-base px-5 py-0'>
                            <Image src={'/google.png'} alt={'google image'} width={45} height={45} />
                            Login with Google
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
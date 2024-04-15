import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import {NextResponse} from "next/server"

export async function POST(req){
    try {
        const {name, email, password} = await req.json();
        const hashedpass = await bcrypt.hash(password, 10)
        let role = "";
        if(email == 'ujwal.yangalwar.2247@gmail.com'){
            role= "admin";
        } else {
            role= "user";
        }
        await connectMongoDB();
        const user = await User.create({
            name, email, password: hashedpass, role 
        })
        user.save();

        return NextResponse.json({ message: "User Registered."}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An Error occured"}, {status: 500})
    }
}
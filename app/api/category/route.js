import { connectMongoDB } from "@/lib/mongodb";
import { Category } from "@/models/category";
import {NextResponse} from "next/server"

export async function GET(){
    try {
        await connectMongoDB();
        const category = await Category.find();
        return NextResponse.json(category, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An Error occured"}, {status: 500})
    }
}
export async function POST(req){
    try {
        const { name } = await req.json();
        
        await connectMongoDB();
        const category = await Category.create({
            name
        })
        category.save();

        return NextResponse.json({ message: "Category Created"}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An Error occured"}, {status: 500})
    }
}
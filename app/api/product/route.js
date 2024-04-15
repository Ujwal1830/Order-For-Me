import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import {NextResponse} from "next/server"

export async function GET(){
    try {
        await connectMongoDB();
        const products = await Product.find();
        return NextResponse.json(products, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An Error occured"}, {status: 500})
    }
}

export async function POST(req){
    try {
        const {name, description, price, category, rating, sizesChecked, sizes} = await req.json();
        
        await connectMongoDB();
        if( sizesChecked ){
            const product = await Product.create({
                name, 
                description,
                category,
                sizes
            })
            product.save();
        } else if( price && !sizesChecked ) {
            const product = await Product.create({
                name, 
                description,
                price,
                category
            })
            product.save();
        }

        return NextResponse.json({ message: "Item Created"}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An Error occured"}, {status: 500})
    }
}

export async function PUT(req) {

    try {
        const { priceFlag } = await req.json();

        if (priceFlag) {
            const { id, price } = await req.json();
            console.log(price);
            await connectMongoDB();
            const updatedPrice = await Product.findByIdAndUpdate( id , {
                price,
            });     
        } else {
            const { id, sizes } = await req.json();
            console.log(sizes);
            await connectMongoDB();
            const updatedSizes = await Product.findByIdAndUpdate( id , {
                sizes,
            });
        }

        return NextResponse.json({ message: "Item Updated Successfully"}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An Error occured"}, {status: 500})
    }
}
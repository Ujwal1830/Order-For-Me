'use client'
import React, { useEffect, useState } from 'react';
import { getServerSession } from "next-auth";
import Link from 'next/link';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default function ProductForm() {


    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState();
    const [sizesChecked, setSizesChecked] = useState(false);
    const [sizes, setSizes] = useState([{ size: '', price: '' }]);
    const [error, setError] = useState("");

    const handleSizeChange = (index, field, fieldValue) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = fieldValue;
        setSizes(updatedSizes);
        console.log(sizes);
    };
    
    const handleAddSize = () => {
        setSizes([...sizes, { size: '', price: '' }]);
        console.log(sizes);
    };

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        console.log({ name, description, price, category, rating, sizes });
        if( name=="" && category=="" ){
            setError("all the fields are required");
        }

        try {
            const res = await fetch('/api/createProduct',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name, description, price, category, rating, sizes
                }),
            });

            if(res.ok){
                const form = e.target;
                form.reset();
                router.push("/")
            } else {
                console.log("Item Creation failed");
            }
        } catch (error) {
            console.log("error during Item Creation :: ", error);
        }
    }

    return (
        <div className='mb-4 transition-all duration-500 ease-in'>
            <h2 className='my-4 text-4xl px-2 py-1  bg-cyan-950 rounded-lg'>Create Product</h2>
            {error && <h3 className='mt-2 mb-4 text-center text-lg bg-red-600 rounded-lg border-b-2 border-r-2'>{error}</h3>}
            <div className='flex justify-center'>
                <form onSubmit={handleFormSubmit} className='flex flex-col gap-y-2 w-[100%]'>
                    <input type="text" placeholder='Item name' className='rounded-lg bg-cyan-900 text-white px-4 py-2' value={name} onChange={(e) => {setName(e.target.value); setError("")}} />
                    <textarea type="text" placeholder='Item Discription' rows={3} className='resize-none rounded-lg bg-cyan-900 text-white px-4 py-2' value={description} onChange={(e) => {setDescription(e.target.value); setError("")}} />
                    {!sizesChecked && <input type="number" placeholder='Price' min={0} onWheel={(e) => e.preventDefault()} className='rounded-lg bg-cyan-900 text-white px-4 py-2' value={price} onChange={(e) => {setPrice(e.target.value); setError("")}} />}
                    <select className='w-[90%] rounded-lg bg-cyan-900 text-white px-4 py-2' onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="main course">main course</option>
                        <option value="chinese">chinese</option>
                    </select>
                    <div>
                        <div className='flex items-center gap-2 m-2 '>
                            <input
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                type="checkbox"
                                checked={sizesChecked}
                                onChange={(e) => setSizesChecked(!sizesChecked)}
                            />
                            Include Sizes
                        </div>
                        {sizesChecked &&
                            <div className='flex flex-col items-center gap-y-2 w-[100%]'>
                                {sizes.map((size, index) => (
                                    <div key={index} className="flex flex-row gap-x-1 ">
                                        <input
                                            type="text"
                                            className="w-[100%] rounded-lg bg-cyan-900 text-white px-4 py-2"
                                            placeholder="Size"
                                            value={size.size}
                                            onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            className="w-[100%] rounded-lg bg-cyan-900 text-white px-4 py-2"
                                            placeholder="Price"
                                            value={size.price}
                                            onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddSize} 
                                    className="w-[40%] rounded-lg bg-cyan-900 text-white py-1">
                                    Add More Size
                                </button>
                            </div>
                        }
                    </div>
                    <button type="submit" className='rounded-lg bg-cyan-950 text-white px-4 py-2'>
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}

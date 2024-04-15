'use client'
import React, { useEffect, useState } from 'react';
import { getServerSession } from "next-auth";
import Link from 'next/link';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { options } from '@/app/api/auth/[...nextauth]/options';
import Loader from '../Loader';

export default function CategoryForm() {


    const router = useRouter();

    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        fetch('/api/category').then(res => {
            res.json().then(data => {
                setCategory(data);
                console.log(data);
            });
        })
    }, []);

    const handleFormSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault();
        console.log({ name });
        if( name=="" ){
            setError("name is required");
        }

        try {
            const res = await fetch('/api/category',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if(res.ok){
                const form = e.target;
                form.reset();
                setLoading(false);
                setName("");
            } else {
                console.log("Item Creation failed");
            }
        } catch (error) {
            console.log("error during Item Creation :: ", error);
        }
    }

    return (
        loading ? (
            <Loader />
        ) : (
        <div className='mb-4 transition-all duration-500 ease-in'>
            <h2 className='my-4 text-4xl px-2 py-1  bg-cyan-950 rounded-lg'>Create Category</h2>
            {error && <h3 className='mt-2 mb-4 text-center text-lg bg-red-600 rounded-lg border-b-2 border-r-2'>{error}</h3>}
            <div className='flex justify-center mt-10'>
                <form onSubmit={handleFormSubmit} className='flex flex-col gap-y-2 w-[100%]'>
                    <input type="text" placeholder='Item name' className='rounded-lg bg-cyan-900 text-white px-4 py-2' value={name} onChange={(e) => {setName(e.target.value); setError("")}} />
                    <button type="submit" className='rounded-lg bg-cyan-950 text-white px-4 py-2'>
                        Add Product
                    </button>
                </form>
            </div>
            <div className='mt-10'>
                <table className='border-4 w-full'>
                    <thead className='border-4 text-xl'>
                        <tr>
                            <th className='border-r-4'>Sr. No.</th>
                            <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody className='text-center text-lg'>
                        {category?.map((item, index)=>(
                            <tr className='border'>
                                <td className='border-r-4'>{index}</td>
                                <td>{item.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>)
    )
}

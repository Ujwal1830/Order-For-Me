'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect, usePathname, useRouter } from "next/navigation";
import ProductForm from '@/components/Product/ProductForm';
import CategoryForm from '@/components/Category/CategoryForm';

export default function CreatePage() {

    const pathname = usePathname();
    const router = useRouter();

    const [view, setView]=useState("product")
    const handleButonOfAddNew = (type) => setView(type);

  return (
    <div className='flex flex-col sm:mx-auto mt-4'>
        <div className='flex sm:w-96'>
            <div onClick={()=>{handleButonOfAddNew("product")}} 
                className={`w-[100%] sm:w-[60%] my-2 rounded-tl-lg py-2 px-2 ${view=="product"? "bg-white text-gray-800" : "text-white bg-gray-800"} text-center`}>
                <button>Add New Product</button>
            </div>
            <div onClick={()=>{handleButonOfAddNew("category")}} 
                className={`w-[100%] sm:w-[60%] my-2 rounded-tr-lg py-2 px-2 ${view=="category"? "bg-white text-gray-800" : "text-white bg-gray-800"} text-center`}>
                <button>Add New Category</button>
            </div>
        </div>
            {view == "product" && (
                <div className='w-[100%]'>
                    <ProductForm />
                </div>
            )}
            {view == "category" && (
                <div className='w-[100%]'>
                    <CategoryForm />
                </div>
            )}
    </div>
  )
}

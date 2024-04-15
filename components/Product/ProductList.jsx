'use client'
import React, { useEffect, useState } from 'react';

import ProductCard from './ProductCard';

export default function ProductList() {

  useEffect(()=>{
    const fetchProducts=async()=>{
      const res = await fetch('/api/product').then(res => {
          res.json().then(data => {
            setAllProducts(data);
            console.log(data);
          });
      })
  }
  fetchProducts();
  }, [])

    const [allProducts, setAllProducts] = useState([]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
        {allProducts?.map((product, index)=>(
            <ProductCard product={product} index={index} />
        ))}
    </div>
    )
}

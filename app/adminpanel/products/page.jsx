
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import ProductList from '@/components/Product/ProductList'

export default function Products() {
  return (
    <div className='my-4 gap-y-3'>
        <ProductList />
    </div>
  )
}

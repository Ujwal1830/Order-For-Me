import React, { useState } from 'react';


export default function ProductCard({product, index}) {

    const [toggleEdit, setToggleEdit] = useState(false);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedSizesPrice, setEditedSizesPrice] = useState(product?.sizes);
    const [success, setSuccess] = useState(false);
    const [sizes, setSizes] = useState([...product?.sizes]);

    console.log(product?.price);
    console.log(sizes);

    const handleEditToggle = () => {
        setToggleEdit(!toggleEdit);
    };

    const handleSizeChange = (index, field, fieldValue) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = fieldValue;
        setSizes(updatedSizes);
    };
    const handleAddSize = () => {
        setSizes([...sizes, { size: '', price: '' }]);
    };

    const returnJsonData=()=>{
        if(product.price) {
            return JSON.stringify({
                id: product._id,
                price: editedPrice,
                priceFlag: true,
            })
        } else {
            return JSON.stringify({
                id: product._id,
                sizes,
                priceFlag: false,
            })
        }
    }


    const handleConfirmEdit = async(e) => {
        setEditedPrice(editedPrice);
        e.preventDefault();

        console.log("Id:: "+product._id+", Edited price :: "+editedPrice);

        try {
            const res = await fetch(`/api/product/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: returnJsonData(),
            })
            
            if(res.ok){
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 2500);
            } else {
                setEditedPrice(product?.price);
                console.log("Product not updated");
            }    
        } catch (error) {
            console.log("error :: ", error);
        }
        setToggleEdit(false);
    };
    const handlePriceChange = (e) => {
        setEditedPrice(e.target.value);
    };

  return (
    <div key={index} className='flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
        <div className="flex flex-col justify-betwwen">
            {/* <Image width={100} height={100} className="object-cover ml-2 my-2 rounded-lg" src="/images/default_product.jpg" alt="" /> */}
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">{product?.name}</h5>
                <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">{product?.description}.</p>
                {
                    product?.price ? (
                        <div className='flex flex-row items-center py-3 gap-x-2'>
                            <p className='text-sm font-normal'>Price :-</p>
                            {toggleEdit ? (
                                    <input type="number" value={editedPrice} onChange={handlePriceChange} 
                                        className="border w-20 text-gray-600 border-gray-300 rounded px-2 py-1" 
                                    />
                                ) : (
                                    <p className="text-sm font-normal text-white">{editedPrice}</p>
                                )
                            }
                        </div>
                    ) : (
                        <div>
                            <p className='text-white/85'>Sizes</p>
                            <div className=''>
                                    {toggleEdit ? (
                                        <div className='flex flex-col items-center gap-y-2 w-[100%]'>
                                            {sizes.map((size, index) => (
                                                <div key={index} className="flex flex-row gap-x-1 ">
                                                    <input
                                                        type="text"
                                                        className="w-[100%] rounded-lg bg-cyan-900 text-white px-2 py-1"
                                                        placeholder="Size"
                                                        value={size.size}
                                                        onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                                        />
                                                    <input
                                                        type="number"
                                                        className="w-[40%] rounded-lg bg-cyan-900 text-white px-2 py-1"
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
                                    ) : (
                                        <div className='flex flex-row gap-x-2'>
                                            {product?.sizes?.map((item, index)=>(
                                                <div key={index} className='flex flex-row gap-x-2 '>
                                                    <p className="text-sm font-normal text-gray-400">{item.size} :-</p>        
                                                    <p className="text-sm font-normal text-white">{item.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        <div className='flex flex-row justify-between items-center px-2' >
            <div className="mb-2 ml-2 flex gap-2 rounded-md shadow-sm">
                    {toggleEdit ? (
                            <button
                                onClick={(e) => handleConfirmEdit(e)}
                                className="px-1 py-1 text-sm font-medium border-y-2 rounded-lg border-gray-200 hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                            >
                            <svg width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#6fd661" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </button>
                        ) : (
                            <button
                                onClick={handleEditToggle}
                                className="px-1 py-1 text-sm font-medium border-y-2 rounded-lg border-gray-200 hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                            >
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"  stroke="#FFFFFF"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g > <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M21 21H12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </button>
                        )
                    }
                <button
                    className="px-1 py-1 text-sm font-medium border-y-2 rounded-lg border-gray-200 hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                ><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#ffffff"><g  strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g > <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>
            </div>
            { success && <div className='flex flex-row items-center justify-center gap-x-2'>
                Updated
                <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="0.00024000000000000003"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 10.1666 20.4518 8.46124 19.5103 7.03891L12.355 14.9893C11.6624 15.7589 10.4968 15.8726 9.66844 15.2513L6.4 12.8C5.95817 12.4686 5.86863 11.8418 6.2 11.4C6.53137 10.9582 7.15817 10.8686 7.6 11.2L10.8684 13.6513L18.214 5.48955C16.5986 3.94717 14.4099 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#2e9940"></path> </g></svg>
            </div> }
        </div>
    </div>
    )
}

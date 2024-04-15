'use client'
import React, { useState } from 'react';
import UserCard from './UserCard'

export default function UsersList() {

    const [allUsers, setAllUsers] = useState([{
        name: "ujwal"
    }]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {allUsers.map((user, index)=>(
            <UserCard user={user} index={index} />
        ))}
    </div>
    )
}

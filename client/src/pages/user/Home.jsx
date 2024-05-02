import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

function Home() {

    const [data,setData] = useState(null);

    const fetchData = async () => {
        try {
            let response = await fetch(`${process.env.BASE_URI}api/user/home`, {
                credentials: 'include'
            })
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                setData(data?.user)
                console.log(data);
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        fetchData()
    }, [])

    return (
        <div style={{ height: '88vh' }} className='w-full bg-white flex justify-center items-center text-black'>
            <h1 className='text-2xl'>
                <h3>go to
                    <Link to={`profile/${data?._id}`} className='underline ml-3'>
                        profile
                    </Link>
                </h3>
            </h1>
        </div>
    )
}

export const Userhome = Home
import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Home() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`${process.env.BASE_URI}api/user/home`,{
                    credentials:'include'
                })
                console.log(response)
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.log(error)
            }
           
        }
        fetchData()
    },[])

    return (
        <div style={{ height: '88vh' }} className='w-full bg-white flex justify-center items-center text-black'>
            <h1 className='text-2xl'>
                Welcome :
            </h1>
        </div>
    )
}

export const Userhome = Home
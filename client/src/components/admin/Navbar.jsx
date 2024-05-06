import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { adminLogout } from '../../redux/authSlice'

function Navbar() {
  const dispatch = useDispatch()
  const isUserLoggedIn = useSelector((state) => state.user.isAdminAuthenticated)
  console.log(isUserLoggedIn)
  async function handleAdminLogout() {
    try {
      const response = await fetch(`${process.env.BASE_URI}api/admin/logout`,{
        method:'POST',
        credentials:'include'
      })
      if (response.ok) {
        dispatch(adminLogout())
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <nav className='bg-gray-50 px-14 py-5 flex justify-between items-center  drop-shadow-lg'>
      <Link to={'/admin'}>
        <h3 className='uppercase text-black text-2xl font-semibold tracking-wider'>
          user management system
        </h3>
      </Link>
      <div>
        {
          isUserLoggedIn ? (
            <>
              <NavLink
                to={'home/add'}
                style={{ border: '1px solid' }}
                className='nav-bar uppercase px-4 py-2 border-black mr-5 font-semibold text-black rounded-md hover:bg-blue-500/90 hover:text-zinc-50 duration-100'>
                add user
              </NavLink>
              <button
                onClick={handleAdminLogout}
                to={''}
                style={{ border: '1px solid' }}
                className='nav-bar uppercase px-4 py-2 border-black mr-5 font-semibold text-black rounded-md hover:bg-blue-500/90 hover:text-zinc-50 duration-100'>
                Logout
              </button>

            </>
          ) : (
            <NavLink
              to={''}
              style={{ border: '1px solid' }}
              className='nav-bar uppercase px-4 py-2 border-black mr-5 font-semibold text-black rounded-md hover:bg-blue-500/90 hover:text-zinc-50 duration-100'>
              Login
            </NavLink>
          )
        }

      </div>
    </nav >
  )
}

export default Navbar
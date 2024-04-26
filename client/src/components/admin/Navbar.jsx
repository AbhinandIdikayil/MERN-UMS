import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='bg-gray-50 px-14 py-5 flex justify-between items-center  drop-shadow-lg'>
      <Link to={'/admin'}>
        <h3 className='uppercase text-black text-2xl font-semibold tracking-wider'>
          user management system
        </h3>
      </Link>
      <div>
        <NavLink
          to={''}
          style={{ border: '1px solid' }}
          className='nav-bar uppercase px-4 py-2 border-black mr-5 font-semibold text-black rounded-md hover:bg-blue-500/90 hover:text-zinc-50 duration-100'>
          Login
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../navbar.css'

function Navbar() {
  return (
    <nav className='bg-gray-50 px-14 py-5 flex justify-between items-center  drop-shadow-lg'>
      <Link to={'/'}>
        <h3 className='uppercase text-black text-2xl font-semibold tracking-wider'>
          user management system
        </h3>
      </Link>
      <div>
        <NavLink
          to={'login'}
          style={{ border: '1px solid' }}
          className='nav-bar uppercase px-4 py-2 border-black mr-5 font-semibold text-black rounded-md hover:bg-blue-500/90 hover:text-zinc-50 duration-100'>
          Login
        </NavLink>
        <NavLink
          to={'/signup'}
          style={{ border: '1px solid' }}
          className='nav-bar uppercase px-4 py-2  border-black font-semibold text-black rounded-md hover:bg-blue-500/90 hover:text-zinc-50 duration-100' >
          Signup
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/admin/Navbar'

function AdminLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default AdminLayout
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminPrivateRoute({children}) {
    let isAdminLoggedIn = useSelector((state) => state.user.isAdminAuthenticated)
    if(!isAdminLoggedIn){
        return <Navigate to={'/admin'} />
    }
}

export default AdminPrivateRoute
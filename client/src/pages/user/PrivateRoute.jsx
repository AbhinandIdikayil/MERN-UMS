import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
function PrivateRoute({children}) {
    const UserLoggedIn = useSelector((state) => state.user.isUserAuthenticated)
    if(!UserLoggedIn){
        return <Navigate to={'/login'} />
    }else{
        return <Outlet />
    }
}


export default PrivateRoute
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function PrivateRoute({children}) {
    const UserLoggedIn = useSelector((state) => state.user.isUserAuthenticated)
    if(!UserLoggedIn){
        return <Navigate to={'/login'} />
    }else{
        return children
    }
}


export default PrivateRoute
import React from 'react'
import { useParams } from 'react-router-dom'
function EditUser() {
  const { userId } = useParams()
  console.log(userId)
  return (
    <div>EditUser</div>
  )
}

export default EditUser
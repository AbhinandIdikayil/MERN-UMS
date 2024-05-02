import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function EditUser() {


  const [userData, setUserData] = useState(null);

  const { userId } = useParams()
  console.log(userId)
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URI}api/admin/single-user/${userId}`)
      if (response.data) {
        setUserData(response.data.userData)
        console.log(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ height: '88vh' }} className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <form className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:px-10 sm:py-6">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-black w-80">Edit user</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-1 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                    <img src={userData?.image?.imageUrl} alt="" className="w-28 h-28 mx-auto rounded-full aspect-square" />
                </div>
                <div className="relative">
                  <input id="email" name="email" type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                    placeholder="Email address"
                    value={userData?.email}
                    onChange={(e) => {
                      setUserData(
                        {
                          ...userData,
                          email: e.target.value
                        }
                      )
                    }}
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ">Email Address
                    <span className='text-red-600'>
                      {' '}
                      {/* {errors?.email && (errors?.email)} */}
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <input id="username" name="username" type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                    placeholder="username address"
                    value={userData?.username}
                    onChange={(e) => {
                      setUserData(
                        {
                          ...userData,
                          username: e.target.value
                        }
                      )
                    }}
                  />
                  <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm "> Username
                    <span className='text-red-600'>
                      {' '}
                      {/* {errors?.email && (errors?.email)} */}
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <input id="email" name="email" type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                    placeholder="Email address"
                    value={userData?.email}
                    onChange={(e) => {
                      setUserData(
                        {
                          ...userData,
                          email: e.target.value
                        }
                      )
                    }}
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ">Email Address
                    <span className='text-red-600'>
                      {' '}
                      {/* {errors?.email && (errors?.email)} */}
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <input id="password" name="password" type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                    placeholder="Password"
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        password: e.target.value
                      })
                    }}
                  />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password
                    <span className='text-red-600'>
                      {' '}
                      {/* {errors?.password && (errors?.password)} */}
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <button type='submit' className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser


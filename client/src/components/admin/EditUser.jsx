import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

function EditUser() {

  const navigate = useNavigate()
  const [userData, setUserData] = useState('');
  const [file, setFile] = useState(false);
  const fileInputRef = useRef(null)
  const { userId } = useParams()

  function handleOnchange(e) {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
      if (!validImageTypes.includes(uploadedFile.type)) {
        console.log('hii')
        toast.error('Invalid image format', { position: toast.POSITION.TOP_RIGHT, })
        return false;
      }
      setFile(uploadedFile);
      return true;
    }
    return false
  }

  async function handleSubmit(e) {
    e.preventDefault()
      if (file) {
        let imageUrl = ''
        let publicId = ''
        let imageData = new FormData();
        imageData.append('file', file)
        imageData.append('upload_preset', 'fwqckd4c');
        const res = await axios.post('https://api.cloudinary.com/v1_1/dghv07eag/image/upload', imageData, { withCredentials: false })
        imageUrl = res.data.url
        publicId = res.data.public_id
        const formDatas = {...userData,
          image: {
            imageUrl,
            publicId
          }
        }

        const response = await axios.post(`${process.env.BASE_URI}api/admin/update-user/${userData?._id}`, formDatas)
        if (response.data) {
          console.log(response.data)          
          return navigate('/admin/home')
        }

      } else {
        const response = await axios.post(`${process.env.BASE_URI}api/admin/update-user/${userData?._id}`, userData);
        if(response.data){
          console.log(response.data)
          return navigate('/admin/home')
        }
      }
  }


  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URI}api/admin/single-user/${userId}`)
      if (response.data) {
        setUserData(response.data.userData)
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
      <div className="relative py-4 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">

          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-black w-80">Edit user</h1>
            </div>
            <form className="divide-y divide-gray-200">
              <div className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <img src={userData?.image?.imageUrl} alt="" className="w-28 h-28 mx-auto rounded-full aspect-square" />
                </div>

                <div className='relative'>
                  <span
                    onClick={() => fileInputRef.current.click()}
                    className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg hover:cursor-pointer mb-8"
                  >Browse</span>
                  <input ref={fileInputRef} type="file" name='file' onChange={handleOnchange} className="hidden mb-6" accept="accept" />
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
                    </span>
                  </label>
                </div>

                <div className="relative">
                  <button type='submit' onClick={handleSubmit} className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser


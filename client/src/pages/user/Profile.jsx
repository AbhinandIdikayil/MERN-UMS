import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {

    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState(false);
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);


    // storing  userData
    const [userData, setUserData] = useState(null);

    function handleEdit() {
        setIsEdit(!isEdit)
    }

    function handleOnchange(e) {
        const uploadedFile = e.targer.files[0];
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
        return false;
    }

    async function handleSave() {
        try {
            if (file) {
                let imageUrl = ''
                let publicId = ''
                let imageData = new FormData();
                imageData.append('file', file)
                imageData.append('upload_preset', 'fwqckd4c');
                const res = await axios.post('https://api.cloudinary.com/v1_1/dghv07eag/image/upload', imageData, { withCredentials: false })
                imageUrl = res.data.url
                publicId = res.data.public_id
                const formDatas = {
                    userData,
                    image: {
                        imageUrl,
                        publicId
                    }
                }

                const response = await axios.post(`${process.env.BASE_URI}api/user/update/${userData?._id}`, formDatas)
                if (response.data) {
                    const userID = response.data.user._id
                    isEdit(false)
                    // return navigate(`/home/profile/${userID}`)
                }
            } else {
                const response = await axios.post(`${process.env.BASE_URI}api/user/update/${userData?._id}`,userData);
                if(response.data){
                    const userID = response.data.user._id
                    setIsEdit(false)
                    // return navigate(`/home/profile/${userID}`)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchData() {
        const response = await fetch(`${process.env.BASE_URI}api/user/single-user`, {
            credentials: 'include'
        })
        if (response.ok) {
            const data = await response.json()
            setUserData(data?.user)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <main className='flex justify-center items-center bg-white' style={{ height: '88vh' }}>
            <div className="flex flex-col justify-center max-w-xs p-6 shadow-xl rounded-xl sm:px-12 bg-gray-100">
                <img src={userData?.image?.imageUrl} alt="" className="w-32 h-32 mx-auto rounded-full aspect-square" />
                <div className="space-y-4 text-center divide-y ">
                    <div className="my-2 space-y-1">
                        {
                            isEdit ? (
                                <>
                                    <span
                                        onClick={() => fileInputRef.current.click()}
                                        className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg hover:cursor-pointer mb-8"
                                    >Browse</span>
                                    <input ref={fileInputRef} type="file" name='file' onChange={handleOnchange} className="hidden mb-6" accept="accept" />
                                    <input  className='p-1 bg-white text-black mt-8' type="text" name='username' value={userData?.username}
                                        onChange={(e) => setUserData({
                                            ...userData,
                                            username: e.target.value
                                        })}
                                    />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-semibold sm:text-2xl text-black ">  { userData?.username } </h2>
                                    <p className="px-5 text-xs sm:text-base dark:text-gray-600">  { userData?.email }  </p>
                                </>
                            )
                        }

                    </div>
                    <div className="flex justify-center pt-2 space-x-4 align-center">
                        {
                            isEdit ? (
                                <>
                                    <button onClick={() => setIsEdit(false)} className='uppercase bg-red-700 p-2 rounded font-semibold text-white'>cancel</button>
                                    <button onClick={handleSave} className='uppercase bg-green-700 p-2 rounded font-semibold text-white'>save</button>
                                </>
                            ) : (
                                <button onClick={handleEdit} className='uppercase bg-blue-700 p-2 rounded font-semibold text-white'>
                                    ediit
                                </button>
                            )
                        }


                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile
import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import {  toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import axios from 'axios'

const initialValues = {
    username: '',
    email: '',
    password: '',
}

const addUserSchema = Yup.object().shape({
    username: Yup.string().required('username is required').matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
    'Name can only contain Latin letters.'),
    email: Yup.string().required('email is required').email('invalid email'),
    password: Yup.string().required('password is required').min(4, 'min 4 len'),
})

function AddUser() {

    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [isSubmit,setIsSubmit] = useState(false)

    const onUpload = (e) => {
        console.log('hasdfd')
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

    function showSubmiting () {

    }

    async function handleSubmit(values, { setSubmitting }) {
        console.log(file)
        if (file) {
            setIsSubmit(true);
            let imageUrl = ''
            let publicId = ''
            let imageData = new FormData();
            imageData.append('file', file)
            imageData.append('upload_preset', 'fwqckd4c');
            console.log(imageData)
            const res = await axios.post('https://api.cloudinary.com/v1_1/dghv07eag/image/upload', imageData, { withCredentials: false })
            imageUrl = res.data.url
            publicId = res.data.public_id
            const formDatas = {
                ...values,
                image: {
                    imageUrl,
                    publicId
                }
            }
            console.log(values, formDatas);
            try {
                const response = await axios.post(`${process.env.BASE_URI}api/admin/add`, formDatas)
                console.log(response.data)
                if (response.data.success) {
                    setIsSubmit(false);
                    return navigate('/admin/home')
                }
            } catch (error) {
                setIsSubmit(false);
                if (error.response.status === 409) {
                    toast.error('email already exist')
                }
                console.log(error)
            }
            setSubmitting(false)
        }
    }
    return (
        <div style={{ height: '88vh' }} className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-2 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-14">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-black w-80">Add user </h1>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={addUserSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, isSubmitting }) => (
                                <Form className="divide-y divide-gray-200">
                                    <div className="py-1 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <Field id="username" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent" placeholder="username" />
                                            <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                Username
                                                <span className='text-red-600'>
                                                    {' '}
                                                    {errors?.username && (errors?.username)}
                                                </span>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <Field id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent" placeholder="Email address" />
                                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ">
                                                Email Address
                                                <span className='text-red-600'>
                                                    {' '}
                                                    {errors?.email && (errors?.email)}
                                                </span>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <Field id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent" placeholder="Password" />
                                            <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                Password
                                                <span className='text-red-600'>
                                                    {' '}
                                                    {errors?.password && (errors?.password)}
                                                </span>
                                            </label>
                                        </div>

                                        <div className="relative">

                                            <input id="image"
                                                name="file" type="file"
                                                className="mt-2 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                                                accept='image/*'
                                                onChange={onUpload}
                                            />
                                            <label htmlFor="image" className="font-semibold absolute left-0 -top-3.5 text-red-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                <span className=''>
                                                    {
                                                        !file ? 'upload a image' : ''
                                                    }
                                                </span>
                                            </label>

                                        </div>
                                        <div className="relative">
                                            <button type='submit' className=" bg-zinc-900 text-white rounded-md px-2 py-1 hover:bg-zinc-950">
                                                {isSubmit ? 'submiting' : 'submit'}
                                                
                                            </button>
                                        </div>
                                    </div>

                                </Form>
                            )}

                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser
import { useFormik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const initialValues = {
    username: '',
    email: '',
    password: '',
}

const signupSchema = Yup.object().shape({
    username: Yup.string().min(2, 'morethan 2').required('username required'),
    email: Yup.string().email('invalid email').required('email required'),
    password: Yup.string().required('password required').min(4, 'min 4 required'),
})


function Signup2() {

    const navigate = useNavigate()

    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const onUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(uploadedFile.type)) {

                toast.error('Invalid image format. Please select a JPEG, PNG, or GIF image.');
                return;
            }
            setFile(uploadedFile);
            return true
        }
        return false
    };

    const handleSubmit = async (values, { setSubmitting }) => {

        if (file && onUpload) {
            let imageUrl = ''
            let imageSecureUrl = ''
            let publicId = ''
            let imageData = new FormData();
            imageData.append('file', file)
            imageData.append('upload_preset', 'fwqckd4c')
            const res = await axios.post('https://api.cloudinary.com/v1_1/dghv07eag/image/upload', imageData, { withCredentials: false })
            imageUrl = res.data.url;
            imageSecureUrl = res.data.secure_url
            publicId = res.data.public_id
            const formDatas = {
                ...values,
                image: {
                    imageUrl,
                    imageSecureUrl,
                    publicId
                }
            }
            console.log(values, formDatas)
            try {
                const response = await axios.post(`${process.env.BASE_URI}api/user/signup`, formDatas)
                if (response.data.success) {
                    navigate('/login')
                }
            } catch (error) {
                console.log(error)
            }
            setSubmitting(false)
        }
    }
    return (
        <div style={{ height: '88vh' }} className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-2 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:px-20 sm:py-14">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-black w-80">Signup</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={signupSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, isSubmitting }) => (
                                    <Form encType='multipart/form-data' className="py-5 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">

                                            < Field id="username"
                                                name="username" type="text"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                                                placeholder="Username"
                                            />
                                            <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ">
                                                Username
                                                <span className='text-red-600'>
                                                    {' '}
                                                    {
                                                        errors?.username && (errors?.username)
                                                    }
                                                </span>
                                            </label>

                                        </div>
                                        <div className="relative">

                                            <Field id="email" name="email"
                                                type="text"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                                                placeholder="Email address"
                                            />
                                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ">
                                                Email Address
                                                <span className='text-red-600'>
                                                    {' '}
                                                    {
                                                        errors?.email && (errors?.email)
                                                    }
                                                </span>
                                            </label>

                                        </div>
                                        <div className="relative">

                                            <Field id="password"
                                                name="password" type="password"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                                                placeholder="Password"
                                            />
                                            <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                Password
                                                <span className='text-red-600'>
                                                    {' '}
                                                    {
                                                        errors?.password && (errors?.password)
                                                    }
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
                                                        !file ? 'upload a file' : ''
                                                    }
                                                </span>
                                            </label>

                                        </div>
                                        <div className="relative">
                                            <button type='submit' disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-2 py-1">
                                                {
                                                    submitting ? 'submitting' : 'submit'
                                                }
                                            </button>
                                        </div>
                                    </Form>
                                )}


                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Signup2
import { useFormik, Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import axios from 'axios'

const initialValues = {
    username: '',
    email: '',
    password: '',
    image:''
}

const signupSchema = Yup.object().shape({
    username: Yup.string().min(2, 'morethan 2').required('username required'),
    email: Yup.string().email('invalid email').required('email required'),
    password: Yup.string().required('password required').min(4, 'min 4 required'),
    image:Yup.mixed().required('image is required')
})


function Signup2() {
    const handleSubmit = async (values,{setSubmitting}) => {
        const getDataUri = (image) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = () => {
              return reader.result
            };
        }
        let data = getDataUri(values.image)
        let newDatas = {
            ...values,
            image:data
        }
        console.log(values,newDatas)
        try {
        const response = await axios.post(`${process.env.BASE_URI}api/user/signup`,newDatas)
        console.log(response.data)
            // if(response.ok){
            //     console.log('from submitted')
            // } else {
            //     console.error('An error occurred while submitting the form.');
            //   }
        } catch (error) {
            console.log(error)
        }
        setSubmitting(false)
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
                                {({ errors , isSubmitting , setFieldValue }) => (
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

                                            <Field id="image"
                                                name="image" type="file"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                                                accept='image/*'
                                                onChange={(e) => setFieldValue('image',e.target.files[0])}
                                            />
                                            <label htmlFor="image" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                                <span>
                                                    {' '}
                                                    {
                                                            errors?.image && (errors?.image)
                                                    }
                                                </span>
                                            </label>

                                        </div>
                                        <div className="relative">
                                            <button type='submit' disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-2 py-1">Submit</button>
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
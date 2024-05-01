import { Formik, Form, Field } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const initialValues = {
    username: '',
    email: '',
    password: '',
    image: ''
}

const addUserSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    email: Yup.string().required('email is required').email('invalid email'),
    password: Yup.string().required('password is required').min(4, 'min 4 len'),
    image: Yup.mixed().required('image is required')
})

function AddUser() {
    function handleSubmit(values) {

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
                                        <div className="col-span-full">
                                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Photo
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                        <div className="relative">
                                            <button type='submit' className=" bg-zinc-900 text-white rounded-md px-2 py-1 hover:bg-zinc-950">Submit</button>
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
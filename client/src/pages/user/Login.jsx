import React, { useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLogin } from '../../redux/authSlice'

const initialValues = {
  email: '',
  password: ''
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('invalid email').required('email is required'),
  password: Yup.string().min(4, 'min 4 required').required('password is required')
})


function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isUserLoggedIn = useSelector((state) => state.user.isUserAuthenticated)


  useEffect(() => {
    if(isUserLoggedIn){
      navigate('/home')
    }
  }, [])


  async function handleSubmit(values, { setSubmitting }) {
    console.log(values)
    try {
      let response = await axios.post(`${process.env.BASE_URI}api/user/login`, values)
      if (response) {
        console.log(response.data.token)
        const token = response.data.token
        const userid = response.data.userId
        console.log(token)
        dispatch(setUserLogin(token))
        navigate('/home')
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.message)
      }
      console.log(error)
    }

  }


  return (
    <div style={{ height: '88vh' }} className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting }) => (
            <Form className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold text-black w-80">Login </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <Field id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent" placeholder="Email address" />
                      <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ">Email Address
                        <span className='text-red-600'>
                          {' '}
                          {errors?.email && (errors?.email)}
                        </span>
                      </label>
                    </div>
                    <div className="relative">
                      <Field id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent" placeholder="Password" />
                      <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password
                        <span className='text-red-600'>
                          {' '}
                          {errors?.password && (errors?.password)}
                        </span>
                      </label>
                    </div>
                    <div className="relative">
                      <button type='submit' className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}

        </Formik>
      </div>
    </div>
  )
}

export const Userlogin = Login
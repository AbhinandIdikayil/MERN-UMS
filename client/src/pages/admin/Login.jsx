import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { Field, Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin } from '../../redux/authSlice'

const initialValues = {
  email: '',
  password: ''
}
const loginSchema = Yup.object().shape({
  email: Yup.string().email('invalid email').required('email is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'email is invalid'),
  password: Yup.string().min(4, 'min is 4').required('password id required')
})

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector((state) => state.user.isAdminAuthenticated)


  useEffect(() => {
    function changeRoute() {
      if(isAdminLoggedIn){
        return navigate('/admin/home')
      }
    }
    changeRoute()
  },[])

  

  async function handleSubmit(values) {
    try {
      const response = await fetch(`${process.env.BASE_URI}api/admin/login`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(values),
        credentials:'include'
      })
      if(response.ok){
        const data = await response.json()
        console.log(data)
        dispatch(adminLogin({payload:data.token}))
        navigate('/admin/home');
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div style={{ height: '88vh' }} className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-2 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-zinc-600 to-zinc-900 shadow-lg  -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-black w-80">Login </h1>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, isSubmitting }) => (
                <Form className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <Field  id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent" placeholder="Email address" />
                      <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ">
                        Email Address
                        <span className='text-red-600'>
                          {' '}
                          { errors?.email && (errors?.email) }
                        </span>
                      </label>
                    </div>
                    <div className="relative">
                      <Field  id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent" placeholder="Password" />
                      <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Password
                        <span className='text-red-600'>
                          {' '}
                          { errors?.password && (errors?.password) }
                        </span>
                      </label>
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

export default Login
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function SignUp() {

  const navigate = useNavigate()
  const [image, setImage] = useState(null)

  const [imageBase64, setImageBase64] = useState("");

  // convert image file to base64
  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };


  const { handleSubmit, register, formState: { errors, isValid }, watch } = useForm();
  const password = watch('password')

  async function formHandler(data) {
    if (isValid) {
      const formData = new FormData()
      console.log(data.image[0])
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", imageBase64)
      console.log("data from form: ", formData);
      const formDataObject = {};
      console.log(imageBase64)
      console.log(formData.entries())
      for (let [key, value] of formData.entries()) {
        // if (key === 'image') {
        //   formDataObject[key] = {
        //     name: value.name,
        //     size: value.size,
        //     type: value.type,
        //     lastModified: value.lastModified
        //   }
        // } else {
        formDataObject[key] = value;
        // }

      }

      try {
        const response = await fetch(`${process.env.BASE_URI}api/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: formData
        })
        console.log(response)
        if (response.data.message === "Email already exists") {
          return toast.error("Email already exists");
        }

        toast.success("Registration Successful!");
        navigate("/login");
      } catch (error) {
        console.log(error)
      }
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
              <form onSubmit={handleSubmit(formHandler)} encType='multipart/form-data' className="py-5 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">

                  <input id="username"
                    name="username" type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                    placeholder="Username"
                    {
                    ...register('username', {
                      required: 'username is required',
                      minLength: {
                        value: 4,
                        message: 'minimun 4 length is required'
                      },
                      pattern: {
                        value: /^[a-zA-Z ]{2,30}$/,
                        message: 'Invalid name'
                      }
                    })
                    }
                  />
                  <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ">
                    Username
                    <span>
                      {errors?.username?.message}
                    </span>
                  </label>

                </div>
                <div className="relative">

                  <input id="email" name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                    placeholder="Email address"
                    {
                    ...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'invalid email address'
                      }
                    })
                    }
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ">
                    Email Address
                    <span>
                      {errors?.email?.message}
                    </span>
                  </label>

                </div>
                <div className="relative">

                  <input id="password"
                    name="password" type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                    placeholder="Password"
                    {
                    ...register('password', {
                      required: 'password is required',
                    })
                    }
                  />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Password
                    <span>
                      {errors?.password}
                    </span>
                  </label>

                </div>
                <div className="relative">

                  <input id="image"
                    name="image" type="file"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                    placeholder=""
                    accept='image/*'
                    {
                    ...register('image', {
                      required: 'image is required',
                    })
                    }
                    onChange={(e) => {
                      const file = e.target.files[0]
                      setImage(file)
                      setFileToBase64(file)
                    }}
                  />
                  <label htmlFor="image" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    <span>
                      {errors?.image?.message}
                    </span>
                  </label>

                </div>
                <div className="relative">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-2 py-1">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
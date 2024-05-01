import React, { useEffect, useState } from 'react'
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import moment from 'moment'
import axios from 'axios';

function Home() {

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const response = await axios.get(`${process.env.BASE_URI}api/admin/home`);
    if (response.data) {
      setUsers(response.data.users)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  function formattedDate(dateString) {
    const dateObj = moment(dateString);
    const formattedDate = dateObj.format("MMM Do, YYYY")
    return <span>{formattedDate}</span>
  }

  return (
    <div style={{ height: '88vh' }} className="bg-gray-100 py-6 sm:py-12 sm:px-20">

      <div>
        <h2 className="text-2xl font-semibold leading-tight text-black">Users</h2>
      </div>
      <div className="my-2 flex sm:flex-row flex-col">
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
              </path>
            </svg>
          </span>
          <input placeholder="Search"
            className="appearance-none rounded-r rounded-l  border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  className="px-5 py-3 border-b-2 border-gray-500 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th
                  className="px-5 py-3 border-b-2 border-gray-500 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  email
                </th>
                <th
                  className="px-5 py-3 border-b-2 border-gray-500 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created at
                </th>
                <th
                  className="px-5 py-3 border-b-2 border-gray-500 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((data, ind) => (
                <tr key={data?._id}>
                  <td className="px-5 py-5 border-b border-gray-500  text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full"
                          src={`${data?.image?.imageUrl}`}
                          alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {data?.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500  text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{data?.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500  text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {formattedDate()}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-500 text-sm">
                    <span className='flex gap-4 items-center'>
                      <NavLink to={`edit/${data._id}`}>
                        <TbEdit size={20} className='text-black' />
                      </NavLink>
                      <button to={''}>
                        <RiDeleteBin2Fill size={20} className='text-black' />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}



            </tbody>
          </table>
          {/* <div
                        className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div> */}
        </div>
      </div>


    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import UserListing from '../../components/admin/UserListing';

function Home() {

  const [users, setUsers] = useState([]);
  const [searchUser,setSearchUser] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const response = await axios.get(`${process.env.BASE_URI}api/admin/home`);
    if (response.data) {
      setUsers(response.data.users)
    }
  }

  function handleSearching(e) {
      setSearchUser(e.target.value)
  }

  function removeUser(id) {
    setUsers(users.filter(data => data._id != id))
  }


  const filteredUser = users.filter((user) => user.username.toLowerCase().includes(searchUser.toLowerCase()) )


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
          value={searchUser}
          onChange={handleSearching}
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
              {
                filteredUser.length > 0 ? filteredUser.map((data) => (

                  <UserListing key={data?._id} user={data} onDelete={removeUser} />
                )) :  <tr className='text-black text-lg font-bold text-center'>
                    No users found
                  </tr>
              }
            
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}

export default Home
import React from 'react'
import moment from 'moment'
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function formattedDate(dateString) {
    const dateObj = moment(dateString);
    const formattedDate = dateObj.format("MMM Do, YYYY")
    return <span>{formattedDate}</span>
}

function UserListing({ user , onDelete}) {

    const deleteUser = async (id) => {
        try {
            console.log(id)
            const response = await axios.delete(`${process.env.BASE_URI}api/admin/delete`,{data:{id}});
            if(response.data.success){
                onDelete(id);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-500  text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full"
                            src={`${user?.image?.imageUrl}`}
                            alt="" />
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {user?.username}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-500  text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-500  text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {formattedDate(user?.createdAt)}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-500 text-sm">
                <span className='flex gap-4 items-center'>
                    <NavLink to={`edit/${user._id}`}>
                        <TbEdit size={20} className='text-black' />
                    </NavLink>
                    <button onClick={() => deleteUser(user._id)}>
                        <RiDeleteBin2Fill size={20} className='text-black' />
                    </button>
                </span>
            </td>
        </tr>
    )
}

export default UserListing
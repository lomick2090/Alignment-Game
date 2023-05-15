import AddUserToList from "../components/AddUserToList"
import returnUser from '../utils/returnUser'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from "../utils/Context"

export default function CreateProfile() {
    const userList = useUserContext()
    return (
        <div className='createprofile'>
            {
                //returnUser(userList) ?
                //<Navigate to='../../groups' />
                //:
                <AddUserToList />
            }

        </div>
    )
}
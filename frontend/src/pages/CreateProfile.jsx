import AddUserToList from "../components/AddUserToList"
import returnUser from '../utils/returnUser'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function CreateProfile() {
    const [userExists, setUserExists] = useState(false)

    useEffect(() => {
        async function check() {
            const answer = await returnUser()
            
            setUserExists(answer ? true : false)
        }
        check()
    }, [])

    console.log(userExists)
    return (
        <div>
            {
                userExists ?
                <Navigate to='../../groups' />
                :
                <AddUserToList />
            }

        </div>
    )
}
import AddUserToList from "../components/AddUserToList"
import returnUser from '../utils/returnUser'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from "../utils/Context"

export default function CreateProfile() {
    const [userExists, setUserExists] = useState(false)
    const userList = useUserContext()

    useEffect(() => {
        async function check() {
            const answer = returnUser(userList)
            
            setUserExists(answer ? true : false)
        }
        check()
    }, [])
    return (
        <div>
            {
                //userExists ?
                //<Navigate to='../../groups' />
               // :
                <AddUserToList />
            }

        </div>
    )
}
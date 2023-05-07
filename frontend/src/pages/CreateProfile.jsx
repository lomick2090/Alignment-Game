import AddUserToList from "../components/AddUserToList"
import checkIfUser from '../utils/checkIfUser'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function CreateProfile() {
    const [userExists, setUserExists] = useState(false)

    useEffect(() => {
        async function check() {
            const answer = await checkIfUser()
            setUserExists(answer)
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
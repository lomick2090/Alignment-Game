import AddUserToList from "../components/AddUserToList"
import checkIfUser from '../utils/checkIfUser'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function CreateProfile() {
    const [userExists, setUserExists] = useState(false)

    useEffect(() => {
        setUserExists(checkIfUser())
    }, [])

    return (
        <div>
            {
                userExists ?
                <Navigate to='groups' />
                :
                <AddUserToList />
            }

        </div>
    )
}
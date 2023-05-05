import { useState, useEffect } from 'react';
import { db } from "../config/firebase"
import { getDocs, collection } from 'firebase/firestore'
import AddUserToList from '../components/AddUserToList'

export default function Quiz() {
    const [userList, setUserList] = useState([]);

    const usersRef = collection(db, 'users')
    useEffect(() => {
        async function getUserList() {
            const data = await getDocs(usersRef)
            const filteredData = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setUserList(filteredData)
        }
        getUserList()
    }, [])

    return (
        <div>
            <AddUserToList />
        </div>
    )
}
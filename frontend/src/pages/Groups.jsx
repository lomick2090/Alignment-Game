import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { db } from "../config/firebase"
import { getDocs, collection } from 'firebase/firestore'
import { auth } from '../config/firebase';

export default function Groups() {
    const [userList, setUserList] = useState([]);
    const [group, setGroup] = useState('');
    const [groupList, setGroupList] = useState([])

    const usersRef = collection(db, 'users')
    const groupRef = collection(db, 'groups')
    useEffect(() => {
        async function getUserList() {
            const data = await getDocs(usersRef)
            const filteredData = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setUserList(filteredData)
        }
        async function getGroupList() {
            const data = await getDocs(groupRef)
            const filteredData = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setGroupList(filteredData)
        }

        getUserList();
        getGroupList();
    }, [])

    const groupElements = groupList.map((group) => {
        return (
            <div key={group.groupName}>
                <button onClick={() => setGroup(group.groupName)}>
                <h1>{group.groupName}</h1>
                </button>
            </div>
        )
    })
    return (
        <div>
            {
                auth?.currentUser?.id ?
                <Navigate to='/login' />
                :
               (group ?
               
               <div>quiz</div>
               :
                <div>
                    <h1>Choose Group:</h1>
                    {groupElements}
                </div>)  
            }
        </div>
    )
}
import { useState, useEffect } from 'react';
import { Link, Navigate, Routes, Route } from 'react-router-dom'
import { db } from "../config/firebase"
import { getDocs, collection } from 'firebase/firestore'
import { auth } from '../config/firebase';
import GroupPage from './GroupPage';

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
                <Link to={`${group.groupName}`}>
                    <button>
                        <h1>{group.groupName}</h1>
                    </button>
                </Link>
            </div>
        )
    })
    return (
        <div>
            <div className='groups'>
                <h1>Choose Group:</h1>
                {groupElements}
                <Link to={`../create`}>
                    <button>
                        <h1>Create New</h1>
                    </button>
                </Link>
            </div>
            <Routes>
                <Route path=":groupName" element={<GroupPage />} />
            </Routes>
        </div>
    )
}
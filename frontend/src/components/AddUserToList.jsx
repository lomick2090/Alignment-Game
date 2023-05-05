import { db } from '../config/firebase'
import { getDocs, addDoc, collection } from 'firebase/firestore'
import { useState, useEffect } from 'react'


export default function AddUserToList() {
    const [user, setUser] = useState({
        name: '',
        img: '',
        group:''
    })
    const [groups, setGroups] = useState([])

    const groupsRef = collection(db, 'groups')
    const usersRef = collection(db, 'users')

    useEffect(() => {
        async function getGroupList() {
            const data = await getDocs(groupsRef)
            const filteredData = data.docs.map(doc => (doc.data()))
            setGroups(filteredData)
        }
        getGroupList()
    }, [])

    function handleChange(e) {
        const { value, name } = e.target
        setUser(prevUser => {
            return {
                ...prevUser,
                [name]:value
            }
        })
    }

    async function handleSubmit() {
        try {
            await addDoc(usersRef), {
                name: user.name,
                group: user.group,
                lawfulVotes: [0],
                goodVotes: [0],

            }
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div>
            <input type='text' placeholder='name' value={user.name} name='name' onChange={handleChange}/>
            <label>Profile Pic: <input type='file' accept="image/png, image/jpeg"/></label>
            <label htmlFor="group">Select Group:
            <select name="group" id="group" value={user.group} onChange={handleChange}>
                {groups && groups.map(group => {
                    let groupName = group.groupName
                    return (
                        <option value={groupName}>{groupName}</option>
                    )
                })}
            </select>
            </label>


            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
import { db, auth, storage } from '../config/firebase'
import { getDocs, addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes } from "firebase/storage"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function AddUserToList() {
    const [groups, setGroups] = useState([])
    const [user, setUser] = useState({
        name: '',
        img: '',
        group: ''
    })

    const groupsRef = collection(db, 'groups');
    const usersRef = collection(db, 'users');

    useEffect(() => {
        async function getGroupList() {
            const data = await getDocs(groupsRef)
            const filteredData = data.docs.map(doc => (doc.data()))
            setGroups(filteredData)
        }
        getGroupList()
    }, [])

    function handleChange(e) {
        const { value, name} = e.target
        setUser(prevUser => {
            return {
                ...prevUser,
                [name]:value
            }
        })
    }

    function handleUpload(file) {
        setUser(prevUser => {
            return {
                ...prevUser,
                img: file
            }
        })
    }

    async function handleSubmit() {
        if (!user.name || !user.group || !user.img) {
            alert('please fill all fields')
        } else {
            try {
                const storageRef = ref(storage, `images/${auth?.currentUser?.uid}`);
                await uploadBytes(storageRef, user.img)
            } catch(err) {
                console.log(err)
            }
            try {
                await addDoc(usersRef, {
                    name: user.name,
                    group: user.group,
                    lawfulVotes: [0],
                    goodVotes: [0],
                    userId: auth?.currentUser?.uid,
                    picture: `images/${auth?.currentUser?.uid}`
                })
            } catch(err) {
                console.log(err)
            }
        }
    }
    return(
        <div>
            {/*auth.currentUser.id ?*/
            <div className='userform'>
                <h1>Add Yourself!</h1>
                <input 
                    type='text' 
                    placeholder='Name' 
                    value={user.name} 
                    name='name' 
                    onChange={handleChange}
                />

                <label>
                    Profile Pic: 
                    <input 
                        name='img'
                        onChange={(e) => handleUpload(e.target.files[0])}
                        className='picupload'
                        type='file' 
                        accept="image/png, image/jpeg"
                    />
                </label>

                <label htmlFor="group">
                    Select Group:
                    <select 
                        name="group" 
                        id="group" 
                        value={user.group} 
                        onChange={e => handleChange(e)}
                    >
                        <option value={null}>Select A Group</option>
                        {groups && groups.map(group => {
                            let groupName = group.groupName
                            return (
                                <option key={groupName} value={groupName}>{groupName}</option>
                            )
                        })}
                    </select>
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </div> 
            /*:
            <Link to='../login'>
                <button>Please login here first</button>
            </Link> */
            }
        </div>
    )
}
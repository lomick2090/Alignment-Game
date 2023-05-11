import { db, auth, storage } from '../config/firebase'
import { getDocs, setDoc, doc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
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
            let pictureURL
            try {
                let imagePath =`images/${auth?.currentUser?.uid}`
                const storageRef = ref(storage, imagePath);
                await uploadBytes(storageRef, user.img)
                const imageRef = ref(storage, imagePath)
                pictureURL = await getDownloadURL(imageRef)
            } catch(err) {
                console.log(err)
            }
            try {
                const usersRef = doc(db, 'users', auth?.currentUser?.uid);
                await setDoc(usersRef, {
                    name: user.name,
                    group: user.group,
                    lawfulVotes: [],
                    goodVotes: [],
                    userId: auth?.currentUser?.uid,
                    pictureURL,
                    votes: []
                })
            } catch(err) {
                console.log(err)
            }
        }
    }
    return(
        <div>
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
        </div>
    )
}
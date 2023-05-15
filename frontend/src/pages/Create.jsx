import { useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from "../config/firebase";
import { setDoc, doc } from 'firebase/firestore';
import { auth } from '../config/firebase';


export default function Create() {
    const [group, setGroup] = useState('')
    

    async function handleSubmit() {
        if (group) {
            try {
                const groupsRef = doc(db, 'groups', group)
                await setDoc(groupsRef, {groupName: group, createdBy: auth?.currentUser?.uid})
            } catch(err) {
                console.log(err)
            }
        }
        window.location.href = '../groups/'
    } 

    function handleChange(e) {
        const { value } = e.target;
        setGroup(value);
    }

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            {(auth?.currentUser?.uid) ?
                <div>
                    <input type="text" value={group} onChange={handleChange} placeholder='group name'/>
                    <button onClick={handleSubmit}>Add Group</button>
                </div>
                :
                <Link to='../login'>
                    <p>Sign in here first</p>
                </Link>
            }
        </div>
    )
}
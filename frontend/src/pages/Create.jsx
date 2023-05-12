import { useState } from 'react'
import { db } from "../config/firebase";
import { addDoc, collection } from 'firebase/firestore';


export default function Create() {
    const [group, setGroup] = useState('')
    const groupsRef = collection(db, 'groups')

    async function handleSubmit() {
        if (group) {
            try {
                await addDoc(groupsRef, {groupName: group, createdBy: auth?.currentUser?.uid})
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
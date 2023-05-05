import { useState } from 'react'
import { db } from "../config/firebase";
import { addDoc, collection } from 'firebase/firestore';


export default function Create() {
    const [group, setGroup] = useState('')

    const groupsRef = collection(db, 'groups')

    async function handleSubmit() {
        if (group) {
            try {
                await addDoc(groupsRef, {groupName: group})
            } catch(err) {
                console.log(err)
            }
        }
    } 

    function handleChange(e) {
        const { value } = e.target;
        setGroup(value);
    }

    return (
        <div>
            <input type="text" value={group} onChange={handleChange} placeholder='group name'/>
            <button onClick={handleSubmit}>Add Group</button>
        </div>
    )
}
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from "../config/firebase";
import { setDoc, doc, collection, getDocs} from 'firebase/firestore';
import { auth } from '../config/firebase';


export default function Create() {
    const [group, setGroup] = useState('')
    const [groupList, setGroupList] = useState([])
    const [hasMadeGroup, setHasMadeGroup] = useState(false)


    async function handleSubmit() {
        if (group) {
            try {
                const groupsRef = doc(db, 'groups', group)
                await setDoc(groupsRef, {groupName: group, createdBy: auth?.currentUser?.uid})
            } catch(err) {
                console.log(err)
            }
        }
        setTimeout(() => {
            window.location.href = '../groups/'
        }, 500)
    } 

    useEffect(() => {
        async function getGroupList() {
            const groupRef = collection(db, 'groups')
            const groupsRaw = await getDocs(groupRef)
            let groups = []
            groupsRaw.forEach(group => (groups.push(group.data())))
            setGroupList(groups)
        }

        getGroupList()
    }, [])


    useEffect(() => {
        groupList.map(group => {
            if (group.createdBy == auth?.currentUser?.uid) {
                setHasMadeGroup(true)
            }
        })
    }, [groupList])
        

    function handleChange(e) {
        const { value } = e.target;
        setGroup(value);
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center'}}>
                {(auth?.currentUser?.uid) ?
                    (
                        (hasMadeGroup) ? 
                            <div style={{textAlign:'center'}}>
                                <p>You can only create one group</p>
                                <Link to='../groups'>Back</Link>
                            </div>
                            :
                            <div>
                                <input type="text" value={group} onChange={handleChange} placeholder='group name'/>
                                <button onClick={handleSubmit}>Add Group</button>
                            </div>
                    )
                    :
                    <Link to='../login'>
                        <p>Sign in here first</p>
                    </Link>
                }
            </div>
        </div>
    )
}
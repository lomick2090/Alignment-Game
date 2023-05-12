import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { db, auth, storage } from "../config/firebase"
import { doc, setDoc } from "firebase/firestore"
import { ref, getDownloadURL } from 'firebase/storage'
import { useUserContext } from "../utils/Context"
import returnUser from "../utils/returnUser"
import User from '../components/User'


export default function GroupPage() {
    const { groupName } = useParams()
    const userList = useUserContext()

    const userListOfGroup = userList.filter(user => {
        return user.group.includes(groupName)
    })

    const userElements = userListOfGroup.map(user => {
        const {goodVotes, lawfulVotes, name, pictureURL} = user
        return( <User key={name} goodVotes={goodVotes} lawfulVotes={lawfulVotes} name={name} pictureURL={pictureURL} />)
    })

    async function handleJoin() {
        const user = returnUser(userList)
        if (user.group.length > 4) {
            alert('You can only join 5 groups')
        } else {
            const newgroups = user.group.concat(groupName)
            const usersRef = doc(db, 'users', user.userId);
            await setDoc(usersRef, {
                    name: user.name,
                    group: newgroups,
                    lawfulVotes: user.lawfulVotes,
                    goodVotes: user.goodVotes,
                    userId: user.userId,
                    pictureURL: user.pictureURL,
                    votes: user.votes
            })
            location.reload()
        }
        
    }

    

    return (
        <div className="grouppage">
            <div>
                <h1 style={{fontSize: 'min(11vw, 10vh',}}>{groupName}</h1>
                {
                    (auth?.currentUser?.uid && userList)
                    &&
                    (
                        !((returnUser(userList)) ? true : false) ? 
                        <Link to='../../login/createprofile'><button>Create Profile</button></Link>
                        :
                        (
                            (returnUser(userList).group.includes(groupName)) ?
                            <Link to='quiz'><button>Take Group Quiz</button></Link>
                            :
                            <button onClick={handleJoin}>Join Group</button>
                        )
                    )


                }
            </div>
            <div className="chart">
                {userElements}
            </div>
            
        </div>
    )
}
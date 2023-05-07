import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { db, auth, storage } from "../config/firebase"
import { getDocs, collection } from "firebase/firestore"


export default function GroupPage() {
    const [userList, setUserList] = useState([])

    const { groupName } = useParams()
    const usersRef = collection(db, 'users')

    useEffect(() => {

        async function getUserList() {
            const data = await getDocs(usersRef)
            const filteredList = data.docs.filter(user => {
                console.log(user.data().group)
               return user.data().group == groupName
            })
            setUserList(filteredList)
        }

        getUserList()
    }, [])

    const userElements = userList.map(user => {
        const {goodVotes, lawfulVotes, name, picture} = user.data()
        console.log(goodVotes, lawfulVotes, name, picture)
    })

    userElements

    return (
        <div className="grouppage">
            {groupName}
            <div className="chart">
                <div className="userholder">
                </div>

            </div>
            
        </div>
    )
}
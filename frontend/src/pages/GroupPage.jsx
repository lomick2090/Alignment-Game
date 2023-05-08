import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { db, auth, storage } from "../config/firebase"
import { getDocs, collection } from "firebase/firestore"
import { ref, getDownloadURL } from 'firebase/storage'
import User from '../components/User'


export default function GroupPage() {
    const [userList, setUserList] = useState([])
    const { groupName } = useParams()
    
    const usersRef = collection(db, 'users')
 

    useEffect(() => {
        async function getUserList() {
            const data = await getDocs(usersRef)
            const filteredList = data.docs.filter(user => {
               return (user.data().group == groupName)
            })

            let usableList = [];
            filteredList.forEach(async user => {
                const {goodVotes, lawfulVotes, name, picture} = user.data()
                const imageRef = ref(storage, picture)
                let url = await getDownloadURL(imageRef)

                usableList.push({
                    name,
                    goodVotes,
                    lawfulVotes,
                    url
                })
            })
            setUserList(usableList)     
        }
        getUserList()
    }, [])

    const userElements = userList.map(user => {
        //const {goodVotes, lawfulVotes, name, picture} = user.data()
        console.log(user)
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
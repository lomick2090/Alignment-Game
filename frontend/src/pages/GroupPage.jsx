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
            try {

                const data = await getDocs(usersRef)
                const filteredList = data.docs.filter(user => {
                   return (user.data().group == groupName)
                })


                let usableList = await Promise.all(filteredList.map(async user => {
                    const {goodVotes, lawfulVotes, name, picture} = user.data()
                    const imageRef = ref(storage, picture)
                    let pictureURL = await getDownloadURL(imageRef)

                    return {
                        name,
                        goodVotes,
                        lawfulVotes,
                        pictureURL
                    }
                }))

                setUserList(usableList) 
                console.log(usableList) 
            } catch(err) {
                console.log(err)
            }   
        }
        getUserList()
    }, [])



    const userElements = userList.map(user => {
        const {goodVotes, lawfulVotes, name, pictureURL} = user
        return( <User key={name} goodVotes={goodVotes} lawfulVotes={lawfulVotes} name={name} pictureURL={pictureURL} />)
    })


    return (
        <div className="grouppage">
            {groupName}
            <div className="chart">
                {userElements}
            </div>
            
        </div>
    )
}
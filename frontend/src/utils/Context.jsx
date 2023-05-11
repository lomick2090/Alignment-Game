import { createContext, useState, useEffect, useContext } from "react";
import { getDocs, collection } from "firebase/firestore"
import { ref, getDownloadURL } from 'firebase/storage'
import { db, storage } from "../config/firebase"

const UserContext = createContext();

function UserContextProvider({children}) {
    const [userList, setUserList] = useState([])
    const usersRef = collection(db, 'users')

    async function getUserList() {
        try {

            const data = await getDocs(usersRef)
            const filteredList = data.docs.filter(user => {
               return user.data()
            })

            
            let usableList = await Promise.all(filteredList.map(async user => {
                const {goodVotes, lawfulVotes, name, pictureURL, userId, group, votes} = user.data()

                return {
                    name,
                    goodVotes,
                    lawfulVotes,
                    pictureURL,
                    userId,
                    group,
                    votes
                }
            }))
            

            setUserList(usableList) 
        } catch(err) {
            console.log(err)
        }   
    }

    useEffect(() => {
        getUserList()
    }, [])

    console.log(userList)

    return (
        <UserContext.Provider value={userList}>
            {children}
        </UserContext.Provider>
    )
}

function userContext() {
    const context = useContext(UserContext)
    return context
}
  

export { userContext as useUserContext , UserContextProvider }
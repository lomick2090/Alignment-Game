import { createContext, useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"

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
                const {name, pictureURL, userId, groups, votes} = user.data()

                return {
                    name,
                    pictureURL,
                    userId,
                    groups,
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
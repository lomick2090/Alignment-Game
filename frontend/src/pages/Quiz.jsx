import { useState, useEffect } from 'react';
import { db } from "../config/firebase"
import { getDocs, collection } from 'firebase/firestore'

export default function Quiz() {
    const [userList, setUserList] = useState([]);

    const userCollectionRef = collection(db, "users")

    useEffect(() => {
        async function getMovieList() {
            try {
                const data = await getDocs(userCollectionRef);
                const filteredData = data.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                })
                setUserList(filteredData)
            } catch (err) {
                console.log(err)
            }
        }
        getMovieList()
    }, [])



    return (
        <div>
            
        </div>
    )
}
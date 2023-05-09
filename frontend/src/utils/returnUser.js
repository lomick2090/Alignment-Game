import { db, auth } from "../config/firebase";
import { getDocs, collection } from 'firebase/firestore'


export default function checkIfUser() {
    let answer
    let data
    const id = auth?.currentUser?.uid
    const usersRef = collection(db, 'users');
    
    async function getData() {
        const getdata = await getDocs(usersRef)
        data = getdata
    }
    getData()
    console.log(data)
    const filteredData = data.docs.map(doc => (doc.data()))
    filteredData.forEach(user => {
        (user.userId == id) ? 
        answer = user :
        answer = null
    })
    return answer
}

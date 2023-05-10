import { db, auth } from "../config/firebase";
import { getDocs, collection } from 'firebase/firestore'


export default function returnUser(userList) {
    let answer = false;
    let id = auth?.currentUser?.uid
    
    userList.forEach(user => {
        if (user.userId == id) {
            answer = user
        }
    })
        
    return answer
}
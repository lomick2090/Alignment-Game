import { auth } from "../config/firebase";


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
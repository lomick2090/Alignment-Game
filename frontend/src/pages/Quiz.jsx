import { useUserContext } from '../utils/Context';
import returnUser from '../utils/returnUser';
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import QuizUnit from '../components/QuizUnit';


export default function Quiz() {
    const userList = useUserContext()
    const currentUser = returnUser(userList)
    const { groupName } = useParams()

    const filteredUserList = userList.filter(user => {
        if (currentUser == user || groupName != user.group) {
            return false
        } else {
            return true
        }
    })

    console.log(filteredUserList)
    const [voteInfo, setVoteInfo] = useState(filteredUserList.map(user => {
        return {
            name: user.name,
            goodVote: 10,
            lawfulVote: 10 
        }
    }))

    console.log(voteInfo)

    const quizElements = filteredUserList.map((user, index) => {
        return <QuizUnit 
                key={user.userId} 
                user={user} 
                voteInfo={voteInfo[index]} 
                setVoteInfo={setVoteInfo}
                index={index} 
            />
    })

    
    return (
        <div>
           <h1>{groupName} Assessment</h1>
            {quizElements}
        </div>
    )
}
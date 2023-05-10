import { useUserContext } from '../utils/Context';
import returnUser from '../utils/returnUser';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import QuizUnit from '../components/QuizUnit';


export default function Quiz() {
    const [voteInfo, setVoteInfo] = useState([])
    const userList = useUserContext()
    const currentUser = returnUser(userList)
    const { groupName } = useParams()

    const filteredUserList = userList.filter(user => {
        if (/*currentUser == user ||*/ groupName != user.group) {
            return false
        } else {
            return true
        }
    })

    useEffect(() => {
        const votes = filteredUserList.map(user => {
            return {
                name: user.name,
                goodVote: 10,
                lawfulVote: 10 
            }
        })
        setVoteInfo(votes)

    }, [userList])

    function handleSubmit() {

    }
    
    const quizElements = filteredUserList.map((user, index) => {
        return <QuizUnit 
                key={user.name} 
                user={user} 
                voteInfo={voteInfo[index]} 
                setVoteInfo={setVoteInfo}
                index={index} 
            />
    })

    
    return (
        <div className="container quizpage">
           <h1>{groupName} quiz</h1>
            {quizElements}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
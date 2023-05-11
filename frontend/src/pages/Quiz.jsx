import { useUserContext } from '../utils/Context';
import returnUser from '../utils/returnUser';
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import QuizUnit from '../components/QuizUnit';
import { db } from '../config/firebase'
import { setDoc, doc } from 'firebase/firestore';


export default function Quiz() {
    const [voteInfo, setVoteInfo] = useState([])
    const userList = useUserContext()
    const currentUser = returnUser(userList)
    const { groupName } = useParams()

    const filteredUserList = userList.filter(user => {
        const hasVoted = user.votes.filter(id => (id == auth.currentUser?.uid))
        if (currentUser == user || groupName != user.group || hasVoted) {
            return false
        } else {
            return true
        }
    })

    useEffect(() => {
        const votes = filteredUserList.map(user => {
            return {
                name: user.name,
                group: user.group,
                goodVote: 10,
                lawfulVote: 10,
                oldGoodVotes: user.goodVotes,
                oldLawfulVotes: user.lawfulVotes,
                userId: user.userId,
                pictureURL: user.pictureURL,
                votes: user.votes
            }
        })
        setVoteInfo(votes)

    }, [userList])

    function handleSubmit() {
        voteInfo.map(async user => {
            const usersRef = doc(db, 'users', user.userId);
            const newGoodVotes = user.oldGoodVotes.concat(user.goodVote)
            const newLawfulVotes = user.oldLawfulVotes.concat(user.lawfulVote)
            const newUserVotes = user.votes.concat(auth.currentUser?.uid)
            await setDoc(usersRef, {
                name: user.name,
                group: user.group,
                lawfulVotes: newGoodVotes,
                goodVotes: newLawfulVotes,
                userId: user.userId,
                pictureURL: user.pictureURL,
                votes: newUserVotes
            })
            
            
        })
        window.location.href = '..'
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
            {
                (filteredUserList.length > 0) ?
                <div>
                {quizElements}
                <button onClick={handleSubmit}>Submit</button>
                </div>
                :
                <div>
                    <p>You have already voted on all possible users!</p>
                    <Link to={`../groups/${groupName}`}>Back</Link>
                </div>
            }
        </div>
    )
}
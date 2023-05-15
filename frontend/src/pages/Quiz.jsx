import { useUserContext } from '../utils/Context';
import returnUser from '../utils/returnUser';
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import QuizUnit from '../components/QuizUnit';
import { db, auth } from '../config/firebase'
import { setDoc, doc } from 'firebase/firestore';


export default function Quiz() {
    const [voteInfo, setVoteInfo] = useState([])
    const userList = useUserContext()
    const currentUser = returnUser(userList)
    const { groupName } = useParams()

    const copyList = userList
    const filteredUserList = copyList.filter(user => {
        const groupVotes = user.votes.find(groupVote => (groupVote.group == groupName))
        const hasVoted = groupVotes?.hasVoted.includes(auth?.currentUser?.uid)
        
        if (currentUser == user || !groupVotes || hasVoted) {
            return false
        } else {
            return true
        }
    })

    useEffect(() => {
        const votes = filteredUserList.map(user => {
            return {
                name: user.name,
                groups: user.groups,
                goodVote: 10,
                lawfulVote: 10,
                userId: user.userId,
                pictureURL: user.pictureURL,
                votes: user.votes
            }
        })
        setVoteInfo(votes)

    }, [userList])

    async function handleSubmit() {
        voteInfo.map(async user => {
            const usersRef = doc(db, 'users', user.userId);
            const newUserVotes = user.votes.map(groupVotes => {
                if (groupVotes.group == groupName) {
                    const newLawfulVotes = groupVotes.lawfulVotes.concat(user.lawfulVote)
                    const newGoodVotes = groupVotes.goodVotes.concat(user.goodVote)
                    const newHasVoted = groupVotes.hasVoted.concat(auth?.currentUser?.uid)
                    return {
                        group: groupName,
                        lawfulVotes: newLawfulVotes,
                        goodVotes: newGoodVotes,
                        hasVoted: newHasVoted
                    }
                } else {
                    return groupVotes
                }
            })
            await setDoc(usersRef, {
                name: user.name,
                groups: user.groups,
                userId: user.userId,
                pictureURL: user.pictureURL,
                votes: newUserVotes
            })
        })
        
        setTimeout(() => {
            window.location.href = `../../groups/${groupName}`
        }, 1000)

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
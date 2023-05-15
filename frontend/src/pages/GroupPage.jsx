import { useParams, Link } from "react-router-dom"
import { db, auth } from "../config/firebase"
import { useUserContext } from "../utils/Context"
import returnUser from "../utils/returnUser"
import User from '../components/User'


export default function GroupPage() {
    const { groupName } = useParams()
    const userList = useUserContext()

    const userCopy = userList
    const userListOfGroup = userCopy.filter(user => {
        return user.groups.includes(groupName)
    })

    const userElements = userListOfGroup.map(user => {
        
            const {votes, name, pictureURL} = user

            const groupVotes = votes.find(groupVote => (groupVote.group == groupName))
            const { goodVotes, lawfulVotes } = groupVotes
            return( <User key={name} goodVotes={goodVotes} lawfulVotes={lawfulVotes} name={name} pictureURL={pictureURL} />)
    })

    async function handleJoin() {
        const user = returnUser(userList)
        if (user.groups.length > 4) {
            alert('You can only join 5 groups')
        } else {
            const newgroups = user.groups.concat(groupName)
            const usersRef = doc(db, 'users', user.userId);
            const newVotes = user.votes.concat({group:groupName, lawfulVotes:[], goodVotes:[], hasVoted:[]})
            await setDoc(usersRef, {
                    name: user.name,
                    groups: newgroups,
                    userId: user.userId,
                    pictureURL: user.pictureURL,
                    votes: newVotes
            })
            location.reload()
        }
        
    }

    

    return (
        <div className="grouppage">
            
                <h1 style={{fontSize: 'min(11vw, 10vh',}}>{groupName}</h1>
                {
                    (auth?.currentUser?.uid && userList)
                    &&
                    (
                        !((returnUser(userList)) ? true : false) ? 
                        <Link to='../../login/createprofile'><button>Create Profile</button></Link>
                        :
                        (
                            (returnUser(userList).groups.includes(groupName)) ?
                            <Link to='quiz'><button>Take Group Quiz</button></Link>
                            :
                            <button onClick={handleJoin}>Join Group</button>
                        )
                    )


                }
            
            <div className="chart">
                {userElements}
            </div>
            
        </div>
    )
}
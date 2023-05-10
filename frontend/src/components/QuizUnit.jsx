
export default function QuizUnit(props) {
    console.log(props)

    function setValue(e) {
        const { value, name } = e.target
        props.setVoteInfo(prevVotes => {
            let tempVotes = [...prevVotes]
            tempVotes[index] = {
                ...tempVotes[index],
                [name]: value
            }
            return tempVotes
        })
    }

    return (
        <div>
            <h2>{props.user.name}</h2>

            <p>Goodness Score:</p>
            <input
                type="range"
                name='goodVote'
                min={0}
                max={20}
                onChange={(e) => setValue(e)}
                value={props.voteInfo.goodVote.value}
            />

            <p>Lawfulness Score:</p>
            <input
                type="range"
                name='lawfulVote'
                min={0}
                max={20}
                onChange={(e) => setValue(e.target.value)}
                value={props.voteInfo.lawfulVote.value}
            />
        </div>
    )
    
}
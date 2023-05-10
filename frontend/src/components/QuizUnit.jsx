
export default function QuizUnit(props) {

    function setValue(e) {
        const { value, name } = e.target
        props.setVoteInfo(prevVotes => {
            let tempVotes = [...prevVotes]
            tempVotes[props.index] = {
                ...tempVotes[props.index],
                [name]: value
            }
            return tempVotes
        })
    }
    return (
        <div className='quizunit'>
            <h2>{props.user.name}</h2>
            <img src={props.user.pictureURL} />

            <p>Goodness Score:</p>
            <input
                type="range"
                name='goodVote'
                min={0}
                max={20}
                onChange={(e) => setValue(e)}
                value={props.voteInfo?.goodVote}
            />

            <p>Lawfulness Score:</p>
            <input
                type="range"
                name='lawfulVote'
                min={0}
                max={20}
                onChange={(e) => setValue(e)}
                value={props.voteInfo?.lawfulVote}
            />

            <br />
            <br />
        </div>
    )
    
}
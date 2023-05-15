import { useState } from 'react'

export default function User(props) {
    const [hovered, setHovered] = useState(false);

    function toggleHover() {
        setHovered(prevHover => !prevHover)
    }


    const avgLawful = ((props.lawfulVotes?.reduce((a,b) => parseInt(a) + parseInt(b), 0))/(props.lawfulVotes?.length)) || 10
    const avgGood = ((props.goodVotes?.reduce((a,b) => parseInt(a) + parseInt(b), 0))/(props.goodVotes?.length)) || 10
    const userStyle = {
        backgroundImage: `url(${props.pictureURL})`,
        position: 'absolute',
        right: `${avgLawful * 4.75}%`,
        bottom: `${avgGood * 4.75}%`,
        width: 'min(4.5vw, 4vh)',
        height: 'min(4.5vw, 4vh)',
        backgroundSize: 'min(4.5vw, 4vh), min(4.5vw, 4vh)',
        borderRadius: '50%'
    }

    const picStyle = {
        width: '115px',
        maxHeight: '135px',
        borderRadius: '40%',
    }

    const userClass = (
        'userinfo ' +(avgGood < 4 ? 'userinfotop ' : '') + (avgLawful < 4 ? 'userinfoleft' : '')
    )

    return (
        <div 
            style={userStyle}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            {
                (hovered)
                &&
                <div className={userClass}>
                    <img src={props.pictureURL} style={picStyle} />
                    <h2>{props.name}</h2>
                    <p>Good Score: {Math.round((avgGood -10) * 100 ) / 100}</p>
                    <p>Lawful Score: {Math.round((avgLawful -10) * 100) / 100}</p>
                </div>
            }
        </div>
    )
    
}
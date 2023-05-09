import { useState } from 'react'

export default function User(props) {
    const [hovered, setHovered] = useState(false);

    function toggleHover() {
        setHovered(prevHover => !prevHover)
    }



    const avgLawful = ((props.lawfulVotes.reduce((a,b) => a + b, 0))/(props.lawfulVotes.length)) || 0
    const avgGood = ((props.goodVotes.reduce((a,b) => a + b, 0))/(props.goodVotes.length)) || 0
    //min(90vw, 80vh)

    const userStyle = {
        backgroundImage: `url(${props.pictureURL})`,
        position: 'absolute',
        left: `${avgLawful * 4.75}%`,
        top: `${avgGood * 4.75}%`,
        width: 'min(4.5vw, 4vh)',
        height: 'min(4.5vw, 4vh)',
        backgroundSize: 'min(4.5vw, 4vh), min(4.5vw, 4vh)',
        borderRadius: '50%'
    }

    const picStyle = {
        width: '115px',
        borderRadius: '40%',
    }

    const userClass = (
        'userinfo ' +(avgGood > 16 ? 'userinfotop ' : '') + (avgLawful > 16 ? 'userinfoleft' : '')
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
                    <p>Good Score: {-(avgGood -10)}</p>
                    <p>Lawful Score: {-(avgLawful -10)}</p>
                </div>
            }
        </div>
    )
    
}
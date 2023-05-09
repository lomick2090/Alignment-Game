import { useState } from 'react'

export default function User(props) {
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(false)

    function toggleHover() {
        setHovered(prevHover => !prevHover)
    }

    function toggleSelected() {
        setSelected(prevSelect => !prevSelect)
    }

    const avgLawful = ((props.lawfulVotes.reduce((a,b) => a + b, 0))/(props.lawfulVotes.length)) || 0
    const avgGood = ((props.goodVotes.reduce((a,b) => a + b, 0))/(props.goodVotes.length)) || 0
    //min(90vw, 80vh)

    const styles = {
        backgroundImage: `url(${props.pictureURL})`,
        position: 'absolute',
        left: `${avgLawful * 4.75}%`,
        top: `${avgGood * 4.75}%`,
        width: 'min(4.5vw, 4vh)',
        height: 'min(4.5vw, 4vh)',
        backgroundSize: 'min(4.5vw, 4vh), min(4.5vw, 4vh)',
        borderRadius: '50%'
    }

    return (
        <div 
            style={styles}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            {
                (hovered || selected)
                &&
                <div className={avgGood < 4  ? 'userinfo userinfobottom' : 'userinfo'}>
                    <img src={`url(${props.pictureURL})`} width={'20px'}/>
                    <h2>{props.name}</h2>
                </div>
            }
        </div>
    )
    
}
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase';
import { useUserContext } from '../utils/Context';
import returnUser from '../utils/returnUser';

export default function Home() {
    const userList = useUserContext();
    return (
        <div className="container home" >
            <p>
                Welcome to Alignment With Friends, the perfect way to find out how your friends match up on the classic Dungeons & Dragons alignment scale! 
                This quiz is great for getting to know your friends better and finding out where everyone stands when it comes to questions of lawfulness
                and goodness. 
            </p>

            <p>
                Here's how it works: you'll answer a series of questions that ask you to rate your friends on a scale from chaotic to lawful and from evil to good. Based on your answers, we'll generate a visual representation of where you and your friends fall on the alignment chart.
                Will you be a chaotic good rebel, a lawful evil mastermind, or something in between? There's only one way to find out! Take the quiz with your friends and compare your results to see how you all match up.

            </p>
            <p>
                Once you've completed the quiz, you'll be able to see and discuss the results and what they might mean for your friendships or group dynamics.
                So what are you waiting for? Take the alignment quiz now and find out where you and your friends stand on the classic D&D alignment chart!
            </p>
            <div className='homebuttons'>
            
                {
                    (!auth?.currentUser || !returnUser(userList))
                    &&
                    <Link to='login'><button>Sign Up Now!</button></Link>
                }
                    <Link to='groups'><button>View Groups</button></Link>
            </div>
        </div>
    )
}
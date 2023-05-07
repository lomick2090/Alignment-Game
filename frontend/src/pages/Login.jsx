import Auth from '../components/Auth'
import { auth } from '../config/firebase'
import { Navigate } from 'react-router-dom'


export default function Login() {
    return (
        <div>
            {
                auth?.currentUser?.id ?
                <Navigate to='login/createprofile' />
                :
            
                <Auth />
            }
        </div>
    )
}
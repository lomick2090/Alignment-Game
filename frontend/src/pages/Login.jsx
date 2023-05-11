import Auth from '../components/Auth'
import { auth } from '../config/firebase'
import { Navigate, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import CreateProfile from './CreateProfile'



export default function Login() {
    const [userId, setUserId] = useState(auth?.currentUser?.uid)
    
    return (
        <div>
            {
                userId ? 
                <Navigate to='createprofile' />
                :
            
                <Auth setUserId={setUserId} />
            }

            <Routes>
                <Route path='createprofile' element={<CreateProfile />}/>
            </Routes>
        </div>
    )
}
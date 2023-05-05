import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'

export default function Auth() {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target
        setLogin(prevLogin => {
            return {
                ...prevLogin,
                [name]: value
            }
        })
    }

    async function signIn() {
        await createUserWithEmailAndPassword(auth, login.email, login.password)


    }

    return (
        <div>
            <input placeholder="email" name='email' value={login.email} onChange={handleChange}/>
            <input type="password" placeholder="password" name='password' value={login.password} onChange={handleChange}/>
            <button onClick={signIn}>Sign In</button>
        </div>
    )
}
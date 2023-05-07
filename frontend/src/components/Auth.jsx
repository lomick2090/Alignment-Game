import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'
import { signInWithPopup, TwitterAuthProvider } from "firebase/auth";

export default function Auth(props) {
    
   // const [login, setLogin] = useState({
   //     email: '',
   //     password: ''
   // })

   console.log(auth?.currentUser?.uid)

    const provider = new TwitterAuthProvider();

    async function signIn() {
        //await createUserWithEmailAndPassword(auth, login.email, login.password)
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const secret = credential.secret;

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            props.setUserId(user.uid)
        }).catch((error) => {
            // Handle Errors here.
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);
            // ...
        });

    }

    return (
        <div>
            {/* <input placeholder="email" name='email' value={login.email} onChange={handleChange}/>
            <input type="password" placeholder="password" name='password' value={login.password} onChange={handleChange}/> */}
            <button onClick={signIn}>Sign In With Twitter</button>
        </div>
    )
}
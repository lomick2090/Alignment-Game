import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Header from './components/Header'
import Quiz from './pages/Quiz'
import Home from './pages/Home'
import Create from './pages/Create'
import Login from './pages/Login'
import Groups from './pages/Groups'
import CreateProfile from './pages/CreateProfile'



export default function App() {

    
    return (
        <Routes>
            <Route path='/' element={ <Header /> }>
                <Route index element={<Home />}/>
                <Route path='quiz' element={ <Quiz /> } />
                <Route path='create' element={ <Create /> } />
                <Route path='login' element={ <Login /> }>
                    <Route path='createprofile' element={ <CreateProfile />} />
                </Route>
                
                <Route path='groups' element={ <Groups /> } />
                <Route path='*' element={<Navigate to='/' />} />

            </Route>
        </Routes>
    )
}
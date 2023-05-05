import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header'
import Quiz from './pages/Quiz'
import Home from './pages/Home'
import Create from './pages/Create'
import Login from './pages/Login'

export default function App() {
    return (
        <Routes>
            <Route path='/' element={ <Header /> }>
                <Route index element={<Home />}/>
                <Route path='quiz' element={ <Quiz /> } />
                <Route path='create' element={ <Create /> } />
                <Route path='login' element={ <Login /> } />

            </Route>
        </Routes>
    )
}
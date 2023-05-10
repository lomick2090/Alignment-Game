import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { UserContextProvider } from './utils/Context';
import Header from './components/Header'
import Quiz from './pages/Quiz'
import Home from './pages/Home'
import Create from './pages/Create'
import Login from './pages/Login'
import Groups from './pages/Groups'
import GroupPage from './pages/GroupPage'



export default function App() {

    
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/*' element={ <Header /> }>
                    <Route index element={<Home />}/>
                    <Route path='create' element={ <Create /> } />
                    <Route path='login/*' element={ <Login /> } />   
                    <Route path='groups/*' element={ <Groups /> } />
                    <Route path='groups/:groupName' element={<GroupPage />} />
                    <Route path='groups/:groupName/quiz' element={<Quiz />} />

                </Route>
            </Routes>
        </UserContextProvider>
    )
}
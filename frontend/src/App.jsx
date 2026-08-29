import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth_pages/Auth'

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Auth/>} />
       <Route path='/login' element={<Auth/>}/>
       <Route path='/register' element={<Auth/>} />
     </Routes>
    </BrowserRouter>
  )
}

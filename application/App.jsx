// import React from 'react';
import { useState } from 'react'
// import './App.css'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/Home",
    element: <Home />
  }
])


export function App() {
  return(
    <RouterProvider router={routes}/>
  )
}

export default App
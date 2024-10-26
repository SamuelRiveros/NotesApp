// import React from 'react';
import { useState } from 'react'
// import './App.css'

import { Home } from './pages/Home'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
])


export function App() {
  return(
    <RouterProvider router={routes}/>
  )
}

export default App
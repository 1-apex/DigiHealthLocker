import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "../src/Store/AuthClient"

import App from './App'

if (typeof window !== undefined) {
    ReactDOM.hydrateRoot(document.getElementById('root'), <BrowserRouter><AuthProvider><App /></AuthProvider></BrowserRouter >)
}



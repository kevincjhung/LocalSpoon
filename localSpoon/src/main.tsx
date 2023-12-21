import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = () => <div><p>Home</p></div>
const About = () => <div><p>About</p></div>


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/About"  element={<About />} />
      </Routes>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

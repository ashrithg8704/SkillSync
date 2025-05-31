import React from 'react'
import ReactDOM from 'react-dom/client'
import SkillSync from './SkillSync.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SkillSync />
    </BrowserRouter>
  </React.StrictMode>
)

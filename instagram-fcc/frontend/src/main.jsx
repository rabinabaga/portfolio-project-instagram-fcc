import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalDataProvider from './context/GlobalDataProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  
   <GlobalDataProvider>
    <App/>
   </GlobalDataProvider>
  
)

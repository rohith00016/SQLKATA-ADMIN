import React from 'react'
import ReactDOM from 'react-dom/client'
import CommonProvider from './contextApi/CommonProvider'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CommonProvider>
    <App />
    </CommonProvider>
  </React.StrictMode>,
)

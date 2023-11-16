import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import Theme from '@/theme.jsx'
import themeConfig from '../theme-config.js'

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
    <React.StrictMode>
        <Theme themes={ themeConfig }>
            <App />
        </Theme>
    </React.StrictMode>,
)

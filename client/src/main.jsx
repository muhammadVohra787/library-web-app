import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.jsx'
import Theme from '@/theme.jsx'
import themeConfig from '../theme-config.js'

const domNode = document.getElementById( 'root' )
const root = createRoot( domNode )
root.render(
    <React.StrictMode>
        <Theme themes={ themeConfig }>
            <App />
        </Theme>
    </React.StrictMode>,
)

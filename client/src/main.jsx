import React from 'react'
import { createRoot } from 'react-dom/client'
import Theme from '@/theme.jsx'
import themeConfig from '../theme-config.js'
import { RouterProvider } from 'react-router-dom'
import mainRouter from './main-router.jsx'

import './index.css'

const domNode = document.getElementById( 'root' )
const root = createRoot( domNode )
root.render(
    <React.StrictMode>
        <Theme themes={ themeConfig }>
            <RouterProvider router={ mainRouter } />
        </Theme>
    </React.StrictMode>,
)

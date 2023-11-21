import React from "react"
import ReactDOM from "react-dom"
import App from "@/App.jsx"
import Theme from "@/theme.jsx"
import themeConfig from "../theme-config.js"

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    <React.StrictMode>
        <Theme themes={ themeConfig }>
            <App />
        </Theme>
    </React.StrictMode>,
    document.getElementById("root" )
);

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import alias from '@rollup/plugin-alias'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import config from '../config/config'

// Use root .env
// const env = fs.existsSync( '../.env' ) ? dotenv.config( { path: '../.env' } ).parsed : {}
const { PORT = 3000, apiEndpointUrl = '/api' } = config

const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

// https://vitejs.dev/config/
export default defineConfig( {
    // base: './',l

    build: {
        outDir: '../client-dist/app',
    },
    // Replace variables on build
    define: {
        API_ENDPOINT_URL: JSON.stringify( apiEndpointUrl ),
    },
    server: {
        proxy: {
            '/api': {
                target: `http://localhost:${PORT}`,
                changeOrigin: true,
            },
            '/auth': {
                target: `http://localhost:${PORT}`,

                changeOrigin: true,
            },

        },
    },
    plugins: [
        react(),
        alias( {
            entries: [
                { find: '@', replacement: path.resolve( __dirname, 'src' ) },
            ],
        } ),
    ],
} )

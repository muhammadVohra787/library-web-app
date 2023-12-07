import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import alias from '@rollup/plugin-alias'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
const { parsed: env } = dotenv.config()

// eslint-disable-next-line no-undef
const { PORT = 3000 } = env

const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

// https://vitejs.dev/config/
export default defineConfig( {
    build: {
        outDir: '../client-dist/app',
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

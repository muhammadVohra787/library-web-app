import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import alias from '@rollup/plugin-alias'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filename )

// https://vitejs.dev/config/
export default defineConfig( {
    build: {
        outDir: '../client-dist/app',
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

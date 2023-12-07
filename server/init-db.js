// Executed from package.json
import { connectDB, closeDBConnection } from './db.js'
connectDB().then( closeDBConnection )

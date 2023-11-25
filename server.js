/**
 * App Entrypoint
 */
import config from "./server/config/config.js";
import { connectDB } from "./server/db.js";
import app from "./server/express.js";

connectDB();
app.get("/", (req, res) => {
    res.json({ message: "Welcome to this application." });
});

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info("Server started on port %s.", config.port);
    console.info("Waiting for DB connection...");
});

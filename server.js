/**
 * App Entrypoint
 */
import mongoose from "mongoose";
import config from "./server/config/config.js";
import app from "./server/express.js";

mongoose.Promise = global.Promise;

mongoose
    .connect(config.mongoUri, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database!");
    });

mongoose.connection.on("error", () => {
    console.log(config.mongoUri);
    throw new Error("unable to connect to database: ${config.mongoUri}");
});

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

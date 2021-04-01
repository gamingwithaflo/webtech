import fs from "fs";
import dotenv from "dotenv";

// set dotenv config
if (fs.existsSync(".env")) {
    //TODO logger
    console.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

// environment variables
export const SERVER_PORT = process.env.PORT || 8080;
export const SESSION_SECRET = process.env.SESSION_SECRET || "verysecret";

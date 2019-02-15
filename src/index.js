import { start } from './server'
import express from "express";
import { config } from "dotenv"

config()

start(process.env.ConnectionString)

const app = express()

app.get('/', async (req, res) => {
    res.send("Hello World!");
});

// Start the server, listen at port 3000 (-> http://127.0.0.1:3000/)
// Also print a short info message to the console (visible in
// the terminal window where you started the node server).
app.listen(3001, () => console.log('Node.js listening on port 3001!'))

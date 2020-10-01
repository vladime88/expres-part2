// import de express
import express from 'express'
import fs from 'fs/promises'

const LOG_FILE = 'access-log.txt'

// timer middleware
const timer = (req, res, next) => {
    const date = new Date()
    req.requestDate = date.toUTCString()
    next()
}

// logger middleware
const logger = async (req, res, next) => {
    try {
        const log = `${req.requestDate} ${req.method} "${req.originalUrl}" from ${req.ip} ${req.headers['user-agent']}\n`
        await fs.appendFile(LOG_FILE, log, 'utf-8')
    } catch (e) {
        console.error(`Error: can't write in ${LOG_FILE}`)
    } finally {
        next()
    }
}

// shower middleware
const shower = async (req, res, next) => {
    const log = `${req.requestDate} ${req.method} "${req.originalUrl}" from ${req.ip} ${req.headers['user-agent']}`
    console.log(log)
    next()
}

const app = express()
const IP = '192.168.1.13'
const PORT = 7777

// use timer middleware for all routes in the app
app.use(timer)

//use logger middleware for all routes in the app
app.use(logger)

//use shower middleware for the route for path /bye
app.use('/bye', shower)

app.get('/hello', (req, res) => {
    res.send(`Hello ${req.ip}`)
})

app.get('/bye', (req, res) => {
    res.send(`Goodbye ${req.requestDate}`)
})

app.listen(PORT, IP, () => {
    //exécution d'un affichage au lacement du serveur.
    console.log(`Example app listening at http://${IP}:${PORT}`)
})

import express from 'express'
import fs from 'fs/promises'
import { calc } from './calc.js'

const app = express()

const IP_LOCAL = '192.168.1.13'
const PORT = 7777

/*
const sendMessage = async (req) => {
try


}
*/

app.get('/', (req, res) => {
    res.send(`Exercices express Part 2`)
})

app.get('/get_current_time', (req, res) => {
    const date = new Date()
    const actualdate = date.toUTCString()
    res.send(`${actualdate}`)
})

app.get('/how_pass_data', (req, res) => {
    res.send(`en utilisant next()....`)
})

app.listen(PORT, IP_LOCAL, () => {
    console.log(`Example app listening at http://${IP_LOCAL}:${PORT}`)
})

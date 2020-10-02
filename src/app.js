import express from 'express'
import { calc } from './calc.js'
const app = express()

const IP_LOCAL = '192.168.1.13'
const PORT = 7777

const sendMessage = (req, res) => {
    res.send(req.message)
}

const wrappWithHtml = (req, res, next) => {
    const html = `
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Exercices express 2</title>
  </head>

  <body>
    <p>${req.message}</p>
  </body>
</html>`
    req.message = html
    next()
}

app.get('/', (req, res, next) => {
    req.message = `Exercices express Part 2`
    // res.send(`Exercices express Part 2`)
    next()
})

app.get('/get_current_time', (req, res, next) => {
    const date = new Date().toUTCString()
    req.message = date
    next()
})

app.get('/how_pass_data', (req, res, next) => {
    const msg = `on peut passer des données entre les middleware grâce aux objets req, res que l'on peut eux même modifier`
    req.message = msg
    next()
})

/*
app.get('/calc', (req,res,next)=>{


})
*/
app.use('/calc', calc)
app.use(wrappWithHtml)
app.use(sendMessage)

app.listen(PORT, IP_LOCAL, () => {
    console.log(`Example app listening at http://${IP_LOCAL}:${PORT}`)
})

const express = require("express")
const path = require("path")
const socket = require("socket.io")
const axios = require('axios')
const cheerio = require("cheerio")
const CronJob = require('cron').CronJob

const app = express()
app.use(express.static('static'))

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static/pages/index.html"))
})

app.get("/service-worker", (req, res) => {
    res.sendFile(path.join(__dirname, "static/js/sw.js"))
})

const server = app.listen(PORT, ()=>console.log("Server has started on port " + PORT))

const io = socket(server)

io.on("connection", (socket) => {
    console.log("Socket connexion was established...")

    let quotes = []
    axios.get("https://type.fit/api/quotes")
    .then((res) => {
        quotes = res.data
    })
    .catch(error => console.log(error))

    let job = null
    socket.on("trigger", () => {
        console.log(`User ${socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address} just subscribed!`)
        job = new CronJob('*/10 * * * * *', () => {
            const date = (new Date()).toISOString()
            console.log("sent a new notification at: " + date.slice(0,10) + " - " + date.slice(11,19))
            const quote = quotes.pop()
            axios.get("https://unsplash.com/s/photos/" + quote.author).then(res => {
                const html = cheerio.load(res.data)
                const image = html("._2UpQX")[0].attribs.src
                console.log(image)
                socket.emit("notify", {"quote": quote, "image": image})
            })    
          }, null, true)
        job.start()
    })
    socket.on("unsubscribe", () => {
        job.stop()
        console.log(`User ${socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address} has unsubscribed!`)
    })
})
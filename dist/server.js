const http = require("http")
const fs = require("fs")
const path = require("path")


//Read image
const imageDirectory = path.join(__dirname, 'images')
const readImage = async (fileName) => {
    try {
        const filePath = path.join(imageDirectory, fileName)
        const data = await fs.promises.readFile(filePath)
        return data
    }
    catch (err) {
        console.error(err)
        return
    }
}



const server = http.createServer((req, res) => {
    console.log("server actived", req.url)

    if (req.url === "/") {
        res.writeHead(200, { "content-type": "text/html" })
        res.write("<h1>Hello!</h1>")
        res.end()
        return
    }

    if (req.url === "/view-image" && req.method === "GET") {
        readImage("veryhappydog.jpg").then(data => {
            res.writeHead(200, { "content-type": "image/jpeg" })
            res.end(data)
        }).catch(err => {
            console.log(err)
        })
        return
    }
})

server.listen(3000, () => {
    console.log("server's running")
})
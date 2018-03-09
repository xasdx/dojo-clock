let express = require("express")
let app = express()

let port = process.env["PORT"] || 3210

app.use(express.static("static"))

let listen = () => {
  let server = app.listen(port, () => console.log(`Server up on port ${port}`))
  return { server, port }
}

if (require.main === module) {
  listen()
}

module.exports = listen

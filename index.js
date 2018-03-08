let express = require("express")
let app = express()

let port = process.env["PORT"] || 3210

app.use(express.static("static"))

app.listen(port, () => console.log(`Server up on port ${port}`))

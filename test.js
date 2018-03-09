let { expect } = require("chai")
let { JSDOM } = require("jsdom")
let fs = require("fs")

let { server, port } = require(".")()
 
let html = fs.readFileSync("./static/index.html", "utf-8")

let dom = null

module.exports = {
  "beforeEach": () => {
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable", url: `http://localhost:${port}` })
  },
  "afterEach": () => dom.window.close(),
  "after": () => server.close(),
  "Index html": {
    "displays the time": done => {
      let clockRef = dom.window.document.getElementById("clock")
      setTimeout(() => {
        expect(clockRef.innerHTML).to.equal("05:13:01")
        setTimeout(() => {
          expect(clockRef.innerHTML).to.equal("05:13:02")
          done()
        }, 1100)
      }, 2100)
    },
    "allows setting in an input field how many seconds one tick advances forward in time": done => {
      let clockRef = dom.window.document.getElementById("clock")
      let stepRef = dom.window.document.getElementById("step")
      setTimeout(() => {
        expect(clockRef.innerHTML).to.equal("05:13:00")
        stepRef.value = "5"
        stepRef.dispatchEvent(new dom.window.Event("change"))
        setTimeout(() => {
          expect(clockRef.innerHTML).to.equal("05:13:05")
          stepRef.value = "-10"
          stepRef.dispatchEvent(new dom.window.Event("change"))
          setTimeout(() => {
            expect(clockRef.innerHTML).to.equal("05:12:65")
            done()
          }, 1100)
        }, 1100)
      }, 1100)
    }
  }
}

let { expect } = require("chai")

let Clock = require("./clock")

module.exports = {
  "Clock component": {
    "returns the actual time in the format: 'hh:mm:ss'": () => {
      let clock = new Clock()
      expect(clock.getTime()).to.match(/\d\d:\d\d:\d\d/)
    },
    "allows setting an initial time": () => {
      let clock = new Clock("13:37:42")
      expect(clock.getTime()).to.equal("13:37:42")
    },
    "updates its state in real time": done => {
      let clock = new Clock("13:37:42")
      setTimeout(() => {
        expect(clock.getTime()).to.equal("13:37:44")
        done()
      }, 2250)
    },
    "tracks a time that has 70 seconds per minutes and 80 minutes per hours": done => {
      let clock = new Clock("13:78:69")
      setTimeout(() => {
        expect(clock.getTime()).to.equal("13:79:01")
        done()
      }, 2250)
    },
    "registers observers being called on every update": done => {
      let clock = new Clock("13:78:69")
      let timesOfObservation = 0
      clock.observe(time => {
        expect(time).to.match(/\d\d:\d\d:\d\d/)
        timesOfObservation += 1
      })
      setTimeout(() => {
        expect(timesOfObservation).to.equal(3)
        done()
      }, 3250)
    }
  }
}

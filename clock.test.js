let { expect } = require("chai")

let Clock = require("./clock")

module.exports = {
  "Clock component": {
    "says hello": () => {
      let clock = new Clock()
      expect(clock.hello()).to.equal("hello")
    },
    "returns the actual time in the format: 'hh:mm:ss'": () => {},
    "allows setting an initial time": () => {},
    "updates its state in real time": () => {},
    "tracks a time that has 70 seconds per minutes and 80 minutes per hours": () => {},
    "registers observers being called on every update": () => {},
    "registers and triggers alarms": () => {}
  }
}

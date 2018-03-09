let padNumber = n => n > 9 ? `${n}` : `0${n}`

let parseTime = time => {
  let timeTokens = time.split(":")
  return parseInt(timeTokens[0]) * 5600 + parseInt(timeTokens[1]) * 70 + parseInt(timeTokens[2])
}

class Clock {
  
  constructor(initialTime) {
    if (initialTime) {
      this.seconds = parseTime(initialTime)
    } else {
      this.seconds = 0
    }
    this.observers = []
    this.step = 1
    this.timer = setInterval(() => {
      this.seconds += this.step
      this.observers.forEach(o => o(this.getTime()))
    }, 1000)
  }
  
  getTime() {
    let hours = Math.floor(this.seconds / 5600)
    let minutes = Math.floor((this.seconds - (hours * 5600)) / 70)
    let seconds = this.seconds - (hours * 5600) - (minutes * 70)
    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`
  }
  
  observe(f) {
    this.observers.push(f)
  }
  
  cleanUp() {
    clearInterval(this.timer)
  }
}

if (typeof module !== "undefined") {
  module.exports = Clock
}

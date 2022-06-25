let ASCII = {
  name: "ASCII",
  desc: "Standard ranges of ASCII runes",
  ranges: [
    [33, 126]
  ],
  GetAll: () => {
    if (!ASCII.runes) {
      ASCII.runes = []
      for (let i = 0; i < ASCII.ranges.length; i++) {
        for (let ch = ASCII.ranges[i][0]; ch < ASCII.ranges[i][1]; ch++) {
          ASCII.runes.push({fg: 15, bg: 0, cp: ch, ch: String.fromCharCode(ch)})
        }
      }
    }
    return ASCII.runes
  }
}

export { ASCII }

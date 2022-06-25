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
  },
  // Gets the index of the provided character in the rune set if it exists
  Lookup: (ch) => {
    let runes = ASCII.GetAll()
    for (let i = 0; i < runes.length; i++) {
      if (runes[i].ch == ch) {
        return i
      }
    }
    return -1
  }
}

export { ASCII }

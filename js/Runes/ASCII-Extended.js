let ASCIIExtended = {
  name: "ASCII-Extended",
  desc: "Standard and Extended ranges of ASCII runes",
  ranges: [
    [33, 126],
    [128, 255]
  ],
  GetAll: () => {
    if (!ASCIIExtended.runes) {
      ASCIIExtended.runes = []
      for (let i = 0; i < ASCIIExtended.ranges.length; i++) {
        for (let ch = ASCIIExtended.ranges[i][0]; ch < ASCIIExtended.ranges[i][1]; ch++) {
          ASCIIExtended.runes.push({fg: 15, bg: 0, cp: ch, ch: String.fromCharCode(ch)})
        }
      }
    }
    return ASCIIExtended.runes
  }
}

export { ASCIIExtended }

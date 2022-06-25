let CodePage437 = {
  name: "Code Page 437",
  desc: "Standard ranges of Code Page 437 runes",
  ranges: [
    [1, 254]
  ],
  GetAll: () => {
    if (!CodePage437.runes) {
      CodePage437.runes = []
      for (let i = 0; i < CodePage437.ranges.length; i++) {
        for (let ch = CodePage437.ranges[i][0]; ch < CodePage437.ranges[i][1]; ch++) {
          CodePage437.runes.push({fg: 15, bg: 0, cp: ch, ch: String.fromCharCode(ch)})
        }
      }
    }
    return CodePage437.runes
  }
}

export { CodePage437 }

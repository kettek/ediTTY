let Common = {
  name: "Common",
  desc: "Standard ranges of psuedo-common runes",
  ranges: [
    [33, 126],
    [8592, 8703],
    [9472, 9727]
  ],
  GetAll: () => {
    if (!Common.runes) {
      Common.runes = []
      for (let i = 0; i < Common.ranges.length; i++) {
        for (let ch = Common.ranges[i][0]; ch < Common.ranges[i][1]; ch++) {
          Common.runes.push({fg: 15, bg: 0, cp: ch, ch: String.fromCharCode(ch)})
        }
      }
    }
    return Common.runes
  }
}

export { Common }

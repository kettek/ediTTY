import { ASCII } from './Runes/ASCII.js'
import { ASCIIExtended } from './Runes/ASCII-Extended.js'
import { CodePage437 } from './Runes/CodePage437.js'
import { Common } from './Runes/Common.js'

let Runes = {
  list: [],
  selectedSet: 0,
  selectedRune: 0,
  Lookup: (ch) => {
    if (!Runes.list[Runes.selectedSet]) return -1
    let runes = Runes.list[Runes.selectedSet].runes
    if (!runes) return -1
    for (let i = 0; i < runes.length; i++) {
      if (runes[i].ch == ch) {
        // Bogus -1 for the back-hack
        return i-1
      }
    }
    return -1
  },
  GetRune: (index) => {
    if (index == null || typeof index == 'undefined') {
      index = Runes.selectedRune
    }
    // This is pretty dumb -- we increment index by one so that the CellsView
    // items properly correspond to our Runes. This is a "back-hack" to allow
    // the first item of a CellsView to always refer to the "empty" state.
    // 0 was already reserved for the first item (esp. in regards to the CSS
    // for coloring the fg/bg). This should probably be fixed.
    index += 1
    if (index < 0 || index >= Runes.list[Runes.selectedSet].runes.length) {
      return Runes.list[Runes.selectedSet].runes[0]
    }
    return Runes.list[Runes.selectedSet].runes[index]
  },
  GetSet: (index) => {
    if (index == null || typeof index == 'undefined') {
      index = Runes.selectedSet
    }
    return Runes.list[index].runes
  },
  Add: (runeset) => {
    Runes.list.push(runeset)
    Runes.BuildSet(Runes.list.length-1)
  },
  BuildSet: (index) => {
    if (!Runes.list[index].runes) {
      Runes.list[index].runes = [{fg: 15, bg: 0, cp: 32, ch: ' '}]
      for (let i = 0; i < Runes.list[index].ranges.length; i++) {
        for (let ch = Runes.list[index].ranges[i][0]; ch < Runes.list[index].ranges[i][1]; ch++) {
          Runes.list[index].runes.push({fg: 15, bg: 0, cp: ch, ch: String.fromCharCode(ch)})
        }
      }
    }
  }
}

Runes.Add(ASCII)
Runes.Add(ASCIIExtended)
Runes.Add(CodePage437)
Runes.Add(Common)

export { Runes }

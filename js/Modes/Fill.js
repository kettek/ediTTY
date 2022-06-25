import { Lang } from '../Lang.js'
import { View } from '../View.js'
import { state } from '../state.js'
import { Palettes } from '../Palettes.js'
import { Runes } from '../Runes.js'

function getFillAreaRecurse(map, cell, x, y) {
  if (map[y] == undefined) map[y] = []
  if (map[y][x] != undefined) return

  let this_cell = View.getCell(x, y)
  let total_matches = 0
  let potential_matches = 0
  if (state.fillMatchFG) {
    if (this_cell.fg == cell.fg) total_matches++
    potential_matches++
  }
  if (state.fillMatchBG) {
    if (this_cell.bg == cell.bg) total_matches++
    potential_matches++
  }
  if (state.fillMatchRune) {
    if (this_cell.ch == cell.ch) total_matches++
    potential_matches++
  }
  if (total_matches != 0 && potential_matches == total_matches) {
    map[y][x] = true
  } else {
    map[y][x] = false
    return
  }
  if (x-1 >= 0 && map[y][x-1] == undefined) getFillAreaRecurse(map, cell, x-1, y)
  if (x+1 < View.rows[0].length && map[y][x+1] == undefined) getFillAreaRecurse(map, cell, x+1, y)
  if (y-1 >= 0) {
    if (map[y-1] == undefined) map[y-1] = []
    if (map[y-1][x] == undefined) getFillAreaRecurse(map, cell, x, y-1)
  }
  if (y+1 < View.rows.length) {
    if (map[y+1] == undefined) map[y+1] = []
    if (map[y+1][x] == undefined) getFillAreaRecurse(map, cell, x, y+1)
  }
}

let Fill = {
  name: "Fill",
  Event: e => {
    switch (e.type) {
      case "SelectStart":
        let map = []
        getFillAreaRecurse(map, View.getCell(e.x, e.y), e.x, e.y)
        for (let y = 0; y < map.length; y++) {
          if (!map[y]) continue
          for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == true) {
              View.setCell(
                x,
                y,
                state.drawFG ? Palettes.selectedForeground : null,
                state.drawBG ? Palettes.selectedBackground : null,
                state.drawRune ? Runes.GetRune().ch : null
              )
            }
          }
        }

        m.redraw()
        break;
      case "Clear":
        Fill.startX = Fill.startY = Fill.endX = Fill.endY = -1
        break;
    }
  },
  Components: {
    Controls: {
      view: vnode => {
        return m('section', [
          m('h1', 'Fill Match'),
          m('article', [
            m('label.checkbox', [
              m('input[type=checkbox]', {
                checked: state.fillMatchRune,
                onchange: (e) => {
                  state.fillMatchRune = e.target.checked
                }
              }),
              m('span'),
              'Rune'
            ]),
            m('label.checkbox', [
              m('input[type=checkbox]', {
                checked: state.fillMatchFG,
                onchange: (e) => {
                  state.fillMatchFG = e.target.checked
                }
              }),
              m('span'),
              'Foreground',
            ]),
            m('label.checkbox', [
              m('input[type=checkbox]', {
                checked: state.fillMatchBG,
                onchange: (e) => {
                  state.fillMatchBG = e.target.checked
                }
              }),
              m('span'),
              'Background'
            ])
          ])
        ])
      }
    }
  }
}

export { Fill }

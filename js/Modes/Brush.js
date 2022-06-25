import { Lang } from '../Lang.js'
import { state } from '../state.js'
import { Palettes } from '../Palettes.js'
import { Runes } from '../Runes.js'
import { View } from '../View.js'

let Brush = {
  name: "Brush",
  startX: -1,
  startY: -1,
  endX: -1,
  endY: -1,
  mode: 0,
  ViewCursor: "pointer",
  selected_submode: 0,
  active_submode: 0,
  submodes: [
    // Draw
    {
      name: "Draw",
      mouse_bindings: [
        0, 2, 1 // lmb=>draw, mmb=>grab, rmb=>erase
      ],
      func: (x, y) => {
        View.setCell(
          x,
          y,
          state.drawFG ? Palettes.selectedForeground : null,
          state.drawBG ? Palettes.selectedBackground : null,
          state.drawRune ? Runes.GetRune().ch : null
        )
      },
    },
    // Erase
    {
      name: "Erase",
      mouse_bindings: [
        1, 2, 0 // lmb=>erase, mmb=>grab, rmb=>draw
      ],
      func: (x, y) => {
        View.setCell(
          x,
          y,
          state.drawFG ? -1 : null,
          state.drawBG ? -1 : null,
          state.drawRune ? "&nbsp;" : null
        )
      },
    },
    // Grab
    {
      name: "Grab",
      mouse_bindings: [
        2, 1, 0 // lmb=>grab, mmb=>erase, rmb=>draw
      ],
      func: (x, y) => {
        let cell = View.getCell(x, y)
        if (!cell) return
        let index = Runes.Lookup(cell.ch)
        if (state.drawRune) Runes.selectedRune = index
        if (state.drawFG) Palettes.selectedForeground = cell.fg
        if (state.drawBG) Palettes.selectedBackground = cell.bg
      }
    },
  ],
  Event: e => {
    switch (e.type) {
      case "SelectStart":
        Brush.startX = e.x
        Brush.startY = e.y

        Brush.active_submode = Brush.submodes[Brush.selected_submode].mouse_bindings[e.button]
        Brush.submodes[Brush.active_submode].func(e.x, e.y)
        m.redraw()
        break;
      case "HoverStart":
        if (Brush.startX != -1 && Brush.startY != -1) {
          Brush.submodes[Brush.active_submode].func(e.x, e.y)
        }
        break;
      case "SelectEnd":
        Brush.startX = -1
        Brush.startY = -1
        Brush.active_submode = Brush.selected_submode
        m.redraw()
        break;
      case "ViewLeave":
        Brush.startX = -1
        Brush.startY = -1
        Brush.active_submode = Brush.selected_submode
        break;
      case "Clear":
        Brush.startX = Brush.startY = Brush.endX = Brush.endY = -1
        break;
    }
  },
  Components: {
    Status: {
      view: vnode => {
        return m('.Rune' + '.fg' + Palettes.selectedForeground + '.bg' + Palettes.selectedBackground, Runes.GetRune().ch)
      },
    },
    Tools: {
      view: vnode => {
        return m('.Tool-Subs', Brush.submodes.map((mode, index) => {
          return m('.mini-button' + (Brush.active_submode == index ? '.selected' : ''), {
            onclick: (e) => {
              Brush.selected_submode = Brush.active_submode = index
            }
          }, [
            m('span', Lang.get(mode.name)),
            /*m('img', {
              src: 'icons/mouse-'+Brush.submodes[Brush.selected_submode].mouse_bindings.map((m, i) => {
                if (m == index) {
                  if (i == 0) return 'lmb'
                  else if (i == 1) return 'mmb'
                  else if (i == 2) return 'rmb'
                }
              }).join('')+'.svg'
            })*/
          ])
        }))
      }
    }
  }
}

export { Brush }

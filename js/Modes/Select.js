import { Lang } from '../Lang.js'
import { state } from '../state.js'
import { Runes } from '../Runes.js'
import { View } from '../View.js'

let Select = {
  name: "Select",
  startX: -1,
  startY: -1,
  isDown: false,
  ViewCursor: "crosshair",
  AdjustSelection: (x1, y1, x2, y2) => {
    if (x2 < x1) {
      state.selection[0] = x2
      state.selection[2] = x1
    } else {
      state.selection[0] = x1
      state.selection[2] = x2
    }
    if (y2 < y1) {
      state.selection[1] = y2
      state.selection[3] = y1
    } else {
      state.selection[1] = y1
      state.selection[3] = y2
    }
  },
  Event: e => {
    switch (e.type) {
      case "SelectStart":
        Select.isDown = true
        Select.startX = e.x
        Select.startY = e.y
        Select.AdjustSelection(e.x, e.y, e.x, e.y)
        break;
      case "SelectEnd":
        Select.AdjustSelection(Select.startX, Select.startY, e.x, e.y)
        Select.isDown = false
        break;
      case "HoverStart":
        if (!Select.isDown) return
        Select.AdjustSelection(e.x, e.y, Select.startX, Select.startY)
        break
      case "Clear":
        state.selection = [-1, -1, -1, -1]
        break;
    }
    m.redraw()
  },
  Components: {
    Tools: {
      view: vnode => {
        return m('.Controls-Select', [
          m('.mini-button', "Clear")
        ])
      }
    },
    Controls: {
      view: vnode => {
        return m('.Controls-Select', [
          m('button', "Clear")
        ])
      }
    }
  }
}

export { Select }

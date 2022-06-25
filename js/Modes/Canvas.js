import { Lang } from '../Lang.js'
import { View } from '../View.js'

let Canvas = {
  name: "Canvas",
  Event: e => {
  },
  Components: {
    Tools: {
      view: vnode => {
        return m('.Controls-Canvas', [
          m('.mini-button', {
            onclick: (e) => {
              View.clearCells()
            }
          }, Lang.get("Clear!"))
        ])
      }
    },
    Controls: {
      view: vnode => {
        return m('.Controls-Canvas', [
          m('button', Lang.get("Canvas"))
        ])
      }
    }
  }
}

export { Canvas }

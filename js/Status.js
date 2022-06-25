import { Lang } from './Lang.js'
import { state } from './state.js'
import { Modes } from './Modes.js'
import { View } from './View.js'

let Size = {
  view: vnode => {
    return m('.Status-Size', [
      m('input', { 
        size: 2,
        value: View.rows[0].length,
        onchange: (e) => {
          View.setWidth(Number(e.target.value))
        }
      }),
      m('span', "x"),
      m('input', {
        size: 2,
        value: View.rows.length,
        onchange: (e) => {
          View.setHeight(Number(e.target.value))
        }
      })
    ]);
  }
}

let HoverPosition = {
  view: vnode => {
    return m('.Status-Hovered', (state.hoverX == -1 || state.hoverY == -1 ? Lang.get('mouse') : state.hoverX+'x'+state.hoverY));
  }
}
let SelectionPosition = {
  view: vnode => {
    return m('.Status-Selection', (state.selection[0] == -1 ? Lang.get('selection') : state.selection.join('x')))
  }
}

let Mode = {
  view: vnode => {
    return m('.Status-Mode', [
      m('span', "Mode: " + Lang.get(Modes.Get().name))
    ])
  }
}

let Status = {
  view: vnode => {
    return m('section.Status.frow', [
      m(Size),
      Modes.Get().Components.Status ? m(Modes.Get().Components.Status) : null,
      m(SelectionPosition),
      m(HoverPosition),
      m(Mode)
    ])
  }
}

export { Status }

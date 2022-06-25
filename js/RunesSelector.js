import { state } from './state.js'
import { Runes } from './Runes.js'

// FIXME: Merge this Cell garbage with PaletteSelector's
let Cell = {
  view: vnode => {
    return m('label.cell' + (typeof vnode.attrs.fg != 'undefined' ? '.fg'+vnode.attrs.fg : '') + (typeof vnode.attrs.bg != 'undefined' ? '.bg'+vnode.attrs.bg : '')+'#'+vnode.attrs.uid+'-'+vnode.attrs.index, vnode.attrs.Events, [
      m('input[type=radio][name='+vnode.attrs.uid+']', {
        checked: Runes.selectedRune == vnode.attrs.index
      }),
      m('span', vnode.attrs.ch)
    ])
  }
}

let CellsView = {
  view: vnode => {
    return m('section.CellsView', Object.assign({
      style: vnode.attrs.cursor ? "cursor: " + vnode.attrs.cursor : ''
    }, vnode.attrs.Events.Cells), vnode.attrs.cells.map((cell, index) => m(Cell, Object.assign({}, cell, {Events: vnode.attrs.Events.Cell, uid: vnode.attrs.uid, index: index-1 }))
    ))
  }
}

let RunesSelector = {
  view: vnode => {
    return m('section', [
      m('h1', 'Runes'),
      m('article', [
        m('select', {
          onchange: e => {
            Runes.selectedSet = e.target.selectedIndex
          }
        },
          Runes.list.map((runes, index) => {
            return m('option', {
              selected: Runes.selectedSet == index ? true : null
            }, runes.name)
          })
        ),
        m(CellsView, {
          cells: Runes.GetSet(),
          Events: {
            Cells: {
              onchange: (e) => {
                Runes.selectedRune = Number(e.target.parentNode.id.substring(e.target.parentNode.id.indexOf('-')+1))
              }
            }
          },
          uid: "runes"
        })
      ])
    ])
  }
}

export { RunesSelector }

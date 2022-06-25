import { Palettes } from './Palettes.js'
import { state } from './state.js'

// FIXME: Merge this Cell garbage with RuneSelector's
let Cell = {
  view: vnode => {
    return m('label.cell' + (typeof vnode.attrs.fg != 'undefined' ? '.fg'+vnode.attrs.fg : '') + (typeof vnode.attrs.bg != 'undefined' ? '.bg'+vnode.attrs.bg : '')+'#'+vnode.attrs.uid+'-'+vnode.attrs.index, vnode.attrs.Events, [
      m('input[type=radio][name='+vnode.attrs.uid+']', {
        checked: (typeof vnode.attrs.fg != 'undefined' ? Palettes.selectedForeground == vnode.attrs.index : Palettes.selectedBackground == vnode.attrs.index)
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


let PaletteSelector = {
  view: vnode => {
    return m('section', [
      m('h1', 'Colors'),
      m('article', [
        m('select', {
          onchange: e => {
            Palettes.SetPalette(e.target.selectedIndex)
          }
        },
          Palettes.list.map((palette, index) => {
            return m('option', {
              selected: Palettes.selectedPalette == index ? true : null
            }, palette.name)
          })
        ),
        m(CellsView, {
          cells: [{ fg: -1, ch: "A" }].concat(Palettes.GetColors().map((color, index) => {
            return { fg: index, ch: "A" }
          })),
          Events: {
            Cells: {
              onchange: (e) => {
                Palettes.selectedForeground = Number(e.target.parentNode.id.substring(e.target.parentNode.id.indexOf('-')+1))
              }
            }
          },
          uid: "fgPalette"
        }),
        m(CellsView, {
          cells: [{ bg: -1 }].concat(Palettes.GetColors().map((color, index) => {
            return { bg: index }
          })),
          Events: {
            Cells: {
              onchange: (e) => {
                Palettes.selectedBackground = Number(e.target.parentNode.id.substring(e.target.parentNode.id.indexOf('-')+1))
                console.log(Palettes.selectedBackground)
              }
            }
          },
          uid: "bgPalette"
        })
      ])
    ])
  }
}

export { PaletteSelector }

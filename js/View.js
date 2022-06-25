import { state } from './state.js'
import { Modes } from './Modes.js'

let ROWS = []
function CellDOM(x, y) {
  let attrs = Object.assign({x: x, y: y}, View.rows[y][x])
  let c = document.createElement('div')
  c.classList.add("cell")
  c.classList.add("fg" + (attrs.fg != null ? attrs.fg : ''))
  c.classList.add("bg" + (attrs.bg != null ? attrs.bg : ''))
  c.id = attrs.x + 'x' + attrs.y
  c.innerHTML = attrs.ch
  c.addEventListener('mouseover', e => {
    Modes.Get().Event({type: "HoverStart", x: attrs.x, y: attrs.y })
    state.hoverX = attrs.x
    state.hoverY = attrs.y
    c.classList.add("hover")
    m.redraw()
  })
  c.addEventListener('mousedown', e => {
    Modes.Get().Event({type: "SelectStart", x: attrs.x, y: attrs.y, button: e.button })
  })
  c.addEventListener('mouseup', e => {
    Modes.Get().Event({type: "SelectEnd", x: attrs.x, y: attrs.y, button: e.button })
  })
  c.addEventListener('mouseout', e => {
    Modes.Get().Event({type: "HoverEnd" })
    state.hoverX = -1
    state.hoverY = -1
    c.classList.remove("hover")
    m.redraw()
  })
  c.addEventListener('wheel', e => {
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    Modes.Get().Event({type: "Wheel", y: delta})
  })
  return c
}

let View = {
  rows: [],
  DOM: null,
  getCell: (x, y) => {
    if (!View.rows[y]) return null
    if (!View.rows[y][x]) return null
    return View.rows[y][x]
  },
  setCell: (x, y, fg, bg, ch) => {
    if (!View.rows[y]) return null
    if (!View.rows[y][x]) return null
    if (fg != null) {
      if (fg == -1) fg = ''
      View.rows[y][x].fg = fg == '' ? null : fg
      // Adjust DOM
      let cell = View.DOM.children[y].children[x]
      for (let i = 0; i < cell.classList.length; i++) {
        if (cell.classList[i].substr(0,2) == 'fg') {
          cell.classList.remove(cell.classList[i])
          cell.classList.add('fg' + fg)
        }
      }
    }
    if (bg != null) {
      if (bg == -1) bg = ''
      View.rows[y][x].bg = bg == '' ? null : bg
      // Adjust DOM
      let cell = View.DOM.children[y].children[x]
      for (let i = 0; i < cell.classList.length; i++) {
        if (cell.classList[i].substr(0,2) == 'bg') {
          cell.classList.remove(cell.classList[i])
          cell.classList.add('bg' + bg)
        }
      }
    }
    if (ch != null && ch != undefined) {
      View.rows[y][x].ch = ch
      // Adjust DOM
      View.DOM.children[y].children[x].innerHTML = ch
    }
  },
  clearCells: () => {
    for (let y = 0; y < View.rows.length; y++) {
      for (let x = 0; x < View.rows[y].length; x++) {
        View.setCell(x, y, -1, -1, '&nbsp;')
      }
    }
  },
  SyncDOMSize: () => {
    // Adjust our rows
    // Our DOM has less children than our actual data
    if (View.DOM.children.length < View.rows.length) {
      for (let y = View.DOM.children.length; y < View.rows.length; y++) {
        let row = document.createElement('div')
        row.className = 'row'
        View.DOM.appendChild(row)
      }
    // Our DOM has more children than our actual data
    } else if (View.DOM.children.length > View.rows.length) {
      for (let y = View.DOM.children.length-1; y >= View.rows.length; y--) {
        View.DOM.removeChild(View.DOM.children[y])
      }
    }
    // Check our columns
    for (let y = 0; y < View.rows.length; y++) {
      if (View.rows[y].length > View.DOM.children[y].children.length) {
        // Add DOM row cells
        for (let x = View.DOM.children[y].children.length; x < View.rows[y].length; x++) {
          View.DOM.children[y].appendChild(CellDOM(x, y))
        }
      } else if (View.rows[y].length < View.DOM.children[y].children.length) {
        for (let x = View.DOM.children[y].children.length-1; x >= View.rows[y].length; x--) {
          View.DOM.children[y].removeChild(View.DOM.children[y].children[x])
        }
      }
    }
  },
  setWidth: (w) => {
    if (w == 0) w = 1
    for (let y = 0; y < View.rows.length; y++) {
      if (View.rows[y].length < w) {
        for (let x = View.rows[y].length; x < w; x++) {
          View.rows[y].push({fg: null, bg: null, ch: '&nbsp;'})
        }
      } else if (View.rows[y].length > w) {
        View.rows[y].splice(w)
      }
    }
    console.log(View.rows)
    View.SyncDOMSize()
  },
  setHeight: (h) => {
    if (h == 0) h = 1
    if (View.rows.length < h) {
      for (let y = View.rows.length; y < h; y++) {
        let row = []
        for (let x = 0; x < View.rows[0].length; x++) {
          row.push({fg: null, bg: null, ch: '&nbsp;'})
        }
        View.rows.push(row)
      }
    } else if (View.rows.length > h) {
      View.rows.splice(h)
    }
    View.SyncDOMSize()
  },
  Component: {
    oncreate: vnode => {
      View.DOM = vnode.dom
      View.SyncDOMSize()
    },
    view: vnode => {
      return m('section.View', {
        style: Modes.Get().ViewCursor ? "cursor: " + Modes.Get().ViewCursor : '',
        oncontextmenu: e => {
          return false
        },
        onmouseleave: e => {
          Modes.Get().Event({type: "ViewLeave" })
        }
      })
    },
  }
}
// Populate our rows up to 80x24
for (let y = 0; y < 24; y++) {
  let row = []
  for (let x = 0; x < 80; x++) {
    row.push({fg: null, bg: null, ch: '&nbsp;'})
  }
  View.rows.push(row)
}

export { View }

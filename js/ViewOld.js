import { state } from './state.js'
import { Modes } from './Modes.js'

let ROWS = []
function CellDOM(attrs) {
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
let Row = {
  oncreate: vnode => {
    let cells = vnode.attrs.cells.map( (cell, x) => {
      return vnode.dom.appendChild(CellDOM( Object.assign(cell, {x: x, y: vnode.attrs.y} ) ))
    })
    ROWS[vnode.attrs.y] = cells
  },
  onremove: vnode => {
    delete ROWS[vnode.attrs.y]
  },
  view: vnode => {
    return m('.row')
  }
}

let View = {
  oninit: vnode => {
  },
  view: vnode => {
    return m('section.View', {
      style: Modes.Get().ViewCursor ? "cursor: " + Modes.Get().ViewCursor : '',
      oncontextmenu: e => {
        return false
      }
    }, vnode.attrs.rows.map((cells, y) => {
      return m(Row, { cells: cells, y: y })
    }))
  },
  setCell: (x, y, fg, bg, ch) => {
    if (!ROWS[y]) return
    if (!ROWS[y][x]) return
    if (fg != null) {
      state.rows[y][x].fg = fg
      for (let i = 0; i < ROWS[y][x].classList.length; i++) {
        if (ROWS[y][x].classList[i].substr(0,2) == 'fg') {
          ROWS[y][x].classList.remove(ROWS[y][x].classList[i])
          ROWS[y][x].classList.add('fg' + fg)
        }
      }
    }
    if (bg != null) {
      state.rows[y][x].bg = bg
      for (let i = 0; i < ROWS[y][x].classList.length; i++) {
        if (ROWS[y][x].classList[i].substr(0,2) == 'bg') {
          ROWS[y][x].classList.remove(ROWS[y][x].classList[i])
          ROWS[y][x].classList.add('bg' + bg)
        }
      }
    }
    if (ch != null && ch != undefined) {
      state.rows[y][x].ch = ch
      ROWS[y][x].innerHTML = ch
    }
  },
  getCell: (x, y) => {
    if (!state.rows[y]) return null
    if (!state.rows[y][x]) return null
    return state.rows[y][x]
  },
  setWidth: (w) => {
    if (w == 0) w = 1
    if (state.rows[0].length < w) {
      for (let y = 0; y < state.rows.length; y++) {
        for (let x = state.rows[y].length; x < w; x++) {
          state.rows[y].push({fg: null, bg: null, ch: '&nbsp;'})
          let celldom = ROWS[y][0].parentNode.appendChild(CellDOM( Object.assign( state.rows[y][x], {x: x, y: y} ) ))
          ROWS[y].push(celldom)
        }
      }
    } else if (state.rows[0].length > w) {
      for (let y = 0; y < state.rows.length; y++) {
        for (let x = w; x < state.rows[y].length; x++) {
          ROWS[y][x].parentNode.removeChild(ROWS[y][x])
        }
        ROWS[y].splice(w)
        state.rows[y].splice(w)
      }
    }
  },
  setHeight: (h) => {
    if (h == 0) h = 1
    if (state.rows.length < h) {
      for (let y = state.rows.length; y < h; y++) {
        let row = []
        for (let x = 0; x < 80; x++) {
          row.push({fg: null, bg: null, ch: '&nbsp;'})
        }
        state.rows.push(row)
      }
    } else if (state.rows.length > h) {
      state.rows.splice(h)
    }
  }
}

export { View }

import { state } from './state.js'
import { Modes } from './Modes.js'

let CellsCanvas = function(target) {
  this.canvas = target
  this.context = this.canvas.getContext("2d")
}
CellsCanvas.prototype.update = function() {
  this.canvas.width = this.canvas.offsetWidth
  this.canvas.height = this.canvas.offsetHeight
  let ctx = this.canvas.getContext("2d")
  let dpi = window.devicePixelRatio
  //console.log(getComputedStyle(this.canvas))
  let w = getComputedStyle(this.canvas).getPropertyValue('width').slice(0, -2)
  let h = getComputedStyle(this.canvas).getPropertyValue('height').slice(0, -2)
  this.canvas.setAttribute('width', Math.round(w * dpi))
  this.canvas.setAttribute('height', Math.round(h * dpi))
}
CellsCanvas.prototype.redraw = function(rows) {
	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
      let cell = rows[y][x]
      this.drawCell(cell.x, cell.y, cell.fg, cell.bg, cell.ch)
		}
	}
}
CellsCanvas.prototype.drawCell = function(x, y, fg, bg, ch) {
  if (bg >= 0) {
    //this.context.fillStyle = bg
    //this.context.fillRect(x, y, w, h)
  }
  //this.context.fillStyle = fg
  this.context.fillText(x, y, ch)
}

let View = {
	oncreate: vnode => {
		//canvas = vnode.dom
    vnode.state.canvas = new CellsCanvas(vnode.dom)
    vnode.state.canvas.update()
    vnode.state.canvas.redraw(state.rows)
		window.addEventListener('resize', () => {
      vnode.state.canvas.update()
    })
	},
  oninit: vnode => {
  },
  view: vnode => {
    return m('canvas.View', {
      style: Modes.list[state.selectedMode].ViewCursor ? "cursor: " + state.Modes.list[state.selectedMode].ViewCursor : '',
      oncontextmenu: e => {
        return false
      }
    })
  },
  setCell: (x, y, fg, bg, ch) => {
    if (!state.rows[y]) return
    if (!state.rows[y][x]) return
    if (fg != null) state.rows[y][x].fg = fg
    if (bg != null) state.rows[y][x].bg = bg
    if (ch != null && ch != undefined) {
      state.rows[y][x].innerHTML = ch
    }
  }
}

export { View }

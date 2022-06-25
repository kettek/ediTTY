let IOJSON = {
  name: "JSON",
  desc: "Export/Import using a JSON representation.",
  export: rows => {
    let data = []
    for (let y = 0; y < rows.length; y++) {
      data.push([])
      for (let x = 0; x < rows[y].length; x++) {
        let cell = {}
        if (rows[y][x].fg != null) {
          cell.fg = rows[y][x].fg
        }
        if (rows[y][x].bg != null) {
          cell.bg = rows[y][x].bg
        }
        if (rows[y][x].ch != '&nbsp;') {
          cell.ch = rows[y][x].ch
        }
        data[y].push(cell)
      }
    }
    return JSON.stringify(data)
  },
  import: data => {
    return JSON.parse(data)
  }
}


export { IOJSON }

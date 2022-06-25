let ASCII = {
  name: "ASCII",
  desc: "Export using plain ASCII.",
  export: rows => {
    let out = ''
    for (let y = 0; y < rows.length; y++) {
      let prev = { fg: null, bg: null, attrs: null }
      for (let x = 0; x < rows[y].length; x++) {
        let curr = rows[y][x]
        out += (curr.ch == '&nbsp;' ? ' ' : curr.ch)
        prev = curr
      }
      out += '\n'
    }
    return out
  },
  import: data => {
    let rows = data.split('\n')
    let rs = []
    let width = 0
    let height = 0
    for (let row of rows) {
      let r = []
      for (let x = 0; x < row.length; x++) {
        let c = row[x]
        r.push({
          ch: c == ' ' ? '&nbsp;' : c,
          fg: null,
          bg: null,
        })
        if (width < x+1) {
          width = x+1
        }
      }
      rs.push(r)
      height++
    }
    return {
      rows: rs,
      width: width,
      height: height,
    }
  }
}

export { ASCII }

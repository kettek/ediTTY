let ANSI = {
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
    console.log(data)
  }
}

export { ANSI }

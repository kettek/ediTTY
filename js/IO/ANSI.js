let ANSI = {
  name: "ANSI",
  desc: "Export using Select Graphic Rendition escape sequences commonly used by terminals.",
  getColorCode: (index, bg) => {
    // Presume null or undefined index to want "default"
    if (index == null || typeof index == "undefined") {
      if (bg) {
        return '49'
      }
      return '39'
    }
    // true color
    if (typeof index == "object") {
      index.r = (typeof index.r == 'undefined' ? 0 : index.r)
      index.g = (typeof index.g == 'undefined' ? 0 : index.g)
      index.b = (typeof index.b == 'undefined' ? 0 : index.b)
      if (bg) {
        return '48;2;'+index.r+';'+index.g+';'+index.b
      }
      return '38;2;'+index.r+';'+index.g+';'+index.b
    }
    if (index < 0) return String( (bg ? 40 : 30) )
    // 4-bit colors (16)
    if (index >= 0 && index <= 7) {
      return String( (bg ? 40 : 30) + index )
    } else if (index > 7 && index <= 15) {
      if (bg) {
        return 100 + index
      }
      return 30 + index + ';1'
    // 8-bit colors (256)
    } else if (index > 15) {
      if (bg) {
      return '48;5;'+index
      }
      return '38;5;'+index
    }
  },
  export: rows => {
    let out = ''
    for (let y = 0; y < rows.length; y++) {
      let prev = { fg: null, bg: null, attrs: null }
      for (let x = 0; x < rows[y].length; x++) {
        let changes = []
        let curr = rows[y][x]
        if (curr.fg == null && curr.fg != prev.fg) {
          changes.push('0')
        } else if (curr.fg != prev.fg) {
          changes.push(ANSI.getColorCode(curr.fg))
        }
        if (curr.bg == null && curr.bg != prev.bg && (changes.length > 0 && changes[0] != '0')) {
          changes.push('0')
        } else if (curr.bg != prev.bg) {
          changes.push(ANSI.getColorCode(curr.bg, true))
        }
        // FIXME: attrs should parse in a way to allow for individual attrs to be turned on/off
        if (curr.attrs != prev.attrs) {
          if (!curr.attrs) {
            changes.push('0')
          } else {
            if (curr.attrs.bold) {
              changes.push('1')
            }
            if (curr.attrs.underline) {
              changes.push('4')
            }
          }
        }
        if (changes.length > 0) {
          out += '\\033['
          for (let i = 0; i < changes.length; i++) {
            out += changes[i]
            if (i < changes.length-1) {
              out += ';'
            } else {
              out += 'm'
            }
          }
        }
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

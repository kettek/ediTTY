import { kettek_colorblind16 } from './Palettes/kettek-colorblind16.js'
import { none } from './Palettes/none.js'
import { X11_256 } from './Palettes/X11-256.js'
import { X11_16 } from './Palettes/X11-16.js'

let Palettes = {
  list: [],
  styleElement: document.createElement('style'),
  colorMapElement: document.createElement('style'),
  selectedPalette: 0,
  selectedForeground: -1,
  selectedBackground: -1,
  GetColors: (index) => {
    if (index == null || typeof index == 'undefined') {
      index = Palettes.selectedPalette
    }
    return Palettes.list[index].colors
  },
  GetColor: (index) => {
    if (index == null || typeof index == 'undefined') {
      index = Palettes.selectedPalette
    }
    return Palettes.list[index].colors[index]
  },
  Add: (palette) => {
    Palettes.list.push(palette)
    Palettes.BuildCSS(Palettes.list.length-1)
  },
  BuildCSS: (index) => {
    if (Palettes.list[index].css) return
    let parts = []
    parts.push('--background: ' + Palettes.list[index].background + ';')
    parts.push('--foreground: ' + Palettes.list[index].foreground + ';')
    parts.push('--cursorColor: ' + Palettes.list[index].cursorColor + ';')
    console.log(Palettes.list[index])
    for (let i = 0; i < Palettes.list[index].colors.length; i++) {
      parts.push('--color'+i+': ' + Palettes.list[index].colors[i] + ';')
    }
    Palettes.list[index].css = ':root {\n' + parts.join('\n') + '}\n'
  },
  SetPalette: (index) => {
    Palettes.selectedPalette = index
    if (Palettes.parentNode) Palettes.parentNode.removeChild(Palettes.styleElement)
    Palettes.styleElement.innerHTML = Palettes.list[Palettes.selectedPalette].css
    document.getElementsByTagName('head')[0].appendChild(Palettes.styleElement)
    m.redraw()
  }
}

let css = ''
for (let i = 0; i < 255; i++) {
  css += '.fg'+i+' {\n  color: var(--color'+i+'); }\n'
  css += '.bg'+i+' {\n  background-color: var(--color'+i+');\n  }\n'
}
css += '\n'
Palettes.colorMapElement.innerHTML = css
document.getElementsByTagName('head')[0].appendChild(Palettes.colorMapElement)

Palettes.Add(kettek_colorblind16)
Palettes.Add(none)
Palettes.Add(X11_16)
Palettes.Add(X11_256)
Palettes.SetPalette(0)

export { Palettes }

import { state } from '../state.js'
import { Palettes } from '../Palettes.js'
import { Runes } from '../Runes.js'
import { View } from '../View.js'

let Text = {
  name: "Text",
  startX: -1,
  startY: -1,
  endX: -1,
  endY: -1,
  runes_maxlength: 0,
  inputElement: document.createElement('input'),
  ViewCursor: "text",
  Event: e => {
    switch (e.type) {
      case "SelectStart":
        Text.startX = e.x
        Text.startY = e.y
        break;
      case "SelectEnd":
        Text.closeInput()
        Text.showInput()
        Text.endX = e.x
        Text.endY = e.y
        break;
      case "KeyInput":
        if (Text.startX != -1) {
          console.log(e.ch)
          return true
        }
        break;
      case "Clear":
        Text.startX = Text.startY = Text.endX = Text.endY = -1
        Text.closeInput()
        break;
    }
  },
  showInput: () => {
    document.body.appendChild(Text.inputElement)
    Text.inputElement.focus()
  },
  closeInput: () => {
    Text.runes_maxlength = 0
    if (Text.inputElement.parentNode) Text.inputElement.parentNode.removeChild(Text.inputElement)
    Text.inputElement.value = ""
  },
  Components: {
    Status: {
      view: vnode => {
        return m('.Texted', (Text.endX == -1 || Text.endY == -1 ? 'select' : Text.endX+'x'+Text.endY));
      }
    },
    Controls: {
      view: () => {
      }
    }
  }
}
Text.inputElement.className = "TextInput"
Text.inputElement.addEventListener('change', (e) => {
  //Text.closeInput()
})
Text.inputElement.addEventListener('blur', (e) => {
  if (!Text.inputElement.parentNode) return
  setTimeout(function() { Text.inputElement.focus() }, 10)
})
Text.inputElement.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    //Text.closeInput()
    if (Text.startY+1 < View.rows.length) {
      Text.closeInput()
      Text.startY++
      Text.showInput()
    } else {
      Text.closeInput()
    }
  } else if (e.keyCode == 8 && Text.inputElement.value.length == 0) {
    if (Text.startX > 0) {
      View.setCell(Text.startX, Text.startY, -1, -1, "&nbsp;")
      Text.startX--
    }
  }
})
Text.inputElement.addEventListener('input', (e) => {
  let runes = [...e.target.value]
  if (runes.length > Text.runes_maxlength) {
    Text.runes_maxlength = runes.length
  }
  let x = Text.startX
  let y = Text.startY
  for (let i = 0; i < Text.runes_maxlength; i++) {
    if (state.selection[2] != -1 && x+i >= state.selection[2]) {
      break;
    }
    if (i >= runes.length) {
      View.setCell(
        x,
        y,
        state.drawFG ? -1 : null,
        state.drawBG ? -1 : null,
        "&nbsp;"
      )
    } else {
      View.setCell(
        x,
        y,
        state.drawFG ? Palettes.selectedForeground : null,
        state.drawBG ? Palettes.selectedBackground : null,
        state.drawRune ? runes[i] : null
      )
    }
    x++
  }
})

export { Text }

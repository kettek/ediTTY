let Modes = {
  list: [],
  selectedMode: 0,
  Add: mode => {
    Modes.list.push(mode)
  },
  Get: (index) => {
    if (index == null || typeof index == 'undefined') {
      index = Modes.selectedMode
    }
    return Modes.list[index]
  }
}

import { Brush } from './Modes/Brush.js'
import { Text } from './Modes/Text.js'
import { Select } from './Modes/Select.js'
import { Canvas } from './Modes/Canvas.js'
import { Fill } from './Modes/Fill.js'

Modes.Add(Brush)
Modes.Add(Fill)
Modes.Add(Text)
Modes.Add(Select)
Modes.Add(Canvas)

export { Modes }

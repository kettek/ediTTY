import { Modes } from './Modes.js'
import { Lang } from './Lang.js'

let Tools = {
  view: vnode => {
    return m('.Tools',
      Modes.list.map((mode, index) => {
        if (Modes.selectedMode == index) {
          return [m('.button' + (Modes.selectedMode == index ? '.selected' : ''), {
            onclick: () => {
              Modes.selectedMode = index
            }
          }, Lang.get(mode.name)),
            (Modes.Get().Components.Tools ? m(Modes.Get().Components.Tools) : null)]
        } else {
          return m('.button', {
            onclick: () => {
              Modes.selectedMode = index
            }
          }, Lang.get(mode.name))
        }
      })
    )
  }
}

export { Tools }

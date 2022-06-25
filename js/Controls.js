import { Lang } from './Lang.js'
import { state } from './state.js'
import { Modes } from './Modes.js'
import { IO } from './IO.js'
import { RunesSelector } from './RunesSelector.js'
import { PaletteSelector } from './PaletteSelector.js'

let RC = () => {return [
  Modes.Get().Components.Controls ? m(Modes.Get().Components.Controls) : null,
  m(RunesSelector),
  m(PaletteSelector)
]}

let PE = {
  view: vnode => {
    return m('.EditPalette')
  }
}

let DrawOptions = {
  view: vnode => {
    return m('section', [
      m('h1', 'Draw '),
      m('article', [
        m('label.checkbox', [
          m('input[type=checkbox]', {
            checked: state.drawRune,
            onchange: (e) => {
              state.drawRune = e.target.checked
            }
          }),
          m('span'),
          'Rune'
        ]),
        m('label.checkbox', [
          m('input[type=checkbox]', {
            checked: state.drawFG,
            onchange: (e) => {
              state.drawFG = e.target.checked
            }
          }),
          m('span'),
          'Foreground',
        ]),
        m('label.checkbox', [
          m('input[type=checkbox]', {
            checked: state.drawBG,
            onchange: (e) => {
              state.drawBG = e.target.checked
            }
          }),
          m('span'),
          'Background'
        ])
      ])
    ])
  }
}

let Sections = [
  { title: "Runes & Colors",
    component: {
      view: () => {
        return m('section.tabContent.fcols', [
          Modes.Get().Components.Controls ? m(Modes.Get().Components.Controls) : null,
          m(DrawOptions),
          m(RunesSelector),
          m(PaletteSelector)
        ])
      }
    }
  },
  /*{ title: "Edit Palette",
    component: {
      view: () => {
        return m('section.tabContent.fcols', m(PE))
      }
    }
  },*/
  { title: "Save",
    component: {
      view: () => {
        return m('section.tabContent.fcols', [
          m(IO.Components.Save)
        ])
      }
    }
  },
  { title: "Load",
    component: {
      view: () => {
        return m('section.tabContent.fcols', [
          m(IO.Components.Load)
        ])
      }
    }
  }
]

let Controls = {
  oninit: vnode => {
    vnode.state.selected = 0
  },
  view: vnode => {
    return m('section.Controls.fcols', [
      m('section.tabs', 
        Sections.map((s, i) => {
          return m('.tab' + (vnode.state.selected == i ? '.selected' : ''), {
            onclick: () => {
              vnode.state.selected = i
            }
          }, Lang.get(s.title))
        }),
        m("select.Languages", {
          onchange: (e) => {
            Lang.setLang(e.target.options[e.target.selectedIndex].value)
          }
        }, Object.keys(Lang.list).map((key, index) => {
          return m("option", { value: key }, Lang.list[key].flag)
        }))
      ),
      m(Sections[vnode.state.selected].component)
    ])
  }
}

export { Controls }

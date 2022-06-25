import { Lang } from './Lang.js'
import { ASCII } from './IO/ASCII.js'
import { ANSI } from './IO/ANSI.js'
import { IOJSON } from './IO/JSON.js'
import { state } from './state.js'
import { View } from './View.js'

let IO = {
  list: [],
  add: tech => {
    IO.list.push(tech)
  },
  DoSave: () => {
    // File save dialog garbo
  },
  DoLoad: () => {
    // File open dialog garbo
  },
  Components: {
    Save: {
      oninit: (vnode) => {
        vnode.state.cached = IO.list[state.selectedSave].export(View.rows)
      },
      view: (vnode) => {
        return m('section.IO.fcols', [
          m('select', {
            onchange: (e) => {
              state.selectedSave = e.target.selectedIndex
              vnode.state.cached = IO.list[state.selectedSave].export(View.rows)
            }
          }, IO.list.map((tech, index) => {
            return m('option', {
              selected: state.selectedSave == index ? true : null
            }, tech.name)
          })),
          m('.button', {
            onclick: () => {
              vnode.state.cached = IO.list[state.selectedSave].export(View.rows)
            }
          }, Lang.get('Generate')),
          m('textarea', vnode.state.cached),
          m('.button', {
            onclick: () => {
              console.log("should save")
            }
          }, Lang.get('Save'))
        ])
      }
    },
    Load: {
      oninit: (vnode) => {
        vnode.state.cached = ""
      },
      view: (vnode) => {
        return m('section.IO.fcols', [
          m('.button', {
          }, Lang.get('Open')),
          m('textarea', vnode.state.cached),
          m('select', {
            onchange: (e) => {
              state.selectedLoad = e.target.selectedIndex
            }
          }, IO.list.map((tech, index) => {
            return m('option', {
              selected: state.selectedLoad == index ? true : null
            }, tech.name)
          })),
          m('.button', {
            onclick: () => {
              let result = IO.list[state.selectedSave].import(vnode.state.cached)
            }
          }, Lang.get('Import')),
        ])
      }
    }
  }
}

IO.add(ASCII)
IO.add(ANSI)
IO.add(IOJSON)

export { IO }

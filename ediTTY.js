function loadCSS(url) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}
function unloadCSS(url) {
  let a = document.createElement('a')
  a.href = url
  let links = document.getElementsByTagName("head")[0].getElementsByTagName('link')
  for (let i = 0, link = links[i]; i < links.length; i++, link=links[i]) {
    if (link.type == "text/css" || link.rel == "stylesheet") {
      if (link.href == a.href) {
        link.parentNode.removeChild(link)
      }
    }
  }
}

import { Lang }     from './js/Lang.js'
import { state }    from './js/state.js'
import { Palettes } from './js/Palettes.js'
import { Modes }    from './js/Modes.js'
import { IO }       from './js/IO.js'
import { View }     from './js/View.js'
import { Status }   from './js/Status.js'
import { Controls } from './js/Controls.js'
import { Tools }    from './js/Tools.js'

loadCSS('./js/palette.css');
loadCSS('./js/css.css');
loadCSS('./icons.css');
loadCSS('./js/fonts/PxPlus_IBM_VGA9.css');

let editTTY = {
  oninit: function(vnode) {
    console.log(state);
    state.restore();
    console.log(state);
  },
  view: function(vnode) {
    return m('section.editTTY.frow', [
      m('section.fcols', [
        m('section.frow.ViewAndTools', [
          m(View.Component),
          m(Tools)
        ]),
        m(Status)
      ]),
      /* Section: controls */
      m(Controls)
    ])
  }
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 27) {
    Modes.Get().Event({type: "Clear"})
  }
})

window.addEventListener('DOMContentLoaded', () => {
  m.route(document.body, "/", {
    "/": editTTY
  })
})

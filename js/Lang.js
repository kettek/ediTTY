import en from "./Lang/en.js"
import ru from "./Lang/ru.js"
import ja from "./Lang/ja.js"
import arr from "./Lang/arr.js"

let Lang = {
  list: {},
  preferred_lang: null,
  setLang: (lang) => {
    Lang.preferred_lang = lang
  },
  selected_lang: 0,
  // getBestLang finds the first closest language index match to the navigator's preferred languages
  getBestLang: (langs) => {
    for (let i = 0; i < langs.length; i++) {
      for (let l in Lang.list) {
        if (!Lang.list.hasOwnProperty(l)) continue
        if (new RegExp(Lang.list[l].match, 'g').test(langs[i])) {
          Lang.selected_lang = l
        }
      }
    }
    Lang.selected_lang = Object.keys(Lang.list)[0]
  },
  get: (string) => {
    let l = Lang.preferred_lang || Lang.selected_lang
    if (Lang.list[l].strings[string]) {
      return Lang.list[l].strings[string]
    }
    return string
  },
  add: (l, data) => {
    if (Lang.list[l]) {
      Lang.list[l] = Object.assign(Lang.list[l], data)
    } else {
      Lang.list[l] = data
    }
    Lang.getBestLang(navigator.languages)
  }
}
Lang.add("en", en)
Lang.add("ja", ja)
Lang.add("ru", ru)
Lang.add("arr", arr)

export { Lang }

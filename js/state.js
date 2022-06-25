let state = {
  rows: [
  ],
  selectX: -1,
  selectY: -1,
  hoverX: -1,
  hoverY: -1,
  selection: [-1, -1, -1, -1], // x, y, w, h
  selectedColor: null,
  selectedFG: null,
  selectedBG: null,
  selectedSave: 0,
  selectedLoad: 0,
  drawRune: true,
  drawFG: true,
  drawBG: true,
  fillMatchRune: true,
  fillMatchFG: true,
  fillMatchBG: true,
  exports: [
    { key: 'URxvt', get: () => {
      let text = '';
      state.palette.forEach(color => text += 'URxvt.'+color.key+': '+color.value+'\n')
      return text;
    }},
    { key: '*', get: () => {
      let text = '';
      state.palette.forEach(color => text += '*.'+color.key+': '+color.value+'\n')
      return text;
    }}
  ],
  selectedExport: 'URxvt',
  restore: () => {
    let storage = localStorage['editTTY'];
    if (storage) {
      let stored_state = JSON.parse(storage);
      state.palette = stored_state.palette;
      state.selectedExport = stored_state.selectedExport;
    } else {
      state.reset();
    }
  },
  store: () => {
    localStorage['editTTY'] = JSON.stringify(state);
  },
  reset: () => {
    let bg = 16
    let ch = 33
    for (let y = 0; y < 24; y++) {
      let row = []
      for (let x = 0; x < 80; x++) {
        row.push({fg: null, bg: null, ch: '&nbsp;'})
      }
      state.rows.push(row)
    }
    state.palette = [
      { key: 'background', value: '#090909' },
      { key: 'foreground', value: '#fef6e8' },
      { key: 'cursorColor', value: '#fef6e8' },
      { key: 'color0', value: '#1d1f21' },
      { key: 'color8', value: '#bbbbbb' },
      { key: 'color1', value: '#cc3311' },
      { key: 'color9', value: '#ee6677' },
      { key: 'color2', value: '#009988' },
      { key: 'color10', value: '#228833' },
      { key: 'color3', value: '#ee7733' },
      { key: 'color11', value: '#ccbb44' },
      { key: 'color4', value: '#0077bb' },
      { key: 'color12', value: '#4477aa' },
      { key: 'color5', value: '#ee3377' },
      { key: 'color13', value: '#aa3377' },
      { key: 'color6', value: '#33bbee' },
      { key: 'color14', value: '#66ccee' },
      { key: 'color7', value: '#dddddd' },
      { key: 'color15', value: '#ffffff' }
    ]
  }
}

export { state }

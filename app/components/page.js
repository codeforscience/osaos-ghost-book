var html = require('choo/html')
var raw = require('choo/html/raw')

module.exports = entry

function entry (state, emit) {
  return html`
    <div class="pv3 lh-copy">
      <h2 class="f2 ttu fw5 measure-narrow">${state.title}</h2>
      <div class="f5 f4-ns fw4 measure">
        ${raw(state.content)}
      </div>
    </div>
  `
}

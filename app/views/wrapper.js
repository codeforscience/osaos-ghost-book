var html = require('choo/html')
var css = require('sheetify')

var views = require('./')

module.exports = view

function view (state, emit) {
  var page = state.page

  // console.log(state.page().v())

  // loading
  if (!state.site.loaded) return renderLoading(state, emit)
  // 404
  if (!page().v('url')) return renderNotFound(state, emit)
  // view
  var view = views[page().v('view')] || views.default
  // title
  var title = getTitle(state)
  if (state.title !== title && title) emit(state.events.DOMTITLECHANGE, title)

  // template
  return html`
    <body>
      <main class="">
        ${renderNavigation(state, emit)}
        <div class="">
          ${view(state, emit)}
        </div>
      </main>
    </body>
  `
}

function renderLoading (state, emit) {
  return html`
    <body>
      <main class="">
        ${renderNavigation(state, emit)}
        <div class="loading">
        </div>
      </main>
    </body>
  `
}

function renderNotFound (state, emit) {
  return html`
    <body>
      <main class="">
        ${renderNavigation(state, emit)}
        <section class="dt w-75-l w-100 vh-100 bl b--black-10 black-70">
          <div class="tc v-mid dtc w-100 h-100 bg-lightest-blue">
            <h3 class="ttu tracked-tight f-subheadline">Page not found</h3>
          </div>
        </section>
      </main>
    </body>
  `
}

function renderNavigation (state, emit) {
  var elCss =css`

    @media print {
      :host {
        height:200px;
        size:42px;
        margin:0;
        padding:0;
      }
    }
  `
  return html`
    <article class="pb ${elCss} vh-100 dt w-100 bg-lightest-blue">
      <div class="dtc v-mid tc white ph3 ph4-l">
        <h1 class="f6 f2-m f-subheadline-l fw6 tc">OSAOS Handbook</h1>
      </div>
    </article>
  `
}

function getTitle (state) {
  var siteTitle = state.page('/').v('title')
  var pageTitle = state.page().v('title')

  return siteTitle !== pageTitle
    ? siteTitle + ' | ' + pageTitle
    : siteTitle
}

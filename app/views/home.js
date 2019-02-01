var html = require('choo/html')
var raw = require('choo/html/raw')

module.exports = home

function home (state, emit) {
  var pages = state.page().v('pages')

  return html`
    <section class="mw8-l mw7 center">
      <a href="#nav" class="link dn-p fixed right-0 mr3 mb3 f5 bottom-0">back to top</a>
      <nav class="pv6 pb" id="nav">
        ${Object.values(pages).map(sectionNav)}
      </nav>
      <div>
        ${Object.values(pages).map(sectionContent)}
      </div>
    </section>
  `

  function sectionNav (page) {
    var posts = state.page(page.url).v('pages')

    return html`
      <div class="lh-title pt2 pb4">
        <h3 class="ttc">${state.page(page.url).v('title') || page.name}</h3>
        ${Object.values(posts).map((post) => {
          var data = state.page(post.url).v()
          return html`<a class="f4 fw6 db no-underline underline-hover" href="#${post.name}">${data.title}</a>`
        })}
      </div>
    `
  }

  function sectionContent (page) {
    var posts = state.page(page.url).v('pages')

    return html`
      <div id="${page.name}" class="mv3">
        <h2 class="ttc f-subheadline">${state.page(page.url).v('title') || page.name}</h2>
        ${Object.values(posts).map(article)}
      </div>
    `
  }

  function article (post) {
    var data = state.page(post.url).v()
    return html`
      <article id="${post.name}" class="pb mt5 mb6 ph2">
        <h2 class="f1 mw7">${data.title}</h2>
        <div class="measure-wide lh-copy  pb4  ba bl-0 bt-0 br-0 b--dotted b--black-30">
          ${raw(data.content)}
        </div>
      </aritcle>
    `
  }

}

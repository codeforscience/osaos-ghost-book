const GhostContentAPI = require('@tryghost/content-api')
const fs = require('fs').promises
const path = require('path')
const mkdirp = require('mkdirp')

if (!process.env.GHOST_KEY) {
  throw (new Error('GHOST_KEY environement variable required'))
}

const api = new GhostContentAPI({
  host: 'https://osaos.codeforscience.org',
  key: process.env.GHOST_KEY,
  version: 'v2'
})

api.posts
      .browse({include: 'tags,authors'})
      .then(async (posts) => {
          // console.log(posts[0])
          posts.map(async (post) => {
            await writePost(post)
          })
      })
      .catch((err) => {
          console.error(err)
      })

async function writePost(post) {
  const fileName = path.join(__dirname, 'content', post.primary_tag.slug, post.slug, 'index.txt')
  console.log('wrritingFile', fileName)
  // console.log(post)
  mkdirp.sync(path.join(__dirname, 'content', post.primary_tag.slug, post.slug))
  const content = `
title: ${post.title}

----

content:

${post.html}
`
  fs.writeFile(fileName, content)
      .then(() =>{
        return
      })
      .catch((err) => {
        console.error(err)
        return
      })
}

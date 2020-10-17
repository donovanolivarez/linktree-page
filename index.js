const Router = require('./router')
import {getLinks, links, socialLinks} from './links'
import * as Page from './page'

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const r = new Router()
    var url = new URL(request.url)

    if (url.pathname.startsWith('/links')) {
        r.get('/links', request => getLinks(request))
    }

    r.get('/.*', request =>  Page.fetchHTMLPage(request))
    const resp = await r.route(request)

    return new HTMLRewriter()
        .on('div#links', new Page.LinksTransformer(links, socialLinks))
        .on('div#profile', new Page.AvatarTransformer())
        .on('div#social', new Page.LinksTransformer(links, socialLinks))
        .on('div > img#avatar', new Page.AvatarTransformer())
        .on('div > h1#name', new Page.AvatarTransformer())
        .on('head title', new Page.PageTransformer())
        .on('body', new Page.PageTransformer())
        .transform(resp)
}

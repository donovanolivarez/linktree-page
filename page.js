import { links, socialLinks } from './links'

export class LinksTransformer {

    constructor(links, socialLinks) {
      this.links = links
      this.socialLinks = socialLinks
    }
    
    async element(element) {
        if (element.getAttribute("id") === "links") {

        for (var link of links) {
            element.append(
                `<a href=${link.url}>${link.name}</a>`,
                {html : true} 
            )
        }
    }

        if (element.getAttribute("id") === "social") {
            element.removeAttribute("style")
            for (var link of socialLinks) {
                element.append(
                    `<a href=${link.url}>
                    ${link.svg}
                    </a>`,
                    {html : true} 
                )
            }
        }
    }
  }

  export class AvatarTransformer {
    constructor() {}

    async element(element) {
        if (element.tagName === "div") {
            element.removeAttribute("style")
        }

        if (element.tagName === "img") {
            element.setAttribute("src", 'https://media-exp1.licdn.com/dms/image/C5603AQEo7-C95j63wA/profile-displayphoto-shrink_400_400/0?e=1608163200&v=beta&t=KDrpzflAEkukzwrXxL5mdZ_1o-cu5PwD1BnDsT4PmHk');
        }
        if (element.tagName === "h1") {
            element.setInnerContent("donovanolivarez")
        }
        if (element.tagName === "title") {
            element.setInnerContent("Donovan Olivarez")
        }
    }
  }

  export class PageTransformer {
    constructor() {}
    
    async element(element) {
        if (element.tagName === "title") {
            element.setInnerContent("Donovan Olivarez")
        }

        if (element.tagName === "body") {
            element.setAttribute("style", "background-color: #E53E3E")
        }
    }
  }

export function fetchHTMLPage(request) {
    const init = {
        headers: { 'content-type': 'text/html' },
    }
    const url = `https://static-links-page.signalnerve.workers.dev`
    return fetch(url, init)
}

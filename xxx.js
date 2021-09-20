let cheerio = require('cheerio-httpcli')
let htmlEntities = require('html-entities').Html5Entities
//let htmlEntities =  Html5Entities()
let url = require('url')

const SEARCH_URL = 'https://www.google.com/search'
params = { q: 'ford', tbm: 'isch', tbs: 'isz:m', safe: 'active' }

fetch = (params) => {
    return new Promise((resolve, reject) => {
        cheerio.fetch(SEARCH_URL, params, (err, $, res) => {
            if (err) {
                return reject(err)
            }
            let urls = $('.rg_l').map((index, element) => {
                return url.parse(htmlEntities.decode($(element).attr('href')), true).query.imgurl
            }).get()
            resolve(urls)
        })
    })
}
fetch(params).then((urls) => {
    console.log(urls)
}
)
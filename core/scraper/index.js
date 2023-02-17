const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdBlockerPlugin = require('puppeteer-extra-plugin-adblocker')

const userAgents = require('./userAgents.js')
const blockResource = require('./blockResources.js')

puppeteer.use(StealthPlugin())
puppeteer.use(AdBlockerPlugin({ blockTrackers: true }))

class Scraper {
    constructor(url) {
        this.url = url
    }

    // https://stackoverflow.com/questions/52685687/how-to-run-a-node-puppeteer-app-on-ubuntu-server-as-root
    async get_page() {
        const browser = await puppeteer.launch( this.get_options())
        const page = await browser.newPage()
        await page.setUserAgent(this.random_user_agent())
        // Optimization
        await page.setRequestInterception(true)
        page.on('request', request => {
            if (this.is_block_resource(request))
                request.abort()
            else
                request.continue()
        })
        // Avoid unnecessary waiting
        await page.goto(this.url, { waitUntil: 'domcontentloaded' })
        const bodyHTML = await page.evaluate(() => document.body.innerHTML)
        await browser.close()
        return bodyHTML
    }

    get_options() {
        if (process.platform == "win32")
            return { headless: true, args: ["--no-sandbox"] }
        else
            return { executablePath: '/usr/bin/chromium-browser', headless: true, args: ["--no-sandbox"] }  
    }

    random_user_agent() {
        return userAgents[Math.floor(Math.random() * userAgents.length)]
    }

    is_block_resource(request) {
        return this.is_block_resource_type(request.resourceType()) || this.is_block_resource_name(request.url())
    }

    is_block_resource_type(resource_type) {
        return resource_type in blockResource.type
    }

    is_block_resource_name(resource_name) {
        return blockResource.name.some(name => resource_name.includes(name))
    }
}

module.exports = Scraper

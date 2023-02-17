const express = require('express')
const app = express()

const cors = require('cors')
const Scraper = require('./core/scraper/index.js')

const port = 5001

app.use(cors())
app.use(express.json())

app.post('/scrape/page', async (req, res) => {
    try {
        const request = req.body
        const url_to_scrape = request.url
        if (!url_to_scrape) {
            res.status(400).send('Url to scrape is missing')
        } else {
            console.log('Url to scrape: ' + url_to_scrape)
            const scraper = new Scraper(url_to_scrape)
            const page = await scraper.get_page()
            res.status(200).send(page)
        }
    } catch (error) {
        res.status(500).send('Error while scraping page')
        console.error(error)
    }
})

app.listen(port, () => {
    console.log(`PageScrapper listening on port ${port}`)
})
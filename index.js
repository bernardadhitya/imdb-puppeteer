const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    let movieUrl = 'https://www.imdb.com/';
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.setDefaultTimeout(90000);
    await page.goto(movieUrl, { waitUntil: 'networkidle0'});

    let data = [];

    let fanFavorites = await page.evaluate(() => {
        const container = document.querySelector('div[class="fan-picks"]');
        const matches = document.querySelectorAll('a[class="ipc-poster-card__title ipc-poster-card__title--clamp-2 ipc-poster-card__title-href"]')
        let res = [];
        matches.forEach(match => {
            let title = match.innerText;
            let url = match.href;
            res.push({
                title,
                url
            })
        })

        return res;
    })

    for (let i = 0; i < fanFavorites.length; i++) {
        let movie = fanFavorites[i];

        let title = movie.title;
        let url = movie.url;
        await page.goto(url, {waitUntil: 'networkidle2'});
        let contents = await page.evaluate(() => {
            let rating = document.querySelector('span[itemprop="ratingValue"]').innerHTML;
            let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerHTML;
            
            const container = document.querySelector('#titleStoryLine');
            const match = container.querySelector('div[class="inline canwrap"]');
            let synopsis = match.querySelector('span').innerText;
            return {
                rating,
                ratingCount,
                synopsis
            }
        })
        data.push({
            title,
            url,
            contents
        })
    }
    let json = {
        data: data
    }
    await browser.close();
    fs.writeFile('./data.json', JSON.stringify(json), err => err ? console.log(err): null);
})();

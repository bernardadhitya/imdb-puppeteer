const puppeteer = require('puppeteer');

(async () => {

    let movieUrl = 'https://www.imdb.com/';

    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(movieUrl, { waitUntil: 'networkidle2'});

    let data = await page.evaluate(() => {
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

        return {
            length: res.length,
            res
        }
    })

    console.log(data);

    await browser.close();
    
})();
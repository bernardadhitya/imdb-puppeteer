const puppeteer = require('puppeteer');

(async () => {

    let movieUrl = 'https://www.imdb.com/';

    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();

    await page.goto(movieUrl, { waitUntil: 'networkidle2'});

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
        let url = movie.url;

        await page.goto(url, {waitUntil: 'networkidle2'});
        
        let contents = await page.evaluate(() => {
            let rating = document.querySelector('span[itemprop="ratingValue"]').innerHTML;
            let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerHTML;
            
            const container = document.querySelector('#titleStoryLine');
            const match = container.querySelector('div[class="inline canwrap"]');
            
            let storyLine = match.querySelector('span').innerText;
            return {
                rating,
                ratingCount,
                storyLine
            }
        })

        data.push({
            movie,
            contents
        })
    }

    console.log(data);
    

    await browser.close();
    
})();
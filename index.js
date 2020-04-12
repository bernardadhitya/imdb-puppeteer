const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    let movieUrl = 'https://www.imdb.com/chart/top?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=RQ2TTEXHKBCAX7DG9QPV&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_ql_3';
    
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();
    await page.setDefaultTimeout(90000);
    await page.goto(movieUrl, { waitUntil: 'networkidle0'});

    let data = [];

    let topRating = await page.evaluate(() => {
        const matches = document.querySelectorAll('table[data-caller-name="chart-top250movie"] td[class="titleColumn"] a')
        console.log(matches.length);
        
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

    for (let i = 0; i < topRating.length; i++) {
        let movie = topRating[i];

        let title = movie.title;
        let url = movie.url;
        await page.goto(url, {waitUntil: 'networkidle2'});

        let contents = await page.evaluate(() => {
            let rating = document.querySelector('span[itemprop="ratingValue"]').innerHTML;
            
            let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerHTML;

            let synopsis = document.querySelector('#titleStoryLine > div[class="inline canwrap"] > p > span').innerText;
            
            let credit_summary = document.querySelectorAll('div[class="credit_summary_item"]');
            let director = credit_summary[0].querySelector('a').innerText;

            let titleCastContainer = document.querySelector('#titleCast');
            let titleCastContainerCharacter = titleCastContainer.querySelectorAll('td.character');
            let titleCastContainerName = titleCastContainer.querySelectorAll('td:not([class])');

            let cast = [];
            for(let j = 0; j < titleCastContainerName.length; j++){
                cast.push({
                    name: titleCastContainerName[j].innerText,
                    character: titleCastContainerCharacter[j].innerText
                })
            }
            

            let genreContainer = document.querySelectorAll('#titleStoryLine div[class="see-more inline canwrap"]')[1].querySelectorAll('a');
            let genres = [];
            for(let j = 0; j < genreContainer.length; j++){
                genres.push(genreContainer[j].innerText);
            }

            return {
                rating,
                ratingCount,
                synopsis,
                director,
                cast,
                genres
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

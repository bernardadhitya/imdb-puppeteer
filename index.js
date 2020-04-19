const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrollPageToBottom(page, scrollStep = 100, scrollDelay = 20) {
    const lastPosition = await page.evaluate(
        async (step, delay) => {
                const getScrollHeight = (element) => {
                    const {
                        scrollHeight,
                        offsetHeight,
                        clientHeight
                    } = element
                    return Math.max(scrollHeight, offsetHeight, clientHeight)
                }

                const position = await new Promise((resolve) => {
                    let count = 0
                    const intervalId = setInterval(() => {
                        const {
                            body
                        } = document
                        const availableScrollHeight = getScrollHeight(body)

                        window.scrollBy(0, step)
                        count += step

                        if (count >= availableScrollHeight) {
                            clearInterval(intervalId)
                            resolve(count)
                        }
                    }, delay)
                })

                return position
            },
            scrollStep,
            scrollDelay,
    )
    return lastPosition
}

(async () => {
    let movieUrl = 'https://www.imdb.com/chart/top?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=RQ2TTEXHKBCAX7DG9QPV&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_ql_3';

    let browser = await puppeteer.launch({
        headless: true
    });
    let page = await browser.newPage();
    await page.setDefaultTimeout(90000);
    await page.goto(movieUrl, {
        waitUntil: 'networkidle0'
    });

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
        let id = i + 1;
        let movie = topRating[i];
        let title = movie.title;
        let url = movie.url;
        await page.goto(url, {
            waitUntil: 'networkidle0'
        });

        setTimeout(() => {
            console.log("Scrapping (" + i + "/" + topRating.length + "): " + title + '...');
        }, 2000);

        const lastPosition = await scrollPageToBottom(page);

        let contents = await page.evaluate(() => {
            let rating = document.querySelector('span[itemprop="ratingValue"]').innerHTML;

            let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerHTML;

            let synopsis = document.querySelector('#titleStoryLine > div[class="inline canwrap"] > p > span').innerText;

            let credit_summary = document.querySelectorAll('div[class="credit_summary_item"]');
            let director = credit_summary[0].querySelector('a').innerText;

            let titleCastContainer = document.querySelector('#titleCast');
            let titleCastContainerCharacter = titleCastContainer.querySelectorAll('td.character');
            let titleCastContainerName = titleCastContainer.querySelectorAll('td:not([class])');
            let titleCastContainerImage = titleCastContainer.querySelectorAll('td.primary_photo img');


            let cast = [];
            for (let j = 0; j < titleCastContainerName.length; j++) {
                cast.push({
                    name: titleCastContainerName[j].innerText,
                    character: titleCastContainerCharacter[j].innerText,
                    image: titleCastContainerImage[j].src
                })
            }


            let genreContainer = document.querySelectorAll('#titleStoryLine div[class="see-more inline canwrap"]')[1].querySelectorAll('a');
            let genres = [];
            for (let j = 0; j < genreContainer.length; j++) {
                genres.push(genreContainer[j].innerText);
            }

            let imgUrl = document.querySelector('.title-overview .poster a').href;

            return {
                rating,
                ratingCount,
                synopsis,
                director,
                cast,
                genres,
                imgUrl
            }
        })

        await page.goto(contents.imgUrl, {
            waitUntil: 'networkidle2'
        });
        let imgUrl = await page.evaluate(() => {
            return document.querySelector('img').src;
        })

        contents.imgUrl = imgUrl;

        data.push({
            id,
            title,
            url,
            contents
        })
    }
    let json = data
    await browser.close();

    console.log(json);

    fs.writeFile('./data.json', JSON.stringify(json, null, 4), err => err ? console.log(err) : null);
})();
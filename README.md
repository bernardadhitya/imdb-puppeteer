# IMDb Web Scrapper with Puppeteer

This is a simple web scrapper on [IMDb](https://www.imdb.com); an online database of informations related to movies. The idea is to form a JSON API that makes IMDb data accessible for web applications that need movie informations. I use [Puppeteer](https://github.com/puppeteer/puppeteer); a headless chrome Node.js API, which enables us to control chromium behind the scene, simulate actions to scrape IMDb's data. For this project, I scrape IMDb's top rating movies of all time, and get basic informations like movie title, rating, and casts.

## Data Structure

Below is how each movie is listed in [data.json](https://raw.githubusercontent.com/bernardadhitya/imdb-puppeteer/master/data.json).

```json
[
    {
        "id": 1,
        "title": "",
        "url": "",
        "contents": {
            "rating": "",
            "ratingCount": "",
            "synopsis": "",
            "director": "",
            "cast": [
                {
                    "name": "",
                    "character": "",
                    "image": ""
                }
            ],
            "genres": [""],
            "imgUrl": ""
        }
    }
]
```

## Demo

For a live demo, you can check on [this link](http://imdb-vuejs-visualizer.herokuapp.com)

## Preview

![alt text](assets/preview.jpg)

This is a preview of how the sample web application using the web scrapped JSON API. This visualizer is built with Vue.js. It displays movies with their image, title, rating, synopsis and casts when hovered.

## Installation

##### Web Scrapper

Assuming you already have [Node.js](https://nodejs.org/en/download/) installed in your device, to install the project, you can clone this repository to your device, then follow these steps:
- Go to the project directory
    ```
    cd imdb-puppeteer
    ```
- Install the dependencies
    ```
    npm install
    ```
- Run the app
    ```
    node index.js
    ```

##### Visualizer

To install the visualizer, follow these steps:
- Go to the project directory
    ```
    cd imdb-puppeteer/visualizer
    ```
- Install the dependencies
    ```
    npm install
    ```
- Run the app
    ```
    npm run serve
    ```

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Resources

For this project, I use NewsAPI to gather news on every countries and Pomber's COVID-19 API to get a timeseries data of every countries.

- IMDb Main Page - [https://www.imdb.com](https://www.imdb.com)
- Puppeteer - [https://github.com/puppeteer/puppeteer](https://github.com/puppeteer/puppeteer)
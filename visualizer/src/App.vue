<template>
  <div id="app">
    <div class="container">
      <div class="heading">
        <div class="title">
          <h1>Top Rating Movies</h1>
          <p>A visualization of JSON API web scrapped from IMDb list of top rated movies</p>
        </div>
        <div class="form__group">
          <input type="text" v-model="keywords" class="form__field" placeholder="Search movie (ex: The Godfather, etc)" />
          <p v-if="keywords.length > 0">Showing {{ results.length }} matches</p>
        </div>
      </div>
      <div class="section">
        <Section :movies="results"/>
      </div>
    </div>
    <div class="footer">
        <a href="https://github.com/bernardadhitya">
            <img src='./assets/github.png' alt=""/>
        </a>
        <h6>created by Bernard Adhitya</h6>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import Section from './components/Section.vue';
import './App.scss';

export default {
  name: 'app',
  data() {
    return {
      keywords: "",
      movies: [],
      results: []
    }
  },
  components: {
    Section
  },
  async created() {
    const res = await axios.get(`https://raw.githubusercontent.com/bernardadhitya/imdb-puppeteer/master/data.json`)
    this.movies = res.data;
    this.results = this.movies;
  },
  methods: {
    searchAfterDebounce: _.debounce(
      function () {
          this.search()
      }, 500
    ),
    search () {
      this.results = this.movies.filter(movie => {
        const title = movie.title.toLowerCase();
        const query = this.keywords.toLowerCase();
        
        return title.includes(query);
      })
    }
  },
  watch: {
    keywords: function() {
        this.searchAfterDebounce()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  overflow-x: none;
}
</style>
<template>
  <div class="section">
    <div v-for="movie of movies" :key="movie.id">
      <Card 
        :id="movie.id"
        :title="movie.title"
        :url="movie.url"
        :rating="movie.contents.rating"
        :ratingCount="movie.contents.ratingCount"
        :imgUrl="movie.contents.imgUrl"
        :genre="movie.contents.genres[0]"
        :synopsis="getSynopsis(movie.contents.synopsis)"
        :casts="movie.contents.cast.slice(0, 6)"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
    name: "Section",
    props: ['movies'],
    components: {
      Card
    },
    methods: {
      getSynopsis(synopsis){
        return (synopsis.length > 150 ?  synopsis.substring(0,150) +'...' : synopsis)
      }
    }
}
</script>

<style>
  .section{
    display: flex;
    padding: 20px;
    overflow-x: scroll;
  }
  .section::-webkit-scrollbar {
    display: none;
  }
</style>
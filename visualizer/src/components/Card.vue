<template>
  <article class="card card--1">
    <div class="card__img" :style="{ backgroundImage: 'url(' + this.imgUrl + ')'}"></div>
    <a href="#" class="card_link">
      <div class="card__img--hover" :style="{ backgroundImage: 'url(' + this.imgUrl + ')'}"></div>
    </a>
    <div class="card__specific">
      <h3 class="card__title">{{ this.title }}</h3>
      <AvatarStack :casts="this.casts"></AvatarStack>
      <p>{{ this.synopsis }}</p>
      <a :href="this.url" class="card__link">Read More</a>
    </div>
    <div class="card__info">
      <span class="card__category">{{ this.genre }}</span>
      <h3 class="card__title">{{ this.title }}</h3>
      <span class="card__author">
        {{ this.rating }}
      </span>
      <span class="card__by">{{ '(' + this.ratingCount + ')' }}</span>
    </div>
  </article>
</template>

<script>
import AvatarStack from './AvatarStack.vue'

export default {
  name: "Card",
  props: ['id', 'title', 'rating', 'ratingCount', 'imgUrl', 'genre', 'synopsis', 'casts', 'url'],
  components: {
    AvatarStack
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700');
@import url('https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');

.card__img {
  visibility: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 235px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card__info-hover {
  position: absolute;
  padding: 16px;
  width: 100%;
  opacity: 0;
  top: 0;
}

.card__img--hover {
  transition: 0.2s all ease-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: absolute;
  height: 235px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  top: 0;
}

.card {
  margin-top: 20px;
  margin-left: 12px;
  margin-right: 12px;
  transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  width: 250px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.3);
}

.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
  transform: scale(1.10, 1.10);
}

.card__info, .card__specific {
  z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 16px 24px 24px 24px;
}

.card__specific {
  display: none;
  overflow-x: scroll;
}

.card__category {
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #868686;
}

.card__title {
  margin-top: 5px;
  margin-bottom: 10px;
  font-family: 'Raleway', serif;
  color: #1c2938;
}

.card__by {
  font-size: 12px;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  color: #868686;
}

.card__author {
  font-weight: 600;
  text-decoration: none;
  color: #AD7D52;
}

.card:hover .card__img--hover {
  height: 100%;
  filter: brightness(.2);
  opacity: .15;
}

.card:hover .card__info,
.card:hover .card__info .card__by,
.card:hover .card__info .card__category,
.card:hover .card__info .card__author {
  display: none;
}

.card:hover .card__specific{
  display: block;
  position: absolute;
  background-color: transparent;
  top: 0;
}

.card:hover .card__img{
  height: 350px;
}

.card:hover .card__info-hover {
  opacity: 1;
}

.card__link{
  text-decoration: none;
  color: white;
  background-color: #1E8FE1;
  padding: 5px 25px;
  border-radius: 20px;
}

</style>
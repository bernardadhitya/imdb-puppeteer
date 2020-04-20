<template>
  <div>
    <ul class="avatars">
      <li class="avatars__item" v-for="cast of casts" :key="cast.name">
        <img
        :src="cast.image"
        class="avatars__img"
        :title="getHoverString(cast.name, cast.character)"/>
      </li>
      <li class="avatars__item">
        <span class="avatars__others">{{ '...' }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import './AvatarStack.scss';
export default {
    name: "AvatarStack",
    props: ['casts'],
    methods: {
      getHoverString(name, character){
        return name + " as " + "'" + character + "'";
      }
    }
}
</script>

<style>
</style>
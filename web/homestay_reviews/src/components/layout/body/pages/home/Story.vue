<template>
  <div class="Story">
    <return :title="title" :path="'/home'" class="title"></return>
    <div class="img">
      <img :src="'story.jpg'|imgLoad()"/>
    </div>
  </div>
</template>

<script>
  import Return from './Return.vue'

  export default {
    name: 'Story',
    components: {
      Return
    },
    data () {
      return {
        title: "我们的故事",

      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .Story {
    margin-top: 10px;
    .img {
      padding: 10px;
      img {
        width: 100%;
      }
    }
  }
</style>

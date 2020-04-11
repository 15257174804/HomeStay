<template>
  <div class="Diary">
    <return :title="title" :path="'/home'"></return>
    <img :src="pic|imgLoad()" width="100%">
  </div>
</template>

<script>
  import Return from './Return.vue'

  export default {
    name: 'Diary',
    components: {
      Return
    },
    data () {
      return {
        title: "",
        pic: ""
      }
    },
    methods: {
      pickPic () {
        switch (this.img) {
          case "1":
            this.pic = `diary4.jpg`
            break;
          case "2":
            this.pic = "diary5.jpg"
            break;
          case "3":
            this.pic = "diary6.jpg"
            break;
          case "4":
            this.pic = "diary1.jpg"
            break;
          case "5":
            this.pic = "diary2.jpg"
            break;
          case "6":
            this.pic = "diary3.jpg"
            break;
        }
      }
    },
    mounted () {
      this.img = this.$route.params.img
      this.pickPic()
    }
  }
</script>

<style lang="scss" scoped>
  .Diary {

  }
</style>

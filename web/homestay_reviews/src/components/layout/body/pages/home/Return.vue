<template>
  <div class="Return">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft()"
    />
  </div>
</template>

<script>
export default {
  name: 'Return',
  data () {
    return {}
  },
  props: ["title", 'path'],
  methods: {
    onClickLeft () {
      if(!this.path){
        window.history.back(-1)
      }else{
        this.$router.push(this.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .return {

  }
</style>
<style>
  .van-nav-bar__title {
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }

  .van-nav-bar .van-icon {
    color: #000;
  }

  .vl-calendar__month {
    margin-right: 10px;
  }
</style>

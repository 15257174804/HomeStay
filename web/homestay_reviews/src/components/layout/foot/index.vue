<template>
  <div class="index">
    <van-tabbar v-model="active" active="active" :change="onChange">
      <van-tabbar-item replace  to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace  to="/search" icon="search">房源</van-tabbar-item>
      <van-tabbar-item replace  to="/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'index',
  data () {
    return { active: 0 }
  },
  methods: {
    onChange (event) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail });
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .index .van-tabbar {
    color: #006c70;

    .van-tabbar-item {
      color: #006c70;

    }
    .van-tabbar-item--active{
      color: #00c7cb;
      background-color: #f5f5f5;
    }
  }
</style>

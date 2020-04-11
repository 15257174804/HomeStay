<template>
  <div class="Protocol">
    <return :title="title" class="title" :path="'/home'"></return>
    <van-cell class="lists"
              v-for="item in list"
              :key="item"
              :title="item"
              is-link
              @click="goList(item)"
    />
  </div>
</template>

<script>
import Return from './Return.vue'

export default {
  name: 'Protocol',
  components: {
    Return
  },
  data () {
    return {
      list: ["服务协议", "房东规则", "隐私政策协议", "版权声明", "房源上线标准",
             "房客规则", "免责声明", "知识产权声明", "点评发布规则", "保险安告知书", "商城交易规则"],
      loading: false,
      finished: false,
      title: "网站协议",
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 9; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 9) {
          this.finished = true;
        }
      }, 500);
    },
    goList (item) {
      this.$router.push({ path: `/Plist/${item}`})
    }
  }
}
</script>

<style lang="scss" scoped>
  .Protocol {
    .lists {
      font-size: 12px;
      color: #333333;
    }
  }
</style>


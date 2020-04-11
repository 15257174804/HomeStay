<template>
  <div class="Plist">
    <return :title="title" :path="'/Protocol'"></return>
    <img :src="pic |imgLoad()" width="100%">
  </div>
</template>

<script>
  import Return from './Return.vue'

  export default {
    name: 'Plist',
    components: {
      Return
    },
    data () {
      return {
        title: "",
        pic: "",
      }
    },
    methods: {
      pickPic () {
        switch (this.title) {
          case "服务协议":
            this.pic = "list1.jpg"
            break;
          case "房东规则":
            this.pic = "list1.jpg"
            break;
          case "隐私政策协议":
            this.pic = "list1.jpg"
            break;
          case "版权声明":
            this.pic = "list1.jpg"
            break;
          case "房源上线标准":
            this.pic = "list1.jpg"
            break;
          case "房客规则":
            this.pic = "list1.jpg"
            break;
          case "免责声明":
            this.pic = "list1.jpg"
            break;
          case "知识产权声明":
            this.pic = "list1.jpg"
            break;
          case "点评发布规则":
            this.pic = "list1.jpg"
            break;
          case "保险安告知书":
            this.pic = "list1.jpg"
            break;
          case "商城交易规则":
            this.pic = "list1.jpg"
            break;
        }
      }
    },
    mounted () {
      this.title = this.$route.params.item
      this.pickPic()
    }
  }
</script>
<style lang="scss" scoped>
  .list1 {

  }
</style>

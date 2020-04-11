<template>
  <div class="Scenic">
    <div class="top">
      <return :title="title" class="title">
      </return>
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <van-tree-select
      :items="items"
      :active-id.sync="activeIds"
      @click-item="goSearch"
      :main-active-index.sync="activeIndex"
    />
  </div>
</template>

<script>
  import Return from './Return.vue'

  export default {
    name: 'Scenic',
    components: {
      Return
    },
    data () {
      return {
        title: "",
        value: "",
        items: [
          {
            text: '人气推荐',
            children: [
              {
                text: '西湖',
                id: 1
              },
              {
                text: '西溪国家湿地公园',
                id: 2
              },
              {
                text: '灵隐',
                id: 3
              },
              {
                text: '清河坊',
                id: 4
              },
              {
                text: '宋城',
                id: 5
              },
              {
                text: '雷峰塔',
                id: 6
              },
              {
                text: '岳王庙',
                id: 7
              },
            ]
          },
          {
            text: '时光静好',
            children: [
              {
                text: '龙井',
                id: 11
              },
              {
                text: '湘湖',
                id: 12
              },
              {
                text: '植物园',
                id: 13
              },
              {
                text: '苏堤春晓',
                id: 14
              },
              {
                text: '千岛湖',
                id: 15
              },
              {
                text: '曲院风荷',
                id: 16
              },
              {
                text: '九溪烟树',
                id: 17
              },
            ]
          },
          {
            text: '网红打卡',
            children: [
              {
                text: '野生动物世界',
                id: 21
              },
              {
                text: '长乔极地海洋世界',
                id: 22
              },
              {
                text: '太子湾公园',
                id: 23
              },
              {
                text: '杭州乐园',
                id: 24
              },
              {
                text: '省博物馆',
                id: 25
              },
              {
                text: '吴山广场',
                id: 26
              },
              {
                text: '鼓楼',
                id: 27
              },
            ]
          },
        ],
        activeIds: "",
        activeIndex: 0
      }
    },
    methods: {
      onSearch () {
        console.log("搜索")
      },
      onCancel () {
        console.log("取消");
      },
      goSearch (scenic) {
        this.$store.commit('changeScenic', scenic)
        this.$router.push({
          path: `/search`
        })
      }
    },
    mounted () {
      this.activeIds = this.$store.state.scenic.id
    }
  }
</script>

<style lang="scss" scoped>
  .Scenic {

    .top {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 5px 20px 5px 10px;
      margin-bottom: 20px;
      .van-search--show-action {
        width: 300px;
      }
      .van-search .van-cell {
        background: #006c70;
        border-radius: 20px;
        color: #fff;
        padding-left: 10px;
      }
    }
    .van-tree-select {
      padding: 0 25px;
    }
  }
</style>
<style>
  .van-sidebar-item--select {
    border-color: #006c70 !important;
  }

  .van-field__control,
  .van-field__control::-webkit-input-placeholder {
    color: #fff !important;
  }

  .van-tree-select__item--active {
    color: #006c70 !important;
  }

  .van-sidebar-item__text:hover {
    color: #006c70 !important;
  }
</style>

<template>
  <div class="Search">
    <hsearch @search="getData"></hsearch>
    <div v-if="lists.length>0" class="houseCount">
      <div class="count">搜索结果:{{ count }}条房源</div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
      >
        <div v-for="(list,i) in lists" :key="i" @click="goDetail(list.id)">
          <div slot="title" title="标签 1" class="houseImg">
            <img :src="list.img|imgLoad">
          </div>
          <div slot="title" title="标签 1" class="houseMessage">
            <div class="feature">{{list.feature.join('·')}}</div>
            <div class="title">
              {{list.title}}
            </div>
            <div class="activity">
              <div v-for="(act, acti) in list.activity" :key="acti" class="activityContent">
                <img :src="'活动.png'|imgLoad" alt=""> {{act}}
              </div>
            </div>
            <div class="price">
              <div class="currentPrice">
                ￥{{list.price}}
              </div>
              <div class="sale">
                今晚特价
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="emptyhouse" v-if="lists.length==0">
      <img :src="'empty.jpg'|imgLoad" width="100%"/>
    </div>
  </div>
</template>

<script>
  import Hsearch from './Hsearch.vue'

  export default {
    components: {
      Hsearch
    },
    data () {
      return {
        count: "",
        active: 2,
        lists: [],
        loading: false,
        finished: false,
        district: ['上城区', '下城区', '江干区', '西湖区', '拱墅区', '余杭区'],
        scenic: ['西湖', '西溪国家湿地公园', '灵隐', '清河坊', '宋城', '雷峰塔', '岳王庙', '龙井', '湘湖', '植物园', '苏堤春晓', '千岛湖',
                 '曲院风荷', '九溪烟树', '野生动物世界', '长乔极地海洋公园', '太子湾公园', '杭州乐园', '省博物馆', '吴山广场', '鼓楼']
      };
    },
    methods: {

      goDetail (id) {
        console.log(id)
        // this.$router.push({
        //   path: `/detail`,
        //   query: { id }
        // })
        this.$store.commit('changePath', "/search")
        console.log(id)
        this.$router.push("/detail?id="+id)
      },
      getData () {
        let obj = {
          district: this.district.indexOf(this.$store.state.district),
          sight: this.scenic.indexOf(this.$store.state.scenic.text),
          start_date: this.$store.state.startDate,
          end_date: this.$store.state.endDate
        }
        let params = {}
        if (obj.district == -1 && obj.sight == -1) {
        } else {
          params = obj
        }
        this.loading = true
        this.axios.get("/search", {
          params: params
        }).then(res => {
          this.loading = false
          this.count = res.data.length
          this.lists = []
          res.data.map((item, index) => {
            let newItem = {}
            newItem.id = item.id
            newItem.title = item.title
            newItem.price = item.current_price
            newItem.feature = JSON.parse(item.feature)
            newItem.activity = JSON.parse(item.activity)
            newItem.img = JSON.parse(item.picture_small)[0]
            this.lists.push(newItem)
          })
          let end = true
          if (end) {
            this.finished = true
          }
        })
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style lang="scss" scoped>
  .Search {
    background-color: #F6F6F6;
    .houseCount {
      padding: 70px 0;
      .count {
        height: 30px;
        margin: 20px;
        color: #006c70;
        font-size: 18px;
        font-weight: bold;
        line-height: 30px;
      }
      .houseImg {
        height: 220px;
        margin: 20px 15px 10px;
        img {
          width: 100%;
          height: 100%;
          display: inline-block;
          border-radius: 10px;
          box-shadow: 3px 3px 5px #9E9E9E;
        }
      }
      .houseMessage {
        margin: 0 15px 10px;
        .feature {
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #767676;
        }
        .title {
          margin: 3px 0;
          display: flex;
          align-items: center;
          font-weight: 900;
          font-size: 16px;
          color: #484848;
        }
        .activity {
          display: flex;
          align-items: center;
          .activityContent {
            display: flex;
            align-items: center;
            margin-right: 20px;
            color: #006c70;
            font-size: 12px;
            img {
              width: 12px;
            }
          }
        }
        .price {
          width: 100%;
          display: flex;
          align-items: center;
          .currentPrice {
            color: #484848;
            font-size: 18px;
            font-weight: bold;
            margin-right: 5px;
          }

          .sale {
            width: 55px;
            background-color: #31b6ac;
            font-size: 10px;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
    .emptyhouse {
      height: 100vh;
      padding: 120px 0 0;
    }
  }
</style>

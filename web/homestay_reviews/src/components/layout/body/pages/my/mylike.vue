<template>
  <div class="containerlike">
    <van-nav-bar
      title="我的收藏"
      left-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <!-- 收藏 -->
    <div class="textbody">
      <div class="hidetext" v-show="likelist.length<=0">
        <div>尚未收藏任何房源</div>
      </div>
      <div class="outline" v-for="(item,i) in likelist" :key="i">
        <!-- 小爱心 -->
        <div @click="toggle" class="love">
          <van-icon name="like" size="20" color="#fd6767"/>
        </div>
        <div class="innerline" @click="todetail(item.id)">
          <div class="photo">
            <!-- <img :src="item.picture_small|imgLoad()" alt=""> -->
            <!-- 轮播 -->
            <van-swipe indicator-color="white" :height="200">
              <van-swipe-item v-for="(p,pi) of item.picture_small" :key="pi">
                <img :src="p|imgLoad()" alt="">
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="text">
            <span>{{item.feature[0]}}·{{item.feature[1]}}·{{item.feature[2]}}</span>
            <span>{{item.title}}</span>
            <span>￥{{item.current_price}}/晚</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created () {
      this.loadMore();
    },
    data () {
      return {
        isSelected: true,
        likelist: [],   //保存服务器返回的数据结果
      }
    },
    methods: {
      loadMore () {
        var from = 0;
        var limit = 20;
        var obj = { from, limit };
        var url = "users/favorite"
        this.axios.get(url, obj)
          .then(res => {
            if (res.data == "3") {
              this.$toast("加载失败")
            } else if (res.data == "2") {
              this.$toast("请登录")
            } else {
              console.log("获取收藏夹成功")
              console.log(res.data)
              //map方法
              res.data.map((item,index)=>{
                let newItem={};
                newItem.id=item.id;
                newItem.title=item.title;
                newItem.current_price=item.current_price;
                newItem.feature=JSON.parse(item.feature);
                newItem.picture_small=JSON.parse(item.picture_small)
                this.likelist.push(newItem);
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      onClickLeft () {
        // window.history.back();
        this.$router.push("/my")
      },
      // 取消收藏
      toggle () {
        var url = "add_favorite"
        for (var item of this.likelist) {
          var obj = { room_id: item.id }
          this.axios.post(url, obj)
            .then(res => {
              // console.log(res);
              this.likelist.splice(item, 1)
              this.$toast("取消收藏");
              this.loadMore();
            })
        }
      },
      // 跳转到产品详情页？？？
      todetail (num) {
        // 查找收藏夹产品id，根据id获取产品详情页，先暂时只直接跳转到详情页
        var id=num;
        this.$store.commit('changePath', "/Mylike")
        this.$router.push("/detail?id="+id)
      },
    }
  }
</script>
<style scoped>
  .containerlike .hidetext {
    width: 100%;
    height: 250px;
    text-align: center;
    color: #484848;
    font-size: 20px;
    font-weight: 600;
    padding-top: 100px;

  }
  .textbody{
    border-bottom: 1px solid #eee;
    padding:0 30px 10px;
  }

  .containerlike .hidetext div {
    border-bottom: 1px solid #eee;
    width: 170px;
    padding-bottom: 5px;
    margin: 0 auto;
  }

  .containerlike {
    margin-top: 46px;
  }

  .containerlike .outline {
    position: relative;
    padding-top: 20px;
  }

  .containerlike .outline .love {
    position: absolute;
    top: 30px;
    right: 15px;
    z-index: 1;
  }

  .containerlike .outline .innerline .photo {
    width: 100%;
    height: 200px;
  }

  .containerlike .outline .innerline .photo img {
    width: 100%;
    height: 100%;
  }

  .containerlike .outline .innerline .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .containerlike .outline .innerline .text span:first-child {
    color: #7d7e80;
    font-size: 12px;
  }

  .containerlike .outline .innerline .text span:not(:first-child) {
    color: #484848;
    font-size: 14px;
    font-weight: 700;
  }
</style>


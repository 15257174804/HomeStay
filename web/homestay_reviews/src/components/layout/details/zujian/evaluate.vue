<template>
  <div>
    <div class="evaluate_box">
      <div class="evaluate_box_in">
        <div class="evaluate_header">
          <div class="evaluate_header_left">房客点评</div>
          <div class="evaluate_header_right">
            <router-link to="/comment_content">全部评论<img :src="'右箭头.png'|imgLoad()" alt></router-link>
          </div>
        </div>
        <div class="evaluate_star">
          <van-rate v-model="val" class="star_1" readonly/>
          <van-tag color="#f8af07" class="star_2">5.0</van-tag>
        </div>
        <div class="evaluate_body">
          <div class="evaluate_content" v-for="(review,i) of reviews" :key="i">
            <div class="evaluate_content_header">
              <div class="evaluate_content_header_left">
                <div class="idOrmember">
                  <div class="user_id">{{review.name}}</div>
                  <div class="member">超级会员</div>
                </div>
                <div class="timeOrOwner">
                  <span>2019.11</span>
                  <span>·</span>
                  <span>房东已点评房客</span>
                </div>
              </div>
              <div class="evaluate_content_header_right">
                <div class="head_portrait_box">
                  <img src="../../../../../static/images/dog.jpg" alt="">
                </div>
              </div>
            </div>
            <div class="evaluate_content_footer">
              {{review.content}}
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="evaluate_footer" @click="all()">
      查看全部{{reviews.length}}条评论
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
  export default {
    name: "Evaluate",
    created(){
      this.loadMore()
    },
    data () {
      return {
        val: 5,
        evaluates: [{}, {}, {}],
        transitionName: 'fold-left',
        // 数据库评论
        reviews:[]
      };
    },
    methods:{
      // 评论
      loadMore(){
        let url ="detail?id=" + this.id
        this.axios.get(url,{}).then(res => {
          this.detail_lists = res.data;
           this.reviews=this.detail_lists.review
           console.log(this.detail_lists.review)
          // this.id = this.detail_lists.id;
          // this.title = this.detail_lists.title;
          // this.current_price = this.detail_lists.current_price;
          // this.sight = this.detail_lists.sight;
          // this.origin_price = this.detail_lists.origin_price;
          // this.describe_detail = this.detail_lists.describe_detail;
          // console.log(this.review)
        })
      },
      all(){
        this.$router.push({path:"/comment_content",query:{id:this.id}})
        // console.log(this.$route.query.id)
      }
    },
    computed: {
      ...mapState(["detail_lists","id"]),
      detail_lists: {
        get: function () {
          return this.$store.state.detail_lists;
        },
        set: function (detail_lists) {
          return (this.$store.state.detail_lists = detail_lists);
        }
      },
      id: {
        get: function () {
          return this.$store.state.id;
        },
        set: function (id) {
          return (this.$store.state.id = id);
        }
      }
    }
  };
</script>
<style>
  .evaluate_box {
    width: 100%;
    
    padding: 10px 10px;
    box-sizing: border-box;
  }

  .evaluate_box_in {
    width: 100%;
    height: 100%;

    border-radius: 10px;
  }

  /* 评价头 */
  .evaluate_header {
    width: 100%;
    height: 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .evaluate_header_left {
    font-size: 18px;
    color: #999;
  }

  .evaluate_header_right img {
    margin-top: 2px;
    width: 10px;

  }

  .evaluate_header_right a {
    color: #999;
  }

  /* 评论打星 位置 */
  .evaluate_star {
    width: 100%;
    height: 40px;
    background-color: rgb(247, 237, 126);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .star_2 {
    margin-left: 2px;
  }

  .star_1 {
    margin-right: 2px;
  }

  /* 评论区 */
  .evaluate_body {
    width: 100%;

    display: flex;
    flex-direction: column;
  }
  .evaluate_content {
    width: 100%;
    height: 33%;
    margin: 10px 0;
  }

  /* 评论用户信息 及头像 */
  .evaluate_content_header {
    width: 100%;
    height: 50%;;
    display: flex;
    justify-content: space-between;
  }

  /* 用户信息左边 */
  .evaluate_content_header_left {
    width: 40%;
    height: 100%;

  }

  /* 用户id 会员 */
  .idOrmember {
    width: 100%;
    height: 50%;

    display: flex;
    align-items: center;
  }

  .user_id {
    font-size: 17px;
    color: #000;
    font-weight: 700;
  }

  .member {
    width: 70px;
    height: 70%;
    border-radius: 10px;
    background-image: linear-gradient(to bottom, rgb(248, 242, 187), rgb(201, 201, 3));
    font-size: 8px;
    font-weight: normal;
    margin-left: 4px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 评价事件 房东回复 */
  .timeOrOwner {
    width: 100%;
    height: 50%;

    display: flex;
    align-items: center;
    color: #999;
    font-size: 10px;
  }

  /* 用户信息右边 */
  .evaluate_content_header_right {
    width: 13%;
    height: 100%;

    display: flex;
    align-items: center;
  }

  .head_portrait_box {
    width: 45px;
    height: 45px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
  }

  .head_portrait_box img {
    width: 45px;
  }

  /* 评论用户内容 */
  .evaluate_content .evaluate_content_footer {
    width: 100%;
    height: 55%;

    color: #000;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .evaluate_footer {
    width: 100%;
    height: 40px;
    border: 1px solid #333;
    margin-top: 10px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items:center;
    color:#000;
    font-weight: 600;
  }

 
</style>

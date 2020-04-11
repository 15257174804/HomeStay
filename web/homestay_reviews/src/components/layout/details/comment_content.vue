<template>
  <div class="comment_box">
    <div class="comment_return_box">
      <div class="comment_return_box_in">
        <div class="comment_return" @click="comment_return(id)">
            <img :src="'返回.png'|imgLoad()" alt>
        </div>
      </div>
    </div>
    <div>
      <div class="comment_content_header">
        <!-- <div class="comment_content_header_top">
          <div class="comment_content_grade">
            <div class="comment_content_grade_d1">5.0</div>
            <div class="comment_content_grade_d2">(共{{reviews_2.length}}条)</div>
            <div class="comment_content_grade_d3">
              <van-rate v-model="value" readonly :size="12" color="#fff"/>
            </div>
          </div>
        </div> -->
        <!-- <div class="comment_content_header_bottom">
          <div class="comment_content_aspect">
            <div class="comment_content_aspect_box" v-for="(aspect,i) in aspects" :key="i">
              <div>{{aspect.sort}}</div>
              <div>············</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="comment_content_box">
      <div class="comment_content_box_in">
        <div class="comment_content_footer">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(review,i) in reviews_2" :key="i"  class="comment_evaluate_1">
              <div class="evaluate_content_1">
                <div class="evaluate_content_header_1">
                  <div class="evaluate_content_header_left_1">
                    <div class="idOrmember">
                      <div class="user_id">小可爱</div>
                      <div class="member">超级会员</div>
                    </div>
                    <div class="timeOrOwner">
                      <span>2019.11</span>
                      <span>·</span>
                      <span>房东已点评房客</span>
                    </div>
                  </div>
                  <div class="evaluate_content_header_right_1">
                    <div class="head_portrait_box">
                      <img :src="'dog.jpg'|imgLoad()" alt>
                    </div>
                  </div>
                </div>
                <div class="evaluate_content_footer_1">{{review.content}}</div>
              </div>
            </van-cell>
          </van-list>
          <div class="announce_box_height"></div>
        </div>
      </div>
    </div>
    <div class="announce_box_yes" :class="{announce_box_yes_yes:yesOrNo}">
    <div class="announce_box">
      <div class="announce_box_left">
        <input type="text" placeholder="我也说几句" v-model="say">
      </div>
      <div class="announce_box_right">
        <button @click="send()">发送</button>
      </div>
    </div>
    </div>
    <div class="announce_box_no" :class="{announce_box_no_no:yesOrNo}">
      <div class="announce_box">
        <div class="announce_box_center">订单完成后可评论</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";

import { Toast } from "vant";
import { mapState } from "vuex";
Vue.use(Toast);
// 全局注册
Vue.use(Dialog);

export default {
  created(){
    this.pay_loading();
    this.more()
  },
  data() {
    return {
      say: "",
      in_say: "",
      value: 5,
      aspects: [
        { sort: "整洁卫生" },
        { sort: "安全程度" },
        { sort: "描述相符" },
        { sort: "交通位置" },
        { sort: "性价比" }
      ],
      list: [],
      loading: false,
      finished: false,
      // 数据库
      star: 4,
      yesOrNo:false,
      reviews_2:[]

    };
  },
  //  created(){
  //     let url = "/review";
  //      var room_id = this.room_id;
  //      var content = this.content;
  //      var star = this.star;
  //      var obj = { room_id: room_id, content: content, star: star };
  //      this.axios.post(url, obj).then(res => {
  //        console.log(res)
  //      })
  //  },


  methods: {
    more(){
      this.reviews_2=this.detail_lists.review
    },
    pay_loading(){
      if(this.order=="订单已支付"){
        this.yesOrNo=true
        console.log("成功")
      }else{
        this.yesOrNo=false
      }
    },
    // 返回
    comment_return() {
      this.$router.push({ path: "/detail",query:{id:this.id}});
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < this.detail_lists.review.length; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 0) {
          this.finished = true;
        }
      }, 500);
    },
    send() {
          console.log(this.id)
          if (this.say == "") {
            Toast("评论不能为空");
          } else {
            let url = "/review";
            let room_id = this.id;
            let content = this.say;
            let star = this.star;
            let obj = { room_id: this.id, content: content, star: star };
            // let obj = `room_id=${this.id}&content=${this.say}&star=${this.star}`;
            let header = {headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://127.0.0.1:8081',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json; charset=utf-8'
              },
            };
            this.axios.post(url, obj, header).then(res => {
              if (this.say == "") {
                Toast("评论不能为空");
              } else {
                this.list.push(this.say);
                Toast("发表成功");
                console.log(this.say)
                console.log(res)
               this.$router.push({ path: "/Detail",query:{id:this.id}})
              }
            });

          }

        }

  },
  computed: {
    ...mapState(["detail_lists","order","id"]),
    order: {
      get: function() {
        return this.$store.state.order;
      },
      set: function(order) {
        return (this.$store.state.order = order);
      }
    },
    id: {
      get: function() {
        return this.$store.state.id;
      },
      set: function(id) {
        return (this.$store.state.id = id);
      }
    }
  }
};
</script>

<style>
/* 详情头返回头 */
.comment_return_box {
  width: 100%;
  height: 45px;

  position: fixed;
  top: 0;
  padding: 10px 10px;
  z-index: 999;
  background-color: rgba(238, 238, 238, 0.8);
}
.comment_return_box_in {
  width: 100%;
  height: 100%;
}
.comment_return {
  width: 25px;
  height: 25px;
}
.comment_return img {
  width: 25px;
}
.comment_return a {
  display: block;
  width: 100%;
  height: 100%;
}
.comment_content_box {
  width: 100%;

  padding: 10px 10px;
  box-sizing: border-box;
}
.comment_content_box_in {
  width: 100%;
  height: 100%;
}
/* 评论头部 */
.comment_content_header {
  width: 100%;
  height: 45px;
  background-color: #eee;
}
/* 上半部分 */
.comment_content_header_top {
  width: 100%;
  height: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.comment_content_grade {
  width: 120px;
  height: 120px;
  background-color: #3e9fa2;
  border-radius: 10px;
  padding: 10px 10px;
  box-sizing: border-box;
}
.comment_content_grade_d1 {
  width: 100%;
  height: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #fff;
}
.comment_content_grade_d2 {
  width: 100%;
  height: 25%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
}
.comment_content_grade_d3 {
  width: 100%;
  height: 25%;

  display: flex;
  justify-content: center;
  align-items: center;
}
/* 下半部分 */
.comment_content_header_bottom {
  width: 100%;
  height: 50%;

  padding: 20px 40px;
}
.comment_content_aspect {
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/* 方面内容 */
.comment_content_aspect_box {
  width: 45%;
  height: 33.33%;
  background-color: #fff;
}
.comment_content_aspect_box div:nth-child(1) {
  width: 100%;
  height: 50%;

  font-size: 15px;
  display: flex;
  align-items: center;
  color: #000;
  background-color: #eee;
}
.comment_content_aspect_box div:nth-child(2) {
  width: 100%;
  height: 50%;
  border-right: 3px solid #006c70;
  font-size: 30px;
  color: #006c70;
  display: flex;
  align-items: center;
  background-color: #eee;
}
/* 评论区 */
.comment_evaluate_1 .evaluate_body_1 {
  width: 100%;
  height: 313px;

  display: flex;
  flex-direction: column;
}
.comment_evaluate_1 .evaluate_content_1 {
  width: 100%;
  height: 100%;
}
/* 评论用户信息 及头像 */
.comment_evaluate_1 .evaluate_content_header_1 {
  width: 100%;

  display: flex;
  justify-content: space-between;
}
/* 用户信息左边 */
.comment_evaluate_1 .evaluate_content_header_left_1 {
  width: 80%;
  height: 100%;
}
/* 用户id 会员 */
.comment_evaluate_1 .idOrmember {
  width: 100%;

  display: flex;
  align-items: center;
}
.comment_evaluate_1 .user_id {
  font-size: 17px;
  color: #000;
  font-weight: 700;
}
.comment_evaluate_1 .member {
  width: 70px;
  height: 18px;
  border-radius: 10px;
  background-image: linear-gradient(
    to bottom,
    rgb(248, 242, 187),
    rgb(201, 201, 3)
  );
  font-size: 8px;
  font-weight: normal;
  margin-left: 4px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 评价事件 房东回复 */
.comment_evaluate_1 .timeOrOwner {
  width: 100%;

  display: flex;
  align-items: center;
  color: #999;
  font-size: 10px;
}
/* 用户信息右边 */
.comment_evaluate_1 .evaluate_content_header_right_1 {
  width: 20%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
.comment_evaluate_1 .head_portrait_box {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
}
.comment_evaluate_1 .head_portrait_box img {
  width: 45px;
}
/* 评论用户内容 */
.comment_evaluate_1 .evaluate_content_footer_1 {
  width: 100%;
  text-align: left;
  color: #000;
}
.comment_evaluate_1 .evaluate_footer_1 {
  width: 100%;
  height: 40px;
  border: 1px solid #333;
  margin-top: 10px;
}
.comment_evaluate_1 .evaluate_footer_1 a {
  width: 100%;
  height: 40px;
  display: block;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #000;
}
/* 列表组件样式 */
.comment_evaluate_1 .van-cell__title {
  display: none;
}
.comment_content_footer .van-cell {
  border-bottom: 1px solid #ccc;
}
.comment_box {
  position: absolute;
  width: 100%;
}
/* 下单结束后发表评论 */

.announce_box_yes{
  display: none;
}
.announce_box_yes_yes{
  display: block;
}
.announce_box {
  width: 100%;
  height: 35px;
  position: fixed;
  bottom: 0;
  background: #006c70;
  display: flex;
  justify-content: space-around;
  padding: 5px 50px;
}
.van-toast--text {
  background: #006c70;
}
/* 左边 */
.announce_box_left {
  width: 65%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
/* 输入框 */
.announce_box_left input {
  width: 100%;
  height: 100%;
  background-color: #fff;
  outline: none;
  border: 0;
  border-radius: 10px;
  overflow: hidden;
  padding: 0 10px;
  box-sizing: border-box;
  color: #000;
}
.announce_box_right {
  width: 20%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
}
/* 发送按钮 */
.announce_box_right button {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: 0;
  background-color: #0b3c3e;
  color: #fff;
  font-size: 14px;
}
.announce_box_height {
  width: 100%;
  height: 35px;
}
/* 为下单评论 */
.announce_box_no{
  display: block;
}
.announce_box_no_no{
  display:none;
}
.announce_box_center{
  font-size: 16px;
  color: #fff;
  line-height: 25px;
  font-weight: 600;
}
</style>

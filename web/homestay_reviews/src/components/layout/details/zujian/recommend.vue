<template>
  <div>
    <div class="recommend_box">
      <div class="recommend_box_in">
        <div class="recommend_title">推荐房源</div>
        <van-tabs animated :swipe-threshold="2" :line-width="0" :line-height="0" class="d1">
          <van-tab v-for="(list,i) in lists" :key="i" swipeable title-style="flex-basis:90%;">
            <div slot="title" title="标签 1" class="recommend_img">
              <img :src="list.img" alt class="img">
            </div>
            <div slot="title" title="标签 1" class="recommend_message_box">
              <div class="recommend_message_box_left">
                <div class="recommend_message_distance">距杭州市西湖区0m&nbsp;-&nbsp;整套出租·三室一厅·三张床</div>
                <div class="recommend_message_name">
                  海棠湾三居游泳花园别墅☆可随时拎包入住
                </div>
                <div class="recommend_message_discounts">
                  <div class="recommend_message_discounts_content">
                    <img :src="'活动.png'|imgLoad()" alt=""> 速订
                  </div>
                  <div class="recommend_message_discounts_content">
                    <img :src="'活动.png'|imgLoad()" alt=""> 长租优惠
                  </div>
                </div>
                <div class="recommend_message_member">
                  <div class="recommend_message_member_1">
                    ￥2000
                  </div>
                  <div class="recommend_message_member_2">
                    今晚特价
                  </div>
                </div>
              </div>
              <div class="recommend_message_box_right">
                <div class="recommend_message_box_right_img">
                  <img :src="'dog.jpg'|imgLoad()" alt="">
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "Recommend",
    data () {
      return {
        active: 2,
        lists: [
          {
            img: require("../../../../../static/images/yhl_img/1.jpg"),
            room: "南侧主卧",
            price: 1299
          },
          {
            img: require("../../../../../static/images/yhl_img/2.jpg"),
            room: "西侧主卧",
            price: 1100
          },
          {
            img: require("../../../../../static/images/yhl_img/3.jpg"),
            room: "北侧主卧",
            price: 1500
          }
        ]
      };
    }
  }
</script>.live_title
<style>
  .recommend_box {
    width: 100%;

    padding: 10px 10px;
    box-sizing: border-box;
  }

  .recommend_box_in {
    width: 100%;
    height: 100%;

  }

  .recommend_title {
    width: 100%;
    height: 30px;

    color: #999;
    font-size: 18px;
    line-height: 30px;
  }

  /* 房源 样式 */
  .recommend_box_in .van-tabs--line .van-tabs__wrap {
    height: 335px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }

  /* 插槽 样式 */
  .recommend_img {
    height: 200px;
  }

  .recommend_img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .recommend_box_in .van-tab {
    padding: 0 10px 0px 0px;
  }

  /* 推荐房源信息 */
  .recommend_message_box {
    width: 100%;
    height: 100px;

    display: flex;

  }

  /* 左边内容 */
  .recommend_message_box_left {
    width: 90%;
    height: 100%;

    display: flex;
    flex-direction: column;
  }

  /* 房源距离 */
  .recommend_message_distance {
    width: 100%;
    height: 20%;

    display: flex;
    align-items: center;
    font-size: 10px;
    color: #333;
  }

  .recommend_message_name {
    width: 100%;
    height: 30%;

    display: flex;
    align-items: center;
    font-weight: 900;
    font-size: 14px;
    color: rgb(14, 13, 13);

  }

  /* 速订 长租优惠 */
  .recommend_message_discounts {
    width: 100%;
    height: 20%;

    display: flex;

  }

  .recommend_message_discounts_content {
    width: 50px;
    height: 100%;

    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #006c70;
  }

  .recommend_message_discounts_content img {
    height: 12px;
  }

  /* 今晚特价 */
  .recommend_message_member {
    width: 100%;
    height: 30%;

    display: flex;
    align-items: center;
  }

  .recommend_message_member_1 {
    width: 60px;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    font-weight: 700;
    font-size: 18px;
  }

  .recommend_message_member_2 {
    width: 50px;
    height: 60%;
    background-color: #60b6b5;
    font-size: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
  }


  /* 右边内容 */
  /* .recommend_message_box_right{

    height: 100%;


  } */
  .recommend_message_box_right_img {
    width: 45px;
    height: 45px;

    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
  }

  .recommend_message_box_right_img img {
    width: 45px;
  }
</style>

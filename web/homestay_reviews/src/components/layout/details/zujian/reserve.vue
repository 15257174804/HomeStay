<template>
  <div>
    <div class="reserve_box_out">
      <div class="reserve_box_in">
        <!-- <van-tabs animated :swipe-threshold="2" swipeable title-style="border-radius:50%" v-model="active">
          <van-tab v-for="(detail_img_list,i) of detail_img_lists" :key="i" title-style="flex-basis:50%;" class="reserve_box_in_content">
            <div slot="title" title="标签 1" class="slot_img" @click="doit(detail_lists.current_price,detail_img_list.room)">
              <img :src="detail_img_list.img" class="img">
            </div>
            <div slot="title" title="标签 1" class="room_position">{{detail_img_list.room}}</div>
            <div class="total_box">
              <div class="total_box_left">
                <div class="room">{{detail_img_list.room}}</div>
                <div class="oneDayPrices">￥{{detail_lists.current_price}}&nbsp;/&nbsp;天</div>
              </div>
              <div class="total_box_right">
                <div class="totalDays">共{{day}}天</div>
                <div class="total">
                  <span>￥</span>
                  <span>{{(detail_lists.current_price*day).toFixed(2)}}</span>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs> -->
        <div class="room_box">
          <!-- <dir class="room_box_top">
            <img src="../../../../../static/images/ljj-3-2.jpg" alt="">
          </dir> -->
          <!-- <dir class="room_box_bottom">
            <div class="room_box_center">大床房</div>
            <div class="room_box_left">
              现价￥：{{detail_lists.current_price}}/天
            </div>
            <div class="room_box_right">
              原价￥：{{detail_lists.origin_price}}
            </div>
          </dir> -->
        </div>
        <div class="live_time_box">
          <div class="live_title" @click="dddd">选择入住天数:</div>
          <div class="live_time">
            <van-stepper v-model="day"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";

  export default {
    name: "Reserve",
    data () {
      return {
        active: 0
        // day: 1,
        // lists: [
        //   {
        //     img: require("../../../../assets/yhl_img/1.jpg"),
        //     room: "南侧主卧",
        //     price: 1299
        //   },
        //   {
        //     img: require("../../../../assets/yhl_img/2.jpg"),
        //     room: "西侧主卧",
        //     price: 1100
        //   },
        //   {
        //     img: require("../../../../assets/yhl_img/3.jpg"),
        //     room: "北侧主卧",
        //     price: 1500
        //   }
        // ]
      };
    },

    methods: {
      doit (p, r) {
        this.price = p
        this.room = r
        console.log(this.room)
      },
      dddd () {
        console.log(this.detail_lists)
        console.log(this.imgList[1])
      }
    },
    computed: {
      ...mapState(["day", "detail_lists", "price", "room", "detail_img_lists","imgList"]),
      day: {
        get: function () {
          return this.$store.state.day
        },
        set: function (day) {
          return this.$store.state.day = day
        }
      },
      price: {
        get: function () {
          return this.$store.state.price
        },
        set: function (price) {
          return this.$store.state.price = price
        }
      },
      room: {
        get: function () {
          return this.$store.state.room
        },
        set: function (room) {
          return this.$store.state.room = room
        }
      }
    }
  };
</script>
<style>
  .reserve_box_out {
    width: 100%;
   
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .reserve_box_in {
    width: 95%;
    height: 100%;
    box-shadow: 0px 0px 10px 0px rgb(87, 86, 86,.5);
    box-sizing: border-box;
    
    overflow: hidden;
    z-index: 100;
  }
/* 房间 */
.room_box{
  width: 100%;
  
  padding: 0px 0px 0px 0px;
  box-sizing: border-box;
}
.room_box_top{
  width: 100%;height: 80%;
  background-color: rgb(151, 216, 202,.1);
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.room_box_top img{
  width: 70%;height: 100%;
}
.room_box_bottom{
  width: 100%;height: 20%;
  background-color: rgb(151, 216, 202,.1);
  display: flex;
  justify-content: space-around; 
}
.room_box_center{
  width: 30%;height: 100%;
  
  display: flex;
  color: #333;
  font-size: 15px;
  justify-content: center;
  align-items: center;
}
.room_box_left{
  width: 30%;height: 100%;
  
  display: flex;
  color: #f00;
  font-size: 15px;
  justify-content: center;
  align-items: center;
}
.room_box_right{
  width: 30%;height: 100%;
  
  display: flex;
  color: #333;
  font-size: 15px;
  justify-content: center;
  align-items: center;
}

  /* 标签页内容 */
  .reserve_box_in .van-tabs--line .van-tabs__wrap {
    height: 150px;
  }

  .van-tab {
    padding: 0px 1px;
  }

  .reserve_box_in_content {
   
    overflow: hidden;
  }

  /* 插槽 div */
  .slot_img {
    height: 114px;
  }

  .img {
    width: 100%;
    height: 100%;
  }

  /* 房间 方向 */
  .room_position {
    width: 95%;
    height: 25px;
    border: 1px solid #ccc;
    color: #006c70;
    font-size: 14px;
    line-height: 25px;
    font-weight: bold;
    margin: 2px auto;
  }

  /* 总价计算 */
  .total_box {
    width: 100%;
    height: 40px;

    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    box-sizing: border-box;
  }

  /* 房间位置 一天价格 */
  .total_box_left {
    width: 40%;
    height: 100%;

    display: flex;
    justify-content: space-between;
  }

  .room {
    width: 55%;
    height: 100%;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 18px;
  }

  .oneDayPrices {
    width: 40%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 12px;
  }

  .total_box_right {
    width: 50%;
    height: 100%;

    display: flex;
    justify-content: flex-end;
  }

  /* 选择天数 与总价 */
  .totalDays {
    width: 40%;
    height: 100%;

    font-size: 12px;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .total {
    width: 40%;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .total span:nth-child(1) {
    font-size: 12px;
    color: #f00;
  }

  .total span:nth-child(2) {
    font-size: 18px;
    margin-bottom: 3px;
    color: #f00;
    font-weight: bold;
  }

  .total span:nth-child(3) {
    font-size: 12px;
    color: #f00;
  }

  /* 居住时间 */
  .live_time_box {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    border-radius: 5px;
    border-top: 1px solid #ccc;
    background: #8f969654;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  .live_title {
    width: 30%;
    height: 100%;
    font-weight: 800;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333;
  }

  .live_time {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .van-tabs__line{
    background: #006c70;
  }
</style>

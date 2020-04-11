<template>
  <div class="pay_box">
    <div class="pay_header">
      <div class="pay_header_return" @click="pay_return">
        <img :src="'左箭头黑.png'|imgLoad()" alt>
      </div>
      <div class="pay_header_reserve">预定</div>
      <div class="pay_header_reserve_empty"></div>
    </div>
    <div class="pay_box_out">
      <div class="pay_box_in">
        <div class="pay_header_height"></div>
        <div class="pay_body_top">
          <div class="pay_body_top_left">
            <img :src="'yhl_img/1.jpg'|imgLoad()" alt>
          </div>
          <div class="pay_body_top_right">
            <div class="pay_body_top_right_title">{{detail_lists.title}}</div>
            <div class="pay_body_top_right_content">
              <div>{{room}}</div>
              <div>共{{day}}天</div>
              <div>￥{{(detail_lists.current_price*day).toFixed(2)}}</div>
            </div>
          </div>
        </div>
        <!-- <div class="pay_body_center">
          <van-cell is-link @click="showPopup('startTime')" class="time_select">
            <div class="pay_body_center_inTime">
              <div class="time_content_1">入住时间</div>
              <div class="time_content_2">{{in_day}}</div>
              <div class="time_content_3">{{in_year}}年{{in_month}}月{{in_day}}日</div>
            </div>
          </van-cell>
          <van-popup v-model="show" position="bottom">
            <van-datetime-picker
              type="date"
              @cancel="showPopup"
              v-model="startCurrentDate"
              @confirm="confirm_start"
              v-if="startOrEnd == 'startTime'"
              :min-date="startMinDate"
              :max-date="startMaxDate"
            />
            <van-datetime-picker
              type="date"
              @cancel="showPopup"
              v-model="endCurrentDate"
              @confirm="confirm_end"
              v-if="startOrEnd == 'endTime'"
              :min-date="endMinDate"
              :max-date="endMaxDate"
            />
          </van-popup>
          <div class="pay_body_center_sumTime">
            <div></div>
            <div>共{{days}}晚</div>
            <div></div>
          </div>
          <van-cell is-link @click="showPopup('endTime')" class="time_select">
            <div class="pay_body_center_outTime">
              <div class="time_content_1">离店时间</div>
              <div class="time_content_2">{{out_day}}</div>
              <div class="time_content_3">{{out_year}}年{{out_month}}月{{out_day}}日</div>
            </div>
          </van-cell>
        </div> -->
        <!-- 入住人信息 -->
        <div class="pay_body_bottom">
          <div class="pay_body_bottom_title">入住人信息</div>
          <van-address-list v-model="chosenAddressId" :list="save_list" @edit="onEdit" name="cross"/>

          <!-- <div v-for="(item,i) in save_list" :key="i" class="pay_body_bottom_content_list">
            {{item.uname}}

          </div>-->
          <div class="pay_body_bottom_content" @click="onAdd">
            <div class="pay_body_bottom_img">
              <img :src="'加号.png'|imgLoad()" alt>
            </div>
            <div class="pay_body_bottom_add">添加入住人</div>
          </div>
        </div>
        <!-- 抵达时间 -->
        <div class="pay_footer_top">
          <div class="pay_footer_top_title">底店时间</div>
          <div class="pay_footer_top_content">
            <van-slider
              v-model="times"
              active-color="#ffc977"
              inactive-color="#ffc977"
              bar-height="4px"
              :max="24"
              class="pay_footer_top_time"
            >
              <div slot="button" class="custom-button">
                <div class="custom_box">{{times}}:00</div>
              </div>
            </van-slider>
          </div>
        </div>
        <!-- 订单状态 -->
        <div class="pay_footer_center">
          <van-steps :active="active">
            <van-step>买家下单</van-step>
            <van-step>商家接单</van-step>
            <van-step>订单中</van-step>
            <van-step>交易完成</van-step>
          </van-steps>
        </div>
        <!-- 支付 -->
      </div>
    </div>
    <div class="pay_footer_footer_height"></div>
    <div class="pay_footer_footer">
      <div class="pay_footer_footer_left">￥{{(detail_lists.current_price*day).toFixed(2)}}</div>
      <div class="pay_footer_footer_right" @click="pay()">{{order}}</div>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import Vue from "vue";
  import { Dialog } from "vant";
  import { Icon } from "vant";

  Vue.use(Icon);

  // 全局注册
  Vue.use(Dialog);
  var date = new Date();
  export default {
    data () {
      return {
        order_id: 1,
        active: 0,
        chosenAddressId: "1",
        startMinDate: new Date(),
        startMaxDate: new Date(),
        endMinDate: new Date(),
        endMaxDate: new Date(),
        in_year: date.getFullYear(),
        in_month: date.getMonth() + 1,
        in_day: date.getDate(),
        out_year: date.getFullYear(),
        out_month: date.getMonth() + 1,
        out_day: "",
        days: 1,
        startOrEnd: "",
        show: false,
        startCurrentDate: new Date(),
        endCurrentDate: new Date(),
        times: 12,
        // 入住人列表
        chosenAddressId: "1"
      };
    },
    created () {
      // 结束默认时间 最大两年
      this.endCurrentDate.setDate(this.endCurrentDate.getFullYear() - 9);
      // 结束默认最小时间 开始默认时间+4
      this.endMinDate.setDate(this.startCurrentDate.getDate() + 1);
      // this.endMinDate.setMonth(this.startCurrentDate.getMonth() + 1);
      this.endMaxDate.setFullYear(this.endMaxDate.getFullYear() + 1);
      // 开始默认时间 最大两年
      this.startMaxDate.setFullYear(this.startMaxDate.getFullYear() + 1);
    },
    mounted () {
      this.days = this.day
      this.out_day = date.getDate() + this.days
    },
    methods: {
      // 返回
      pay_return () {

        this.$router.push({ path: "/detail",query:{id:this.id}});
      },
      showPopup (picker) {
        if (this.show == false) {
          this.show = true;
          this.startOrEnd = picker;
        } else if (this.show == true) {
          this.show = false;
          this.startOrEnd = "";
        }
      },
      formatDate: function (d) {
        return (
          d.getFullYear() +
          "-" +
          this.p(d.getMonth() + 1) +
          "-" +
          this.p(d.getDate()) +
          "-" +
          this.p(d.getHours()) +
          ":" +
          this.p(d.getMinutes()) +
          ":" +
          this.p(d.getSeconds())
        );
      },
      p (s) {
        return s < 10 ? "0" + s : s;
      },
      confirm_start (d) {
        this.startdataTime = this.formatDate(d);
        this.in_year = d.getFullYear();
        this.in_month = d.getMonth() + 1;
        this.in_day = d.getDate();
        this.out_day = this.startCurrentDate.getDate() + 1;
        this.out_month = this.startCurrentDate.getMonth() + 1;
        this.out_year = this.startCurrentDate.getFullYear();
        this.endMinDate.setDate(this.startCurrentDate.getDate() + 1);
        this.show = false;
        console.log(this.endMaxDate);
      },
      confirm_end (d) {
        this.enddataTime = this.formatDate(d);
        this.out_year = d.getFullYear();
        this.out_month = d.getMonth() + 1;
        this.out_day = d.getDate();
        this.show = false;
        console.log(this.endCurrentDate.getTime()); // 打印出了时间
        this.days =
          this.endCurrentDate.getTime() - this.startCurrentDate.getTime();
        this.days = Math.ceil(this.days / (1000 * 60 * 60 * 24));
        this.day = this.days
        if (this.days < 0) {
          this.out_day = this.startCurrentDate.getDate() + 1;
          this.out_month = this.startCurrentDate.getMonth() + 1;
          this.out_year = this.startCurrentDate.getFullYear();
          this.days = 1
          this.$dialog.alert({
            message: "臭不要脸的瞎点"
          });
        }
      },
      // 添加 住客
      onAdd () {
        this.$router.push({ path: "/people" });

      },
      // 到店时间
      onChange (value) {
        this.$toast("当前值：" + value);
      },
      // 提交订单
      onSubmit () {
        console.log("成功");
      },
      onEdit (item, i) {
        Dialog.confirm({
          title: "消息",
          message: "确认是否删除"
        })
          .then(() => {
            this.save_list.splice(i, 1);
          })
          .catch(() => {
            // on cancel
          });
      },
      pay () {
        let url = "pay"
        var order_id = this.order_id
        var obj = { order_id: order_id }
        this.axios.post(url, obj).then(res => {
          console.log(res)
          console.log("成功")
          if (this.save_list.length == 0) {
            this.$dialog.alert({
              message: "请添加入住人"
            });
          } else {
            Dialog.confirm({
              title: "消息",
              message: "是否支付订单"
            })
              .then(() => {
                if (this.active == 0) {
                  this.active++;
                  this.order = "订单已支付";
                  this.$router.push({ path: "/Detail",query:{id:this.id}})
                } else {
                  this.$dialog.alert({
                    message: "您已支付订单，请勿重复提交"
                  });
                }
              })
              .catch(() => {
                // on cancel
              });
          }
        })

      }
    },
    computed: {
      ...mapState(["save_list", "room_obj", "day", "detail_lists", "price", "room", "detail_img_lists", "order","id"]),
      day: {
        get: function () {
          return this.$store.state.day;
        },
        set: function (day) {
          return (this.$store.state.day = day);
        }
      },
      order: {
        get: function () {
          return this.$store.state.order;
        },
        set: function (order) {
          return (this.$store.state.order = order);
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
<style scoped>
  .pay_box {

  }

  .pay_box_out {
    width: 100%;
    padding: 0px 10px;

    box-sizing: border-box;
  }

  .pay_box_in {
    width: 100%;
    height: 100%;
  }

  /* 订单头 */
  .pay_header {
    width: 100%;
    height: 40px;
    background-color: rgb(252, 245, 245, 0.9);
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 666;
    border-bottom: 1px solid #ccc;
  }

  .pay_header_return {
    width: 30px;
    height: 30px;
  }

  /* 预定 */
  .pay_header_reserve {
    height: 30px;

    align-self: center;
    color: #555;
    font-size: 16px;
    line-height: 30px;
  }

  .pay_header_reserve_empty {
    width: 30px;
    height: 30px;
  }

  .pay_header_height {
    width: 100%;
    height: 40px;
  }

  /* 房间内容 */
  .pay_body_top {
    width: 100%;
    height: 120px;

    display: flex;
  }

  /*  房间 图片 */
  .pay_body_top_left {
    width: 40%;
    height: 100%;
  }

  .pay_body_top_left img {
    width: 100%;
    height: 100%;
  }

  /* 房间信息 */
  .pay_body_top_right {
    width: 60%;
    height: 100%;

    padding: 0px 10px;
    box-sizing: border-box;
  }

  .pay_body_top_right_title {
    width: 100%;
    height: 56%;

    color: #000;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: flex-end;
  }

  .pay_body_top_right_content {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
  }

  .pay_body_top_right_content div:nth-child(1) {
    width: 100%;
    height: 33.3%;
    color: #333;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .pay_body_top_right_content div:nth-child(2) {
    width: 100%;
    height: 33.3%;
    color: #999;
    font-size: 10px;
    display: flex;
    align-items: center;
  }

  .pay_body_top_right_content div:nth-child(3) {
    width: 100%;
    height: 33.3%;

    font-size: 15px;
    display: flex;
    align-items: center;
  }

  /* 入住 离店 时间 */
  .pay_body_center {
    width: 100%;
    height: 120px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }

  /* 组件样式 */
  .pay_body_center .time_select {
    padding: 0;
    width: auto;
    background-color: none;
  }

  .van-cell__right-icon {
    display: none;
  }

  /* 入住时间 */
  .pay_body_center_inTime {
    width: 92px;
    height: 90px;

    border-radius: 5px;
  }

  .time_content_1 {
    width: 100%;
    height: 45%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border: 1px solid #666;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .time_content_2 {
    width: 100%;
    height: 35%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 500;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    color: #006c70;
  }

  .time_content_3 {
    width: 100%;
    height: 20%;

    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #006c70;
    font-size: 10px;
  }

  .pay_body_center_sumTime {
    width: 90px;
    height: 90px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pay_body_center_sumTime div:nth-child(1) {
    width: 15px;
    height: 1px;
    background-color: #ccc;
  }

  .pay_body_center_sumTime div:nth-child(2) {
    width: 50px;
    height: 20px;

    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 13px;
    color: #006c70;
  }

  .pay_body_center_sumTime div:nth-child(3) {
    width: 15px;
    height: 1px;
    background-color: #ccc;
  }

  .pay_body_center_outTime {
    width: 92px;
    height: 90px;

    border-radius: 5px;
  }

  /* 添加 旅客 */
  .pay_body_bottom {
    width: 100%;
  }

  .pay_body_bottom_title {
    width: 100%;
    height: 26px;

    font-size: 16px;
    color: #333;
    font-weight: 600;
  }

  .van-address-list {
    padding-bottom: 0px;
  }

  .van-address-list__add {
    display: none;
  }

  /* 入住人列表 */
  .pay_body_bottom_content_list {
    width: 50px;
    height: 50px;
    background-color: #fff;
  }

  .pay_body_bottom_content {
    width: 100%;
    height: 100px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pay_body_bottom_img {
    width: 50px;
    height: 50px;
  }

  .pay_body_bottom_add {
    width: 100px;
    height: 30px;

    font-size: 16px;
    font-weight: 600;
    color: #ffc977;
    text-align: center;
    line-height: 30px;
  }

  .van-icon-edit:before {
    content: "\F04D";
  }

  .van-address-item {
    border-radius: 10px;
    margin: 4px 0;
    border: 2px solid #006c70;
  }

  /* 到店时间 */
  .pay_footer_top {
    width: 100%;
    height: 80px;
    border-top: 1px solid #ccc;
  }

  .pay_footer_top_title {
    width: 100%;
    height: 26px;

    font-size: 16px;
    color: #333;
    font-weight: 600;
  }

  .pay_footer_top_content {
    width: 100%;
    height: 64px;
    line-height: 64px;
  }

  /* 组件样式 */
  .pay_footer_top_time {
    margin-top: 25px;
  }

  .custom-button {
    width: 10px;
    height: 20px;
    background-color: rgb(237, 241, 217);
    border-radius: 5px;
  }

  .custom_box {
    width: 40px;
    height: 12px;

    position: absolute;
    top: 24px;
    left: -15px;
    text-align: center;
    line-height: 12px;
    color: #000;
  }

  /* 订单状态 */
  .pay_footer_center {
    width: 100%;
    height: 80px;

    margin-top: 40px;
  }

  /* 支付页面 */

  .pay_footer_footer {
    width: 100%;
    height: 50px;
    background-color: #006c70;
    position: relative;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    box-sizing: border-box;
    z-index: 666;
  }

  .pay_footer_footer_left {
    width: 20%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
    font-weight: 700;
  }

  .pay_footer_footer_right {
    width: 30%;
    height: 100%;
    background-color: #0b3c3e;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #fff;
    border-radius: 10px;
  }
</style>

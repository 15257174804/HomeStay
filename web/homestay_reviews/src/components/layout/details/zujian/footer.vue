<template>
  <div>
    <div class="footer_box">
      <div class="footer_box_in">
        <div class="footer_left">
          <!-- <div class="chat_img">
            <img :src="'聊天白.png'|imgLoad()" alt>
          </div>
          <div class="chat">聊天</div> -->
        </div>
        <div class="footer_center">
          <div class="footer_big_price">￥{{(detail_lists.current_price*day).toFixed(2)}}</div>
          <div class="footer_small_price">
            <div>￥{{detail_lists.origin_price}}</div>
            <div>共{{day}}晚</div>
          </div>
        </div>

        <div class="footer_right" @click="subscribe">
          立即预约
          <img :src="'下右箭头.png'|imgLoad()" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import Vue from "vue";
  import { Dialog } from "vant";

  export default {
    name: "Footer",
    data () {
      return {
        order_list: [],
       
        start_date: "2020-5-10",
        end_date: "2020-6-10"
      };
    },

    methods: {
      subscribe () {
        this.axios.get("users/detail").then(res => {
          // console.log(res)
          if (res.data == "2") {
            this.$toast("请登录");
            Dialog.confirm({
              title: "消息",
              message: "您还未登录，下单前请登录"
            })
              .then(() => {
                this.$router.push("/login");

              })
              .catch(() => {
                // on cancel
              });
          } else {
            this.uname = res.data.name;
            if (false) {
              this.$dialog.alert({
                message: "请选择房间"
              });
            } else {
              let url = "/order";
              var room_id = this.id;
              var start_date = this.start_date;
              var end_date = this.end_date;
              var obj = {
                room_id: room_id,
                start_date: start_date,
                end_date: end_date
              };
              this.axios.post(url, obj).then(res => {
                this.$router.push({ path: "/pay" });
                // console.log(res);
              });
            }
          }
        });
      }
    },
    computed: {
      ...mapState(["day", "detail_lists", "price", "room", "room_obj","id"]),
      room_obj: {
        get: function () {
          return this.$store.state.room_obj;
        },
        set: function (room_obj) {
          return (this.$store.state.room_obj = room_obj);
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
  .footer_box {
    width: 100%;
    height: 45px;
    background-color: #8f9696;
    position: fixed;
    bottom: 0px;
    padding: 5px 15px;
    z-index: 300;
  }

  .footer_box_in {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: space-between;
  }

  /* 左边 */
  .footer_left {
    width: 40px;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
  }

  .chat_img {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat_img img {
    width: 15px;
  }

  .chat {
    height: 15px;
    line-height: 15px;
    font-size: 10px;
    color: #fff;
  }

  /* 中间 */
  .footer_center {
    width: 100px;
    height: 100%;

    display: flex;
  }

  .footer_big_price {
    width: 100%;
    height: 100%;
    font-weight: 700;
    font-size: 18px;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }

  .footer_small_price {
    width: 40%;
    height: 100%;
  }

  .footer_small_price div:nth-child(1) {
    width: 100%;
    height: 50%;

    text-decoration: line-through;
    color: #000;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .footer_small_price div:nth-child(2) {
    width: 100%;
    height: 50%;

    color: #000;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  /* 右边 */
  .footer_right {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    color: #fff;
  }
</style>

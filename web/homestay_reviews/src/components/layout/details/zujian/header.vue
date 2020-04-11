<template>
  <div>
    <div class="header_box" :class="{header_box_right:right}">
      <div class="header_box_in">
        <div class="header_return" @click="header_return">
          <img :src="back_img" alt>
        </div>
        <div class="header_share" :class="{header_share_right:right}">
          <img :src="share_img" alt>
        </div>
        <div class="header_collect" :class="{header_collect_right:right}" @click="heart">
          <img :src="heart_img" alt>
        </div>
        <div class="header_vertical" :class="{header_vertical_right:right}">
          <img :src="vertical_img" alt>
        </div>
        <div class="header_content_1" :class="{header_content_1_right:right}">{{containt_1}}</div>
        <div class="header_content_2" :class="{header_content_2_right:right}">{{containt_2}}</div>
        <div class="header_content_3" :class="{header_content_3_right:right}">{{containt_3}}</div>
      </div>
    </div>
    <div class="d1"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
import { mapState } from "vuex";
Vue.use(Toast);
export default {
  name: "Header",
  data() {
    return {
      containt_1: "照片",
      containt_2: "房位",
      containt_3: "描述",
      heart_click: false,
      right: false,
      back_img: require("../../../../../static/images/左箭头白.png"),
      share_img: require("../../../../../static/images/分享白.png"),
      heart_img: require("../../../../../static/images/心白.png"),
      vertical_img: require("../../../../../static/images/竖线.png")
      // 数据库数据
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (scrollTop > 180) {
        this.right = true;
        this.back_img = require("../../../../../static/images/左箭头黑.png");
        this.share_img = require("../../../../../static/images/分享黑.png");
        if (
          this.heart_img !== require("../../../../../static/images/心红.png")
        ) {
          this.heart_img = require("../../../../../static/images/心黑.png");
        } else {
          this.heart_img !== require("../../../../../static/images/心红.png");
        }
      } else {
        this.right = false;
        this.back_img = require("../../../../../static/images/左箭头白.png");
        this.share_img = require("../../../../../static/images/分享白.png");
        if (
          this.heart_img !== require("../../../../../static/images/心红.png")
        ) {
          this.heart_img = require("../../../../../static/images/心白.png");
        } else {
          this.heart_img !== require("../../../../../static/images/心红.png");
        }
      }
      if (scrollTop >= 180 && scrollTop < 430) {
        this.containt_1 = "照片";
        this.containt_2 = "房位";
        this.containt_3 = "描述";
      } else if (scrollTop >= 430 && scrollTop < 550) {
        this.containt_1 = "房位";
        this.containt_2 = "描述";
        this.containt_3 = "点评";
      } else if (scrollTop >= 550 && scrollTop < 1037) {
        this.containt_1 = "描述";
        this.containt_2 = "点评";
        this.containt_3 = "设施";
      } else if (scrollTop >= 1037 && scrollTop < 1474.6) {
        this.containt_1 = "点评";
        this.containt_2 = "设施";
        this.containt_3 = "退订";
      } else if (scrollTop >= 1474.6) {
        this.containt_1 = "设施";
        this.containt_2 = "退订";
        this.containt_3 = "推荐";
      }
    },
    heart() {
      let url = "add_favorite";
      var room_id = this.id;
      var obj = { room_id: room_id };
      this.axios.post(url, obj).then(res => {
        // console.log(res)
        console.log("成功");
        if (this.heart_click == false) {
          this.heart_img = require("../../../../../static/images/心红.png");
          Toast("您已成功收藏");
          this.heart_click = true;
        } else {
          this.heart_img = require("../../../../../static/images/心白.png");
          Toast("您已取消收藏");
          this.heart_click = false;
        }
      });
    },
    header_return() {
      if (this.$store.state.path) {
        this.$router.push(this.$store.state.path);
      } else {
        this.$router.push("/home");
      }
      // 返回跳转
      // window.history.back();
      // this.$store.commit('changeAllsearchParam')
      // this.$router.push({ path: "/home" });
    }
  },
  computed: {
    ...mapState(["id"]),
    room_obj: {
      get: function() {
        return this.$store.state.room_obj;
      },
      set: function(room_obj) {
        return (this.$store.state.room_obj = room_obj);
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
.header_box {
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  position: fixed;
  top: 0px;
  z-index: 999;
  border: none;
  transition: all 0.3s;
}
.header_box_right {
  border-bottom: 1px solid #ccc;
  background-color: rgb(255, 255, 255, 0.9);
}
.header_box_in {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
/* 返回 */
.header_return {
  width: 20px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
/* 分享 */
.header_share {
  width: 40px;
  height: 100%;

  transition: all 0.3s;
  transform: translateX(600%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_share_right {
  transform: translateX(0px);
}
.header_share img {
  width: 20px;
}
/* 收藏 */
.header_collect {
  width: 40px;
  height: 100%;

  transition: all 0.3s;
  transform: translateX(600%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_collect_right {
  transform: translateX(0px);
}
.header_collect img {
  width: 20px;
}
/* 竖线 */
.header_vertical {
  width: 40px;
  height: 100%;

  transition: all 0.4s;
  transform: translateX(700px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_vertical_right {
  transform: translateX(0px);
}
/* 内容 1 */
.header_content_1 {
  width: 60px;
  height: 100%;
  color: #999;
  transition: all 0.5s;
  transform: translateX(500px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_content_1_right {
  transform: translateX(0px);
}
/* 内容 2 */
.header_content_2 {
  width: 60px;
  height: 100%;
  color: #000;
  transition: all 0.5s;
  transform: translateX(300px);
  border-bottom: 2px solid #006c70;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_content_2_right {
  transform: translateX(0px);
}
/* 内容 3 */
.header_content_3 {
  width: 60px;
  height: 100%;
  color: #999;
  transition: all 0.5s;
  transform: translateX(200px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_content_3_right {
  transform: translateX(0px);
}
</style>

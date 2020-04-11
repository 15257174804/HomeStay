<template>
  <div class="Hsearch">
    <div class="box" :class="show==true?'':'pop'">
      <div class="Search" v-show="show">
        <img :src="'pig.png'|imgLoad()"/>
        <div class="location" @click="showPopup">
          <div>{{ $store.state.district|| "城区"}}-{{ scenicName || "景点"}}</div>
          <div>{{ date || "请输入具体日期" }}</div>
        </div>
        <div class="search">
          <div @click="goSearch">搜索</div>
        </div>
      </div>
      <div v-show="!show" class="top">
        <div>
          <div class="city line">
            <img :src="'city.png'|imgLoad()"/>
            <div class="text">
              <district></district>
            </div>
            <span><img class="nearImg" :src="'near.png'|imgLoad()"/>我的附近</span>
          </div>
          <div class="road line">
            <img :src="'road.png'|imgLoad()"/>
            <div class="text" @click="goScenic">
              {{ scenicName || "请选择景点"}}
            </div>
          </div>
          <div class="date line">
            <img :src="'date.png'|imgLoad()"/>
            <span class="text" @click="goDate">
              {{ date || "请输入具体日期" }}
            </span>
            <span>共{{ night }}晚</span>
          </div>
          <div class="button">
            <div class="btn clear" @click="clearData">清除</div>
            <div class="btn search" @click="goSearch">搜索</div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!show" class="Popup">
      <div class="bottom">
        <van-icon @click="showSearch" name="close"/>
      </div>
    </div>
  </div>
</template>

<script>
import District from '../home/District.vue'
import { Toast } from 'vant'

export default {
  name: 'Hsearch',
  data () {
    return {
      scenicName: "",
      night: "",
      show: true,
      date: ""
    }
  },
  components: {
    District,
  },
  methods: {
    showPopup () {
      this.show = false
      this.init()
    },
    showSearch () {
      this.show = true
    },
    goDate () {
      this.$router.push({ path: "/Date" })
    },
    goScenic () {
      this.$router.push({ path: "/Scenic" })
    },
    init () {
      if (this.$store.state.startDate && this.$store.state.endDate) {
        this.date = this.$store.state.startDate + "至" + this.$store.state.endDate
      } else {
        this.date = ''
      }
      this.night = this.$store.state.night
      this.scenicName = this.$store.state.scenic.text
    },
    clearData(){
      this.$store.commit('changeAllsearchParam')
      this.init()
    },
    goSearch () {
      this.$emit('search')
      this.show = true
    }
  },
  mounted () {
    if (this.$route.query.status == "search") {
      this.show = false
    }
    this.init()
  }

}
</script>

<style lang="scss" scoped>
  .Hsearch {
    width: 100vw;
    display: flex;
    justify-content: center;
    z-index: 2;
    position: fixed;

    .box {
      position: relative;
      z-index: 3;
      transition: all .3s ease-in-out;
      background: #fff;
      width: 100vw;

      &.pop {
        border-radius: 10px;
        width: 350px;
        height: 240px;
        margin-top: 30px;

        .road {
          justify-content: flex-start !important;
        }

        .button {
          display: flex;
          justify-content: space-around;
          height: 25%;
          align-items: center;
          padding: 15px;

          .btn {
            width: 40%;
            height: 30px;
            border-radius: 20px;
            font-size: 14px;
            text-align: center;
            line-height: 30px;

            &.clear {
              border: 1px solid #006c70;
              background-color: #fff;
              color: #006c70;
            }

            &.search {
              background-color: #006c70;
              color: #fff;
            }
          }
        }
      }

      .Search {
        width: 100%;
        height: 60px;
        box-shadow: 0 0 10px #9E9E9E;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          display: inline-block;
          margin: 10px;
          width: 35px;
        }

        .location {
          width: 270px;
          height: 60px;

          div {
            width: 95%;
            height: 27px;
            text-align: left;
            color: #333;
            font-size: 14px;
            line-height: 27px;
            border-bottom: 1px solid #e6e6e6;
            padding-left: 5px;
            margin-right: 10px;
          }

          div:last-child {
            color: #7d7e80;
            font-size: 12px;
          }
        }

        .search {
          width: 70px;
          height: 60px;
          margin-right: 10px;

          div {
            width: 100%;
            height: 30px;
            border-radius: 20px;
            background-color: #006c70;
            color: #fff;
            font-size: 14px;
            text-align: center;
            line-height: 30px;
            margin-top: 15px;
          }
        }
      }

      .top {

        & > div {
          width: 350px;
          height: 240px;

          /*padding: 5px;*/

          .line {
            width: 86%;
            height: 25%;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 25px;

            img {
              width: 26px;
              display: inline-block;
              margin-right: 5px;
            }

            span:last-child {
              width: 30%;
              margin-right: 10px;
              text-align: right;

              .nearImg {
                width: 15px;
                vertical-align: middle;
              }
            }

            .text {
              width: 60%;
              margin-left: 10px;
            }
          }
        }
      }
    }

    .Popup {
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.71);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: fixed;
      top: 0;
      z-index: 2;

      .bottom {
        width: 100%;
        height: 20%;
        position: relative;
        top: 600px;

        .van-icon {
          width: 50px;
          height: 50px;
          display: block !important;
          margin: 0 auto;

          &::before {
            font-size: 30px;
            margin: 10px;
          }
        }
      }
    }
  }
</style>
<style>
  .wh_content_all {
    background-color: #fff !important;
  }

  .wh_content_item {
    color: #000 !important;
  }
</style>

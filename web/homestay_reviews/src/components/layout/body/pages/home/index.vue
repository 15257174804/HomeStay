<template>
  <div class="index">

    <div class="behind">
      <div class="swiper">
        <van-swipe :autoplay="5000" :loop="false" indicator-color="#fff">
          <van-swipe-item v-for="(image, index) in SwiperImg" :key="index" @click="goDetail(index)">
            <img :src="image">
          </van-swipe-item>
        </van-swipe>
      </div>
      <van-tabs animated>
        <van-tab title="景区住宿">
          <div class="slide">
            <div>
              <img src="static/img/27.jpg" @click="goDetail(2)">
              <img src="static/img/34.jpg" @click="goDetail(3)">
              <img src="static/img/31.jpg" @click="goDetail(4)">
              <img src="static/img/33.jpg" @click="goDetail(5)">
            </div>
          </div>
        </van-tab>
        <van-tab title="周边度假">
          <div class="slide">
            <div>
              <img src="static/img/29.jpg" @click="goDetail(6)">
              <img src="static/img/32.jpg" @click="goDetail(7)">
              <img src="static/img/23.jpg" @click="goDetail(8)">
              <img src="static/img/19.jpg" @click="goDetail(9)">
            </div>
          </div>
        </van-tab>
        <van-tab title="家庭出游">
          <div class="slide">
            <div>
              <img src="static/img/21.jpg" @click="goDetail(10)">
              <img src="static/img/25.jpg" @click="goDetail(11)">
              <img src="static/img/10.jpg" @click="goDetail(12)">
              <img src="static/img/14.jpg" @click="goDetail(13)">
            </div>
          </div>
        </van-tab>
        <van-tab title="超值特惠">
          <div class="slide">
            <div>
              <img src="static/img/18.jpg" @click="goDetail(14)">
              <img src="static/img/12.jpg" @click="goDetail(15)">
              <img src="static/img/7.jpg" @click="goDetail(16)">
              <img src="static/img/13.jpg" @click="goDetail(17)">
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="Lstory">
        <div class="title">
          <div>房东故事</div>
          <div @click="goStory">更多故事>>></div>
        </div>
        <div class="storys">
          <div class="img1" @click="goDiary(1)">
            <img src="static/img/8.jpg">
            <div>
              <span class="line1">如若那天</span>
              <span class="line2">我没有遇见你</span>
              <span class="line3">IF I HAVEN'T MET YOU THAT DAY</span>
            </div>
          </div>
          <div class="right_img">
            <div class="img2" @click="goDiary(2)">
              <img src="static/img/2.jpg"></div>
            <div class="img3" @click="goDiary(3)">
              <img src="static/img/20.jpg"></div>
          </div>
        </div>
      </div>
      <div class="Lstory">
        <div class="title">
          <div>旅途日记</div>
          <div @click="goStory">更多日记>>></div>
        </div>
        <div class="storys">
          <div class="img1" @click="goDiary(4)">
            <img src="static/img/9.jpg"/>
            <div>
              <span class="line1">小众攻略</span>
              <span class="line2">带你玩转不一样的杭州</span>
              <span class="line3">吃住游一网打尽</span>
            </div>
          </div>
          <div class="right_img">
            <div class="img2" @click="goDiary(5)">
              <img src="static/img/3.jpg"></div>
            <div class="img3" @click="goDiary(6)">
              <img src="static/img/22.jpg"></div>
          </div>
        </div>
      </div>
      <div class="rules">
        <div class="share">
          <p>让分享和信赖悄然发生</p>
          <span>完善的安全机制和信用机制，帮助房东和房客</span>
        </div>
        <div class="help">
          <div class="id">
            <van-icon name="manager" color="rgba(51, 171, 160, 0.7)" size="40"/>
            <span>双方身份验证</span>
          </div>
          <div class="deal">
            <van-icon name="gold-coin" color="rgba(51, 171, 160, 0.7)" size="40"/>
            <span>安全线上交易</span>
          </div>
          <div class="ensure">
            <van-icon name="diamond" color="rgba(51, 171, 160, 0.7)" size="40"/>
            <span>坚实保障后盾</span>
          </div>
          <div class="comment">
            <van-icon name="smile-comment" color="rgba(51, 171, 160, 0.7)" size="40"/>
            <span>点评积累信用</span>
          </div>
        </div>
      </div>
      <div class="protocol" @click="goProtocol">
        <div>网站协议</div>
        <div>查看详情>>></div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'index',
    data () {
      return {
        SwiperImg: [
          "https://image.xiaozhustatic1.com/00,1600,700/s,3,7Vw2,1600,700,2,ebfd9b64.jpg",
          "https://image.xiaozhustatic1.com/00,1600,700/s,3,7Vwj,1600,700,2,de0f565b.jpg",
          "https://image.xiaozhustatic1.com/00,1600,700/s,3,7Vws,1600,700,2,6a9e4fb6.jpg",
          "https://image.xiaozhustatic3.com/00,1600,700/s,3,7Vvm,1600,700,2,c5acc686.jpg",
          "https://image.xiaozhustatic3.com/00,1600,700/s,3,7Vv2,1600,700,2,729d067c.jpg"
        ]
      }
    },
    methods: {
      goDetail(id){
        // console.log(id);
        // this.$router.push({
        //   path: `/detail`,
        //   query: {id}
        // })
        this.$store.commit('changePath', "/home")
        console.log(id)
        this.$router.push("/detail?id="+id)
      },
      goProtocol () {
        this.$router.push({ path: "/Protocol" })
      },
      goDiary (img) {
        this.$router.push({ path: `/Diary/${img}` })
      },
      goStory () {
        this.$router.push({ path: "/Story" })
      },

    }
  }
</script>

<style lang="scss" scoped>
  .swiper {
    width: 100%;
    height: 300px;
    margin-bottom: 12px;

    .van-swipe {
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: #fff;
    }
  }

  .van-tab__pane-wrapper {
    .van-tab__pane {
      .slide {
        overflow-x: scroll;
        padding: 10px;
        display: flex;

        div {
          flex-grow: 1;
          display: flex;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: center;

          img {
            width: 180px;
            height: 230px;
            display: inline-block;
            border-radius: 10px;
            margin: 2px 5px;
            box-shadow: 3px 3px 5px #9E9E9E;

            &:last-child {
              margin-right: 25px;
            }
          }
        }
      }
    }
  }

  .Lstory {
    width: 100vw;
    height: 230px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .title {
      width: 100vw;
      height: 30px;
      margin: 15px 25px 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div:first-child {
        width: 50%;
        height: 30px;
        font-weight: bold;
        color: #006c70;
        font-size: 18px;
      }

      div:last-child {
        width: 50%;
        height: 30px;
        text-align: right;
        color: #7d7e80;
        font-size: 14px;
      }
    }

    .storys {
      width: 100vw;
      height: 180px;
      margin: 0 25px 150px;
      display: flex;

      .img1 {
        width: 60%;
        height: 180px;
        margin-right: 10px;
        border-radius: 10px;
        box-shadow: 3px 3px 5px #9E9E9E;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }

        div {
          position: absolute;
          top: 110px;
          left: 15px;

          span {
            color: #fff;
            font-family: "FZShenYMXSJW";
            display: block;
          }

          .line1, .line2 {
            font-size: 15px;
          }

          .line3 {
            font-size: 12px;
          }
        }
      }

      .right_img {
        width: 40%;
        height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .img2, .img3 {
          width: 100%;
          height: 48%;
          border-radius: 10px;
          box-shadow: 3px 3px 5px #9E9E9E;

          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
      }
    }
  }

  .rules {
    width: 100vw;
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 30px;
    text-align: center;

    .share {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
      vertical-align: center;
      color: #006c70;

      p {
        font-size: 18px;
        margin: 0;
        font-weight: bold;
      }

      span {
        font-size: 12px;
        color: #7d7e80;
      }
    }

    .help {
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 25px 100px;

      div {
        width: 25%;
        height: 100%;
        margin: 0 3px;

        span {
          color: #7d7e80;
          font-size: 12px;
          display: block;
          margin-top: 10px;
        }
      }
    }
  }

  .protocol {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 25px 50px;
    padding: 10px 0;
    border-top: 1px solid #bcbcbc;
    color: #006c70;
    font-size: 14px;

    div:last-child {
      color: #7d7e80;
      font-size: 12px;
    }
  }
</style>
<style>
  .van-tab {
    font-size: 18px !important;
    font-weight: bold !important;
  }

  .van-tabs__line {
    background-color: #006c70 !important;
  }

  .van-tab--active {
    color: #006c70 !important;
  }

  .van-tab__pane {
    display: flex !important;
  }
</style>

<template>
  <div class="container">
    <!-- 设置 -->
    <div class="set">
      <div @click="set">
        <!-- <img src="../../../../../assets/lmd/设 置.png" alt="" > -->
        <van-icon name="setting-o"/>
      </div>
    </div>
    <!-- 个人信息 -->
    <div class="information">
      <!-- 个人资料 -->
      <div class="info_top">
        <div class="info_text">
          <div class="uname">亲爱的{{uname}}</div>
          <div class="change" @click="change">查看并编辑个人资料</div>
        </div>
        <div class="photo">
          <img :src="'头像.png'|imgLoad()" alt="">
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order">
      <div class="order_title">我的房源订单</div>
      <div class="order_all">
        <div @click="ordered">
          <van-icon size="25" name="completed"/>
          <br>
          <span>历史订单</span>
        </div>
        <div @click="ordering">
          <van-icon size="25" name="failure"/>
          <br>
          <span>待支付订单</span>
        </div>
      </div>
    </div>
    <!-- 我的收藏和购物车 -->
    <div class="like">
      <div class="like_title">我的心愿单</div>
      <div class="like_all">
        <!-- <div @click="shopCar">
          <van-icon size="25" name="shopping-cart-o"/>
          <br>
          <span>购物车</span>
        </div> -->
        <div @click="myLike">
          <van-icon size="25" name="star-o"/>
          <br>
          <span>我的收藏</span>
        </div>
      </div>
    </div>
    <!-- 关于我们 -->
    <div class="about">

    </div>
  </div>
</template>

<script>
  export default {
    created () {
      this.loadMore();
    },
    name: 'container',
    data () {
      return {
        uname: ""
      }
    },
    methods: {
      // 页面初始加载数据
      loadMore () {
        this.axios.get('users/detail')
          .then(res => {
            // console.log(res)
            if (res.data == "2") {
              this.$toast("请登录")
              this.$store.commit('changePath', "/my")
              this.$router.push("/login")
            } else {
              this.uname = res.data.name;
            }
          })
      },
      set () {
        // 功能：跳转到设置页面
        this.$router.push("/Set")
      },
      change () {
        // 功能：跳转到修改个人信息页面
        this.$router.push("/Info")
      },
      ordered () {
        // 功能：跳转到历史订单
        this.$router.push("/Myorder")
      },
      ordering () {
        // 功能：跳转到未完成订单
        this.$router.push("/Unorder")
      },
      // shopCar () {
      //   // 功能：跳转到购物车
      //   this.$router.push("/Shopcar")
      // },
      myLike () {
        // 功能：跳转到收藏夹
        this.$router.push("/Mylike")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 30px 30px 0;
  }

  .set {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 30px;
  }

  .set img {
    width: 20px;
    height: 20px;
  }

  .info_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0 45px;
    border-bottom: 1px solid #eee;
  }

  .info_text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .info_text .uname {
    font-size: 24px;
    color: #484848;
    font-weight: 700;
    padding: 2px;
  }

  .info_text .change {
    font-size: 14px;
    color: #006c70;
    padding: 2px;
  }

  .info_top .photo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    text-align: center;
  }

  // 订单信息
  .container .order {
    border-bottom: 1px solid #eee;
  }

  .container .order .order_title {
    font-size: 18px;
    color: #484848;
    font-weight: 550;
    padding: 20px 2px 15px;
  }

  .container .order .order_all {
    display: flex;
    align-items: center;
  }

  .container .order .order_all div {
    text-align: center;
    color: #484848;
    font-size: 12px;
    font-weight: 500;
    margin: 25px;
  }

  // 我的心愿单
  .container .like {
    border-bottom: 1px solid #eee;
  }

  .container .like .like_title {
    font-size: 18px;
    color: #484848;
    font-weight: 550;
    padding: 20px 2px 15px;
  }

  .container .like .like_all {
    display: flex;
    align-items: center;
  }

  .container .like .like_all div {
    text-align: center;
    color: #484848;
    font-size: 12px;
    font-weight: 500;
    margin: 25px;
  }

</style>

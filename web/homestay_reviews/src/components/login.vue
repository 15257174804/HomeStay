<template>
  <div class="containerlogin">
    <van-nav-bar
      title=""
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="loginbody">
      <div class="title"><span>账号密码登录</span></div>
      <div class="subtitle"><span>使用已注册的手机号登录</span></div>
      <van-cell-group>
        <van-field
          v-model="phone"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
          :error-message=phoneAlert
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :error-message=upwdAlert
        />
      </van-cell-group>
      <div class="loginbtn">
        <van-button @click="login" type="default">登录</van-button>
      </div>
      <div class="goto"><span @click="gotoreg">还没有账号？去注册</span></div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      phone: "",
      password: "",
      phoneAlert: "",
      upwdAlert: ""
    }
  },
  methods: {
    // 退出页面返回“我的”主页面
    onClickLeft () {
      this.$router.push("/home")
      // window.history.back();
    },
    login () {
      var phone = this.phone;
      var upwd = this.password;
      var reg = /^1(3[0-9]|4[5,7]|5[0-3,5-9]|6[2,5-7]|7[0,1-8]|8[0-9]|9[1,8-9])\d{8}$/;
      if (!reg.test(phone)) {
        this.phoneAlert = "手机号格式不正确"
        return
      }
      // 发送ajax请求
      var url = "users/login";
      var obj = { phone: phone, password: upwd };
      this.axios.post(url, obj)
      .then(res => {
        console.log(res);
        if (res.data == "2") {
          this.$toast("手机号或密码错误")
        } else {
          if(this.$store.state.path){
            this.$router.push(this.$store.state.path)
          }else{
              this.$router.push('/home')
            }
          }
      })
    },
    gotoreg () {
      this.$router.push("/register");
    }
  }
}
</script>
<style scoped>
  .loginbody {
    padding: 30px;
  }

  .containerlogin .title {
    font-size: 24px;
    color: #484848;
    font-weight: 700;
    padding: 15px 0 0 20px;
  }

  .containerlogin .subtitle {
    font-size: 14px;
    color: #7d7e80;
    padding: 10px 0 0 20px;
    margin-bottom: 30px;
  }

  .containerlogin .loginbtn {
    text-align: center;
  }

  .containerlogin .goto {
    font-size: 14px;
    color: #7d7e80;
    float: right;
    padding: 10px 10px 0 0;
  }
</style>



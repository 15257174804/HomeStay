<template>
  <div class="login">
    <return></return>
    <div class="regbody">
      <div class="header">
        用户注册
      </div>
      <div class="field-title">
        注册电话号码
      </div>
      <van-cell-group>
        <van-field
          v-model="phone"
          required
          clearable
          label="电话"
          right-icon="question-o"
          placeholder="电话号码"
          @click-right-icon="$toast('11位数字的电话号码')"
          :error-message=phoneAlert
        />
        <van-cell-group>
          <van-field
            v-model="registerCode"
            required
            center
            clearable
            label="验证码"
            placeholder="请输入验证码"
          >
            <van-button slot="button" size="small" type="primary" @click="getRegisterCode">获取验证码</van-button>
          </van-field>
        </van-cell-group>
      </van-cell-group>
      <div class="field-title2">
        设定用户名密码
      </div>
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户民"
          right-icon="question-o"
          placeholder="用户名"
          @click-right-icon="$toast('中文名或英文名')"
          :error-message=usernameAlert
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          right-icon="question-o"
          placeholder="请输入密码，包括英文字母和数字"
          @click-right-icon="$toast('包括英文字母和数字')"
          required
          :error-message=passwordAlert
        />
        <van-field
          v-model="reInputPassword"
          type="password"
          label="确认密码"
          placeholder="请重新输入密码"
          required
          :error-message=reInputPasswordAlert
        />
      </van-cell-group>
      <div class="submit">
        <van-button type="primary" @click="submit">注册</van-button>
        <div class="goto"><span @click="gotologin">已有账号，去登陆</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Return from './layout/body/pages/home/Return.vue'
export default {
  components:{
    Return
  },
  mounted() {
    // 设置底部元素的高度
    let windowHeight = document.documentElement.clientHeight;
    let bottomElement = document.querySelector('.login .submit');
    let realHeight = windowHeight - bottomElement.offsetTop;
    console.log(realHeight);
    if (realHeight > bottomElement.offsetHeight) {
      bottomElement.style.height = realHeight + 'px';
    }
  },
  name: 'login',
  data () {
    return {
      phone: '',
      registerCode: '',
      registerCodeReady: false,
      username: '',
      password: '',
      reInputPassword: '',
      phoneAlert: '',
      registerCodeAlert: '',
      usernameAlert: '',
      passwordAlert: '',
      reInputPasswordAlert: ''
    }
  },
  watch: {
    phone() {
      if (this.phoneAlert) {
        let reg = /^1(3[0-9]|4[5,7]|5[0-3,5-9]|6[2,5-7]|7[0,1-8]|8[0-9]|9[1,8-9])\d{8}$/;
        if (reg.test(this.phone)) {
          this.phoneAlert = '';
        }
      }
    },
    registerCode() {
      if (this.registerCodeAlert && this.registerCode) {
        this.registerCodeAlert = '';
      }
    },
    username() {
      if (this.usernameAlert) {
        let reg = /(^([a-zA-Z]+\s)*[a-zA-Z]+$)|(^[\u4e00-\u9fa5]{2,}$)/;
        if (reg.test(this.username)) {
          this.usernameAlert = '';
        }
      }
    },
    password() {
      if (this.passwordAlert) {
        let reg = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        if (reg.test(this.password)) {
          this.passwordAlert = '';
        }
      }
    },
    reInputPassword() {
      if (this.reInputPasswordAlert && this.reInputPasswordAlert !== '' && this.password === this.reInputPassword) {
        this.reInputPasswordAlert = '请输入正确的密码';
      }
    }
  },
  methods: {
    getRegisterCode() {
      // 这里写获取验证码的代码
      this.registerCodeReady = true;
    },
    submit() {
      let ready = true;
      // 验证电话
      let reg = /^1(3[0-9]|4[5,7]|5[0-3,5-9]|6[2,5-7]|7[0,1-8]|8[0-9]|9[1,8-9])\d{8}$/;
      if (!reg.test(this.phone)) {
        this.phoneAlert = '请输入有效的电话号码';
        ready = false;
      }
      if (this.registerCode === '') {
        this.registerCodeAlert = '请输入验证码';
        ready = false;
      }
      // 验证用户名
      reg = /(^([a-zA-Z]+\s)*[a-zA-Z]+$)|(^[\u4e00-\u9fa5]{2,}$)/;
      if (!reg.test(this.username)) {
        this.usernameAlert = '请输入有效的用户名，支持英文姓名和中文姓名';
        ready = false;
      }
      // 验证密码
      reg = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
      if (!reg.test(this.password)) {
        this.passwordAlert = '密码必须包括英文字母和数字';
        ready = false;
      }
      // 验证重复输入密码
      if (this.password !== this.reInputPassword || this.reInputPassword === '') {
        this.reInputPasswordAlert = '请输入正确的密码';
        ready = false;
      }
      if (ready) {
        // 发送到后端
        let url="users/register";
        let obj={
          id: null,
          phone: this.phone,
          password: this.password,
          name: this.username
        };
        this.axios.post(url,obj)
          .then(res=>{
            if(res.data==="2"){
              this.$toast("电话已被注册")
            }else if(res.data==="3"){
              this.$toast("注册失败")
            }else{
              this.$toast("注册成功");
              this.$router.push("/login")
            }
          })
      }
    },
    gotologin(){
        this.$router.push("/login");
    }
  }
}
</script>

<style lang="scss" scoped>
  .regbody{
    padding:0px 30px;
  }
  .login {
    color: #323233;
    padding:5px;
    .header{
      font-size: 24px;
      color:#484848;
      font-weight: 700;
      height: 56px;
      line-height: 56px;
      text-align: center;
    }
    .field-title{
      background: #f8f8f8;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #455a6499;
    }
    .field-title2{
      background: #f8f8f8;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #455a6499;
      margin-top:20px;
    }
    .submit{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 0;
      button{
        width: 100px;
        border-radius: 6px;
        font-size: 16px;
      }
    }
    .goto{
      font-size: 14px;
      color:#7d7e80;
      padding:10px 10px 0 0;
      align-self: flex-end;
      
    }
  }
</style>

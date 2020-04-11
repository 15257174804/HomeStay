<template>
  <div class="containerInfo">
    <van-nav-bar
      title="个人信息"
      left-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <!-- 头像 -->
    <div class="face">
      <div class="face_all">
        <div>
          <img :src="'头像.png'|imgLoad()" alt="">
        </div>
        <div @click="faceVisible=true">
          <img :src="'相机.png'|imgLoad()" alt="">
          <span>修改头像</span>
        </div>
      </div>
      <van-action-sheet
        v-model="faceVisible"
        :actions="actions"
        cancel-text="取消"
        :round="false"
        @select="onSelect"
        @cancel="onCancel"/>
    </div>
    <!-- 信息输入 -->
    <div class="content">
      <div class="uname">
        <div>姓名</div>
        <div class="inputtext">
          <van-cell-group>
            <van-field v-model="uname" :value="uname" placeholder="请输入姓名"/>
          </van-cell-group>
        </div>
      </div>
      <div class="sex">
        <div>性别</div>
        <van-field
          :value="sexvalue"
          placeholder="请输入性别"
          @click="showSex=true"
        />
        <van-popup v-model="showSex" position="bottom">
          <van-picker
            show-toolbar
            :columns="sexs"
            @cancel="showSex=false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <div class="phone">
        <div>常用手机号</div>
        <div class="inputtext">
          <van-cell-group>
            <van-field v-model="phone" :value="phone" placeholder="请输入手机号"/>
          </van-cell-group>
        </div>
      </div>
      <!-- 出生日期设置 -->
      <div class="birth">
        <div>出生日期</div>
        <van-field
          readonly="readonly"
          :value="birthvalue"
          placeholder="请输入出生日期"
          @click="showBirth=true"
        />
        <van-popup v-model="showBirth" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :formatter="formatter"
            :min-date="minDate"
            @cancel="showBirth=false"
            @confirm="onConfirmBirth"
          />
        </van-popup>
      </div>
      <!-- 紧急联系人 -->
    </div>
    <!-- 信息输入结束 -->
    <div class="downsave">
      <button @click="save">保存</button>
    </div>
  </div>
</template>
<script>
  export default {
    created () {   //组件加载成功后加载
      this.loadMore();   //加载数据
    },
    data () {
      return {
        list: [],  //用来保存服务器返回的结果
        // 点击修改头像
        faceVisible: false,
        actions: [
          { name: "拍照" },
          { name: "从相册中选择" }
        ],
        // 动态绑定图片路劲，src前记得加：
        // imgUrl:{
        //     avatar:"../../../../../assets/lmd/头像.png"
        // },

        uname: "",
        phone: "",
        // 性别选择
        sexvalue: "",
        showSex: false,  //控制底部弹框的显示隐藏
        sexs: ['男', '女', '保密'],
        // 选择出生日期
        birthvalue: "2019-12-21",
        showBirth: false,
        currentDate: new Date(),
        minDate: new Date(1919, 1, 1),
      }
    },
    methods: {
      // 加载数据
      loadMore () {
        // 发送ajax请求，获取用户信息
        this.axios.get('users/detail')
          .then(res => {
            // console.log(res.data)
            this.list = res.data;
            // console.log(this.list)
            this.uname = this.list.name;
            this.phone = this.list.phone;
            this.sexvalue = this.list.gender == 0 ? "女" : "男";
            this.birthvalue = this.list.birthday.split("T")[0]
          })
      },
      // 突出页面返回“我的”主页面
      onClickLeft () {
        window.history.back();
        // this.$router.push("/my")
      },
      //点击修改头像
      onCancel () {
        this.faceVisible = false;
      },
      onSelect () {

      },
      // 性别选择
      onConfirm (value) {
        this.sexvalue = value;
        this.showSex = false;
      },
      // 选择生日
      onConfirmBirth (value) {
        var date = value;
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (m >= 1 && m <= 9) {
          m = "0" + m;
        }
        if (d >= 0 && d <= 9) {
          d = "0" + d;
        }
        var timer = date.getFullYear() + "-" + m + "-" + d;
        this.birthvalue = timer;
        this.showBirth = false;
      },
      formatter (type, value) {
        if (type === "year") {
          return `${ value }年`;
        } else if (type === "month") {
          return `${ value }月`;
        }
        return value;
      },
      // 保存信息
      save () {
        var uname = this.uname;
        var phone = this.phone;
        var gender = this.sexvalue == "女" ? 0 : 1;
        var birthday = this.birthvalue;
        // console.log(birthday)
        // 发送ajax请求
        var url = "/users/change";
        var obj = { name: uname, phone: phone, gender: gender, birthday: birthday }
        this.axios.post(url, obj)
          .then(res => {
            if (res.data == "1") {
              this.$toast("保存成功");
              this.loadMore();
            } else {
              this.$toast("保存失败");
            }
          })

      }
    }
  }
</script>
<style lang="scss" scoped>
  .van-nav-bar .van-icon {
    color: #006c70;
  }

  /* 头像 */
  .face {
    margin-top: 46px;
    width: 100%;
    height: 150px;
    background: #006c70;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .face .face_all {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .face .face_all div:first-child {
    width: 66px;
    height: 66px;
    border: 3px solid #fff;
    border-radius: 50%;
    text-align: center;
  }

  .face .face_all div:first-child img {
    width: 60px;
    height: 60px;
  }

  .face .face_all div:last-child {
    display: flex;
    justify-content: center;
  }

  .face .face_all div:last-child img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  .face .face_all div:last-child span {
    color: #fff;
    font-size: 12px;
  }

  /*个人信息 */
  .content {
    padding: 20px;
  }

  .uname, .sex, .phone, .birth {
    margin-bottom: 15px;
  }

  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
    border-width: 0px 0 0px;
  }

  .inputtext {
    border-bottom: 1px solid #ebedf0;
  }

  // 输入框的内边距
  .van-cell {
    padding: 10px 16px 10px 0;
  }

  // 性别，出生日期的下边框
  .sex, .birth {
    border-bottom: 1px solid #ebedf0;
  }

  // 性别，出生日期的取消确定的字体颜色

  .downsave {
    position: fixed;
    bottom: 5px;
    width: 100%;
    text-align: center;
  }

  button {
    width: 95%;
    height: 40px;
    border: 1px solid #eee;
    background: #fff;
    text-align: center;
    line-height: 40px;
    color: #323233;
    padding: 0;
    border-radius: 5px;
  }
</style>

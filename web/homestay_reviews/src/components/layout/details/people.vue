<template>
  <div class="people_box_out">
    <div class="people_box">
      <div class="people_header">
        <div class="people_header_return">
          <router-link to="/pay">
            <img :src="'左箭头黑.png'|imgLoad()" alt />
          </router-link>
        </div>
        <div class="people_header_reserve">入住人信息</div>
        <div class="people_header_reserve_empty"></div>
      </div>
      <div class="people_box_in">
        <div class="people_info">入住人信息</div>
        <van-cell-group>
          <van-field
            v-model="user_name"
            required
            clearable
            label="姓名"
            
            right-icon="question-o"
            placeholder="请确保填写信息正确有效"
            :error-message="err_name"
            @click-right-icon="$toast('请输入您的真实姓名')"
          />

          <van-field
            v-model="user_id"
            label="身份证"
            placeholder="请确保填写信息正确有效"
            :error-message="err_id"
            required
          />
          <van-field
            v-model="user_phone"
            label="手机号"
            placeholder="请确保填写信息正确有效"
            required
            :error-message="err_phone"
          />
        </van-cell-group>
        <div class="people_save_box">
          <div class="people_save" @click="add">
            保存
            <!-- <router-link to="/pay">保存</router-link> -->
          </div>
        </div>
        <div class="people_footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      user_name: "",
      user_id: "",
      user_phone: "",
      err_name: "",
      err_id: "",
      err_phone: "",
      add_id: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      add_phone: /^1[3|4|5|8][0-9]\d{8}$/
    };
  },
  methods: {
    add() {
      // 姓名验证
      if (this.user_name == "") {
        this.err_name = "*姓名不能为空";
      } else {
        this.err_name = "";
      }
      // 身份证验证
      if (this.add_id.test(this.user_id)) {
        this.err_id = "*身份证信息正确";
      } else {
        this.$dialog.alert({
                    message: "身份证或手机格式错误"
                  });
      }
      // 手机号验证
      if (this.add_phone.test(this.user_phone)) {
        this.err_phone = "*手机号格式正确";
      } else {
         this.$dialog.alert({
                    message: "身份证或手机号格式错误"
                  });
      }
      if (
        this.user_name !== "" &&
        this.add_id.test(this.user_id) &&
        this.add_phone.test(this.user_phone)
      ) {
        this.pid += 1;
        var save_pid = this.pid;
        console.log(save_pid);
        this.$router.push({ path: "/pay",query:{id:this.id}});
        this.save_obj = {
          id: save_pid,
          name: this.user_name,
          tel: this.user_phone,
          address: this.user_id
        };

        this.save_list.push(this.save_obj);
        console.log(this.save_list);
      }
    }
  },
  watch: {
    // 身份证验证
    user_id: function() {
      if (this.add_id.test(this.user_id)) {
        this.err_id = "身份证信息正确";
      } 
    },

    // 手机号验证
    user_phone: function() {
      if (this.add_phone.test(this.user_phone)) {
        this.err_phone = "*手机号格式正确";
      }
    }
  },
  computed: {
    ...mapState(["save_obj", "save_list", "pid","id"]),

    save_obj: {
      get: function() {
        return this.$store.state.save_obj;
      },
      set: function(save_obj) {
        return (this.$store.state.save_obj = save_obj);
      }
    },
    pid: {
      get: function() {
        return this.$store.state.pid;
      },
      set: function(pid) {
        return (this.$store.state.pid = pid);
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
.people_box {

}
.people_box_in {
  width: 100%;
  height: 100%;
  padding: 0 10px;
}
/* 订单头 */
.people_header {
  width: 100%;
  height: 40px;
  background-color: rgb(252, 245, 245);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.people_header_return {
  width: 30px;
  height: 30px;
}
/* 预定 */
.people_header_reserve {
  height: 30px;

  align-self: center;
  color: #555;
  font-size: 16px;
  line-height: 30px;
}
.people_header_reserve_empty {
  width: 30px;
  height: 30px;
}
.people_info {
  width: 100%;
  height: 30px;

  line-height: 30px;
  font-size: 18px;
  margin: 15px 0px;
  color: #ff5f7b;
  border-radius: 5px;
}
/* 表单组件样式 */
.van-field__error-message {
  display: block;
  width: "100%";
  height: 30px;
}
.van-cell-group {
  box-shadow: 0px 0px 26px -1px #333;
  border-radius: 10px;
  overflow: hidden;
}
.van-field__error-message{
  color:gray;
}
/* 保存信息 */
.people_save_box {
  width: 100%;
  height: 200px;

  display: flex;
  align-items: center;
}
.people_save {
  width: 100%;
  height: 40px;
  background-image: linear-gradient(to right, #006c70, #0b3c3e);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
}
.people_footer {
  width: 100%;
  height: 1px;
  position: relative;
  bottom: 0;
}
</style>
<style lang="scss">
  .van-field__error-message{
    color:green !important;
  }
</style>

<template>
  <div>
    <div class="pay_body_center">
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
            <div>共{{day}}晚</div>
            <div></div>
          </div>
          <van-cell is-link @click="showPopup('endTime')" class="time_select">
            <div class="pay_body_center_outTime">
              <div class="time_content_1">离店时间</div>
              <div class="time_content_2">{{out_day}}</div>
              <div class="time_content_3">{{out_year}}年{{out_month}}月{{out_day}}日</div>
            </div>
          </van-cell>
        </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
var date = new Date();
export default {
  data(){
    return {
      order_id:1,
      
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
      out_day:date.getDate() + this.day,
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
  created() {
    // 结束默认时间 最大两年
    this.endCurrentDate.setDate(this.endCurrentDate.getFullYear() - 9);
    // 结束默认最小时间 开始默认时间+4
    this.endMinDate.setDate(this.startCurrentDate.getDate() + 1);
    // this.endMinDate.setMonth(this.startCurrentDate.getMonth() + 1);
    this.endMaxDate.setFullYear(this.endMaxDate.getFullYear() + 1);
    // 开始默认时间 最大两年
    this.startMaxDate.setFullYear(this.startMaxDate.getFullYear() + 1);
  },
   mounted(){
    this.days=this.day 
    this.out_day= date.getDate() + this.day
  },
  beforeUpdate(){
    this.out_day= date.getDate() + this.day
  },
  methods:{
     showPopup(picker) {
      if (this.show == false) {
        this.show = true;
        this.startOrEnd = picker;
      } else if (this.show == true) {
        this.show = false;
        this.startOrEnd = "";
      }
    },
    formatDate: function(d) {
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
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    confirm_start(d) {
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
    confirm_end(d) {
      this.enddataTime = this.formatDate(d);
      this.out_year = d.getFullYear();
      this.out_month = d.getMonth() + 1;
      this.out_day = d.getDate();
      this.show = false;
      console.log(this.endCurrentDate.getTime()); // 打印出了时间
      this.days =
        this.endCurrentDate.getTime() - this.startCurrentDate.getTime();
      this.days = Math.ceil(this.days / (1000 * 60 * 60 * 24));
      this.day=this.days
      if(this.days<0){
       this.out_day = this.startCurrentDate.getDate() + 1;
      this.out_month = this.startCurrentDate.getMonth() + 1;
      this.out_year = this.startCurrentDate.getFullYear();
      this.days=1
        this.$dialog.alert({
                message: "臭不要脸的瞎点"
              });
      }
    },
  },
  computed:{
     ...mapState(["save_list", "room_obj","day","detail_lists","price","room","detail_img_lists","order"]),
    day: {
      get: function() {
        return this.$store.state.day;
      },
      set: function(day) {
        return (this.$store.state.day = day);
      }
    }
  },
  watch:{
    
  }
}
</script>
<style scoped>
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
</style>
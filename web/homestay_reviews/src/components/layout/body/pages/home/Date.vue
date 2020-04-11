<template>
  <div class="Date">
    <return :title="title" class="title">
    </return>
    <div class="range">
      <div class="start">
        <span>入住时间</span>
        <span>{{ range.start||'请选择入住日期' }}</span>
      </div>
      <div class="night">
        <i>共{{ night>0?night:0 }}晚</i>
      </div>
      <div class="end">
        <span>离开时间</span>
        <span>{{ range.end|tipfilter }}</span>
      </div>
    </div>
    <v-range-selector
      :start-date.sync="range.start"
      :end-date.sync="range.end"
    />
    <div class="bottom">
      <van-button round type="info" @click="confirm"> 确 认</van-button>
    </div>
  </div>
</template>

<script>
  import Return from './Return.vue'
  import VRangeSelector from 'vuelendar/components/vl-range-selector'
  import VDaySelector from 'vuelendar/components/vl-day-selector'
  import 'vuelendar/scss/vuelendar.scss'

  export default {
    name: 'Date',
    components: {
      Return,
      VRangeSelector,
      VDaySelector
    },
    data () {
      return {
        title: "日期选择",
        night: "",
        range: {
          start: '',
          end: ''
        }
      }
    },
    filters: {
      tipfilter (val) {
//        console.log(val);
        if (!val) {
          return '请选择离开日期'
        } else {
          return val
        }
      }
    },
    watch: {
      range: {
        handler () {
          this.getNight()
        },
        deep: true
      }
    },
    methods: {
      getNight () {
        this.night = (new Date(this.range.end) - new Date(this.range.start)) / 1000 / 3600 / 24
      },
      confirm () {
        this.$router.push({
          path: `/search`
        })
        this.$store.commit('changeStartDate', this.range.start)
        this.$store.commit('changeEndDate', this.range.end)
        this.$store.commit('changeNight', this.night)
      }
    },
    mounted () {
      this.range.start = this.$store.state.startDate
      this.range.end = this.$store.state.endDate
      this.night = this.$store.state.night
    }
  }
</script>

<style lang="scss" scoped>
  .Date {
    width: 100%;
    height: 100%;
    .range {
      width: 300px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      margin: 10px auto;
      font-weight: bold;
      color: #006c70;
      span {
        width: 100%;
        display: inline-block;
        margin-bottom: 10px;
      }
      .start {
        width: 100px;
        height: 50px;
      }
      .night {
        width: 50px;
        height: 50px;
        line-height: 50px;
        i {
          width: 15px;
          height: 10px;
          border: 1px dashed #006c70;
          padding: 3px;
          font-style: normal;
        }
      }
      .end {
        width: 100px;
        height: 50px;
      }

    }
    .vl-calendar {
      margin: 0 25px;
      background-color: #fff;
      box-shadow: 0px -1px 5px #9E9E9E;
    }
    .bottom {
      text-align: right;
      margin-right: 50px;
    }
  }
</style>
<style>
  .vl-calendar-month__day.selected {
    background: #006c70 !important;
  }

  .vl-calendar-month__week-day {
    color: #006c70 !important;
  }

  .van-button--info {
    width: 90px !important;
    height: 50px !important;
    background-color: #006c70 !important;
    border: 1px solid #006c70 !important;
    margin: 20px 0 !important;
    font-size: 18px !important;
  }
</style>

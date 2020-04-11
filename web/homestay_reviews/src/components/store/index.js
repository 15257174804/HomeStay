import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    path:"",
    day: 1,
    order:"支付订单",
    detail_lists: [
      // { id:1,
      //   img: require("../../assets/yhl_img/1.jpg"),
      //   room: "南侧主卧",
      //   price: 1299
      // },
      // { id:2,
      //   img: require("../../assets/yhl_img/2.jpg"),
      //   room: "西侧主卧",
      //   price: 1100
      // },
      // { id:3,
      //   img: require("../../assets/yhl_img/3.jpg"),
      //   room: "北侧主卧",
      //   price: 1500
      // }
    ],
    detail_img_lists: [
      {
        id: 1,
        img: require("../../../static/images/yhl_img/1.jpg"),
        room: "南侧主卧"
      }, {
        id: 2,
        img: require("../../../static/images/yhl_img/2.jpg"),
        room: "西侧主卧"
      }, {
        id: 3,
        img: require("../../../static/images/yhl_img/3.jpg"),
        room: "北侧主卧"
      }
    ],
    save_obj: {},
    save_list: [{
      id: "1",
      name: "yhl",
      tel: "18757902953",
      address: "330182199710100717"
    },{
      id: 1,
      name: "弯弯",
      tel: "18757902953",
      address: "330182199710100717"
    }
    ],
    pid: 3,
    price: 0,
    room: "",
    room_obj: {},
    scenic: {},
    startDate: '',
    endDate: '',
    night: '',
    district: '',
    path:"",
    // 详情id
    id:"",
    // 图片列表
    imgList:[]
  },
  mutations: {
    changeDistrict(state, val) {
      state.district = val
    },
    changeScenic(state, val) {
      state.scenic = val
    },
    changeStartDate(state, val) {
      state.startDate = val
    },
    changeNight(state, val) {
      state.night = val
    },
    changeEndDate(state, val) {
      state.endDate = val
    },
    changeAllsearchParam(state, val) {
      state.district = ''
      state.scenic = ''
      state.startDate = ''
      state.endDate = ''
      state.night = ''
    },
    changePath(state, val){
      state.path=val
    }
  }
})
export default store;

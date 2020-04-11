<template>
  <div class="index">
    <div>
      <Carousel></Carousel>
      <Reserve></Reserve>
       <!-- <Pay_date></Pay_date> -->
      <!-- <div class="go_date" @click="selectDate">请选择入住时间</div> -->
      <Details></Details>
      <Evaluate></Evaluate>
      <Furniture></Furniture>
      <Fade></Fade>
      <Recommend></Recommend>
      <Header></Header>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Carousel from "./zujian/carousel.vue";
import Reserve from "./zujian/reserve.vue";
import Details from "./zujian/details.vue";
import Evaluate from "./zujian/evaluate.vue";
import Furniture from "./zujian/furniture.vue";
import Fade from "./zujian/fade.vue";
import Recommend from "./zujian/recommend.vue";
import Header from "./zujian/header.vue";
import Footer from "./zujian/footer.vue";
import Pay_date from "./zujian/pay_date.vue";

export default {
  components: {
    Carousel,
    Reserve,
    Details,
    Evaluate,
    Furniture,
    Fade,
    Recommend,
    Header,
    Footer,
    Pay_date
  },
  created() {
    this.id = this.$route.query.id;
    this.loadMore();
  },
  data() {
    return {
      title: "",
      current_price: "",
      origin_price: "",
      describe_detail: ""
    };
  },

  methods: {
    loadMore() {
      //  this.axios.get('detail')
      // .then(res=>{
      //   console.log(res)
      // })
      console.log(this.id);
      let url = "detail?id=" + this.id;

      this.axios.get(url, {}).then(res => {
        this.detail_lists = res.data;
        // this.id = this.detail_lists.id;
        // this.title = this.detail_lists.title;
        // this.current_price = this.detail_lists.current_price;
        // this.sight = this.detail_lists.sight;
        // this.origin_price = this.detail_lists.origin_price;
        // this.describe_detail = this.detail_lists.describe_detail;
        let newItem = {};

        this.imgList = [];
        newItem.img = JSON.parse(this.detail_lists.picture_big);
        newItem.img.map((value, index) => {
          this.imgList.push(value);
          console.log(value);
        });

        // console.log(this.$route.query.status)
      });
    },
    selectDate() {
      this.$router.push({ path: "/date" });
    }
  },
  computed: {
    ...mapState(["detail_lists", "id", "imgList"]),
    detail_lists: {
      get: function() {
        return this.$store.state.detail_lists;
      },
      set: function(detail_lists) {
        return (this.$store.state.detail_lists = detail_lists);
      }
    },
    id: {
      get: function() {
        return this.$store.state.id;
      },
      set: function(id) {
        return (this.$store.state.id = id);
      }
    },
    imgList: {
      get: function() {
        return this.$store.state.imgList;
      },
      set: function(imgList) {
        return (this.$store.state.imgList = imgList);
      }
    }
  }
};
</script>

<style scoped>
.go_date {
  margin-top: 10px;;
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  border: 1px solid #333;
  border-radius: 10px;
}
</style>

<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white" class="carousel" @change="onChange" :height="200">
      <van-swipe-item v-for="(img,i) in imgList" :key="i">
        <img :src="img |imgLoad()" alt>
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{imgList.length}}</div>
    </van-swipe>
    <div class="titleOrStar">
      <div class="title"><span>{{detail_lists.title}}</span>
      
      </div>

    </div>

  </div>
</template>
<script>
  import { mapState } from "vuex";

  export default {
    name: "Carousel",
    data () {
      return {
        value: 5,
        current: 0,
        images: [
          { img: 'yhl_img/1.jpg', position: "主卧" },
          { img: 'yhl_img/2.jpg', position: "客厅" },
          { img: 'yhl_img/3.jpg', position: "厨房" },
          { img: 'yhl_img/4.jpg', position: "卫生间" },
          { img: 'yhl_img/5.jpg', position: "主卧" },
          { img: 'yhl_img/6.jpg', position: "主卧" },
          { img: 'yhl_img/7.jpg', position: "主卧" },
          { img: 'yhl_img/8.jpg', position: "主卧" },
          { img: 'yhl_img/9.jpg', position: "主卧" },
          { img: 'yhl_img/10.jpg', position: "主卧" },
          { img: 'yhl_img/11.jpg', position: "主卧" },
          { img: 'yhl_img/12.jpg', position: "主卧" },
          { img: 'yhl_img/13.jpg', position: "主卧" },
          { img: 'yhl_img/14.jpg', position: "主卧" },
          { img: 'yhl_img/15.jpg', position: "主卧" },
          { img: 'yhl_img/16.jpg', position: "主卧" },
        ],

      };
    },
    methods: {
      onChange (index) {
        this.current = index;
        
      }
    },
    computed: {
      ...mapState(["detail_lists","imgList"])
    }
  };
</script>
<style scoped>

  .carousel {
    width: 100%;
    height: 100%;
  }

  .carousel img {
    width: 100%;
    height: 100%;
  }

  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: rgb(236, 233, 233);

    width: 40px;
    height: 20px;
    text-align: center;
    border-radius: 4px;
  }

  /*标题栏*/
  .titleOrStar {
    width: 100%;
    height: 1px;

    position: relative;
  }

  .title {
    position: absolute;
    width: 70%;
    height: 50px;
    top: -50px;
    left: 50%;
    transform: translate(-50%);
    background-color: rgba(13, 14, 13, 0.4);
    text-align: center;
  }

  .title span {
    
   
    
    color: #fff;
    font-size: 12px;
  }
.carousel {
  width: 100%;
  height: 100%;
}
.carousel img {
  width: 100%;
  height: 100%;
}
.custom-indicator{
  position: absolute;
  right: 10px;bottom:10px;
  color: rgb(236, 233, 233);
  
  width: 40px;height: 20px;
  text-align: center;
  border-radius: 4px;
}
/*标题栏*/
.titleOrStar{
  width: 100%;height:1px;
 
  position: relative;
}
.title{
  position: absolute;
  width: 70%;height: 50px;
  top:-50px;left:50%;
  transform: translate(-50%);
  background-color: rgba(13, 14, 13, 0.4);
  text-align: center;
}
.title span{
  width: 100%;height: 100%;  
  color:#fff;
  font-size: 12px;
  flex-wrap: 800;
  display: flex;
  align-items: center;
  justify-content: center;
} 

</style>

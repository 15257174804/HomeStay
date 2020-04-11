<template>
  <div class="img_box">
    <van-swipe indicator-color="white">
      <van-swipe-item class="img_out">
        <div class="img_in">
          <div class="img_title">沟通便捷</div>
          <div class="img_content"><div class="img_content_top">华人房东接待，</div><div class="img_content_bottom">无语言障碍</div></div>
          <div class="img_button">立即开启</div>
        </div>
        <img class="img_1" src="./image/e1.jpg" alt>
      </van-swipe-item>
      <van-swipe-item class="img_out">
        <div class="img_in">
          <div class="img_title">沟通便捷</div>
          <div class="img_content"><div class="img_content_top">华人房东接待，</div><div class="img_content_bottom">无语言障碍</div></div>
          <div class="img_button">立即开启</div>
        </div>
        <img src="./image/e1.jpg" alt>
      </van-swipe-item>
      <van-swipe-item class="img_out">
       <div class="img_in">
          <div class="img_title">沟通便捷</div>
          <div class="img_content"><div class="img_content_top">华人房东接待，</div><div class="img_content_bottom">无语言障碍</div></div>
          <div class="img_button">立即开启</div>
        </div>
        <img src="./image/e1.jpg" alt>
      </van-swipe-item>
      <van-swipe-item class="img_out">
        <div class="img_in">
          <div class="img_title">沟通便捷</div>
          <div class="img_content"><div class="img_content_top">华人房东接待，</div><div class="img_content_bottom">无语言障碍</div></div>
          <div class="img_button">立即开启</div>
        </div>
        <img src="./image/e1.jpg" alt>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {
     
    };
  }
};
</script>
<style scoped>
.img_box {
  width: 375px;
  height: 650px;
  
}
.img_out {
  position: relative;overflow: hidden;
}
.img_in {
  width: 200px;
  height: 200px;
  
  position: absolute;
  left:50px;
  bottom:87px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  z-index: 999;
}
.img_title{
  width:100%;
  height: 30%;
  
  font-size: 22px;
  color: #fff;
  font-weight:500;
  display: flex;
  align-items: flex-end;
  
}
.img_content{
  width: 100%;height: 30%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.img_content_top{
  width: 100%;height: 50%;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 17px;
}
.img_content_bottom{
  width: 100%;height: 50%;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 17px;
}
.img_button{
  width:60%;
  height: 20%;
  
  border: 1px solid #fff;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
/* 轮播指示器位置 */
.van-swipe__indicators {
  position: absolute;
  right: 30px;
  bottom: 40px;
}

img {
  height: 667px;
}
.img_1{
  margin-left: -484px;
}
</style>
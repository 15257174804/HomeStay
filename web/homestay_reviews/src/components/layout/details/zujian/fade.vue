<template>
  <div>
    <div class="fade_box">
      <div class="fade_title">退订须知</div>
      <van-steps direction="vertical" :active="4" inactive-icon="clock">
        <van-step>
          <span class="fade_content">11月17日14:00前取消，所有金额全部退还</span>
        </van-step>
        <van-step>
          <span class="fade_content">11月17日14:00-12月2日14:00取消,扣除首日房费50%，以及剩下房费的50%</span>
        </van-step>
        <van-step>
          <span class="fade_content">12月2日14:00后取消，扣除全部金额</span>
        </van-step>
      </van-steps>
      <div class="fade_details">
        <a href="javascript:;">详细规则</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"Fade"
};
</script>
<style>
.fade_box {
  width: 100%;
  
  background-color: rgba(204, 204, 204, 0.404);
  padding: 10px 10px;
  box-sizing: border-box;
}
/* 标题头 */
.fade_title{
  width: 100%;height: 30px;
  
  color: #999;
    font-size: 18px;
    line-height: 30px;
}
.van-step--finish .van-step__line {
  background-color: #000;
}
.van-steps{
  background-color: transparent;
}
/* 竖线样式 */
.van-step--vertical .van-step__line {
  top: 27px;
  left: -15px;
  width: 1px;
  height: 60%;
}
.fade_content {
  font-size: 12px;
}
.van-step--vertical:first-child::before {
   
    background-color:transparent; 
   
}
/* 详细规则 */
.fade_details{
  width: 100%;height: 30px;
  
}
.fade_details a{
  display: block;
  width: 70px;height: 30px;
  border:1px solid #333;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  color:#000;
}
</style>

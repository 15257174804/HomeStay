<template>
  <div>
    <div class="furniture_box">
      <div class="furniture_box_in">
        <div class="furniture_title">配套设施</div>
        <div class="furniture_content">
          <van-grid :column-num="4" :icon-size="19">
            <van-grid-item v-for="(furn,i) in furns" :key="i" :icon="furn.img|imgLoad()" :text="furn.text"/>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Furniture",
    data () {
      return {
        furns: [{ img: 'sheshi_img/热水器.png', text: "热水淋雨" },
          { img: 'sheshi_img/无线网.png', text: "无线网络" },
          { img: 'sheshi_img/冷气.png', text: "空调" },
          { img: 'sheshi_img/电视.png', text: "电视" },
          { img: 'sheshi_img/门禁.png', text: "门禁系统" },
          { img: 'sheshi_img/洗衣机.png', text: "洗衣机" },
          { img: 'sheshi_img/冰箱.png', text: "冰箱" },
          { img: 'sheshi_img/饮水机.png', text: "饮水设备" },
          { img: 'sheshi_img/有线网络.png', text: "有线网络" },
          { img: 'sheshi_img/拖鞋.png', text: "拖鞋" },
          { img: 'sheshi_img/手纸.png', text: "手纸" },
          { img: 'sheshi_img/牙具.png', text: "牙具" },
          { img: 'sheshi_img/毛巾.png', text: "毛巾" },
          { img: 'sheshi_img/洗发水.png', text: "浴液 洗发水" },
          { img: 'sheshi_img/香皂.png', text: "香皂" },
          { img: 'sheshi_img/小孩.png', text: "适宜儿童" },
          { img: 'sheshi_img/老人.png', text: "适宜老人" },
          { img: 'sheshi_img/残疾人.png', text: "适宜残疾人" },
          { img: 'sheshi_img/电梯.png', text: "电梯" },
          { img: 'sheshi_img/停车位.png', text: "停车位" },
          { img: 'sheshi_img/浴缸.png', text: "浴缸" },
          { img: 'sheshi_img/暖气.png', text: "暖气" }]
      }
    }
  };
</script>
<style>
  .furniture_box {
    width: 100%;


    padding: 10px 10px;
    box-sizing: border-box;
  }

  .furniture_box_in {
    width: 100%;
    height: 100%;

  }

  /* 设施标题 */
  .furniture_title {
    width: 100%;
    height: 30px;

    color: #999;
    font-size: 18px;
    line-height: 30px;
  }

  /* 设施 内容 */
  .furniture_content {
    width: 100%;


  }

  .van-grid-item__content {
    padding: 10px 0;
  }
</style>

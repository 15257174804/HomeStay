<template>
  <div>
    <div class="details_box">
      <div class="details_box_in">
        <div class="details_title">
        <div class="details_title_left">房源描述</div>
        <div class="details_title_right" @click="open">{{openOrClose}}</div>
      </div>
      <div class="details_content" @click="open" :class="{details_content_close:detailsClose}">
        <span class="details_sp1">个性描述</span> <span class="details_sp1_content">{{detail_lists.describe_detail}}</span>
       
      </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name:"Details",
  data(){
    return{
      detailsClose:true,
      openOrClose:"展开"
    }
  },
  methods:{
    open(){
      if(this.detailsClose==true){
        this.detailsClose=false;
        this.openOrClose="收起"
      }else{
        this.detailsClose=true;
        this.openOrClose="展开"
      }
      
    }
  },
  computed:{
    ...mapState(["detail_lists"])
  }
}
</script>
<style>
  .details_box{
    width: 100%;
    
   
    padding:10px 10px;
    box-sizing: border-box;
  }
  .details_box_in{
    width: 100%;height: 100%;
   
    border-radius: 10px;
  }
  /* 详情标题 */
  .details_title{
    width: 100%;
    height: 40px;
   
    display: flex;
    justify-content: space-between;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .details_title_left{
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 18px;
    color:#999;
  }
  .details_title_right{
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 12px;
  }
  /* 房源描述 */
  .details_content{
    width: 100%;max-height:500px;
    font-size: 18px;
    color: #333;
    word-break: break-all;
    display: flex;
    flex-direction: column;
    transition:all 1s;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
     overflow: hidden;
  }
  /* 房源收起样式 */
  .details_content_close{
    max-height: 80px;
    overflow: hidden;  
  }  
  .details_sp1{
    display: block;
    width: 20%;
    
    font-size: 13px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-left: 3px solid #000;
    color: #000;
    font-weight: bold;
  }
  .details_sp1_content{
    font-size: 13px;
  }
  .details_sp2{
    display: block;
    width: 20%;
    
    font-size: 13px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-left: 3px solid #000;
    color: #000;
    font-weight: bold;
  }
  
</style>
<template>
    <div class="containerOeder">
        <van-nav-bar
        title=""
        left-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
        />
        <!-- 标题 -->
        <div class="title">
            订单
        </div>
        <van-tabs v-model="active">
            <van-tab title="历史订单">
                <div class="hidetext" v-show="orderlist.length<=0">
                    <div>还没有订单哦！</div>
                </div>
                <div class="navOrder" v-for="(item,i) of orderlist" :key="i">
                    <div class="navText">
                        <span>{{item.room_title}}</span>
                        <span>{{item.start_date}}至{{item.end_date}}</span>
                        <span>￥{{item.price.toFixed(2)}}</span>
                    </div>
                    <div class="navImg">
                        <img :src="item.picture_small|imgLoad()" alt="">
                    </div>
                </div>
            </van-tab>

            <van-tab title="未完成订单">
                <div class="hidetext" v-show="unorderlist.length<=0">
                    <div>还没有订单哦！</div>
                </div>
                <div class="navOrder" v-for="(item,i) of unorderlist" :key="i">
                    <div class="navText">
                        <span>{{room_title}}</span>
                        <span>{{item.start_date}}至{{item.end_date}}</span>
                        <span>￥{{item.price.toFixed(2)}}</span>
                    </div>
                    <div class="navImg">
                        <img :src="item.picture_small|imgLoad()">
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    created(){
            this.loadMore();
    },
    data(){
        return {
            active:1,
            orderlist:[],
            unorderlist:[],
        }
    },
    methods:{
        // 加载数据
        loadMore(){
            //加载历史订单数据
            var from=0;
            var limit=20;
            var obj={from,limit};
            this.axios.get("users/history",obj)
            .then(res=>{
                console.log(res)
                if(res.data=="3"){
                    this.$toast("加载失败")
                }else if(res.data=="2"){
                    this.$toast("请登陆")
                }else{
                    console.log("加载历史订单成功")
                    res.data.map((item,index)=>{
                        let newItem={};
                        newItem.room_title=item.room_title;
                        newItem.price=item.price;
                        newItem.start_date=item.start_date.split("T")[0];
                        newItem.end_date=item.end_date.split("T")[0];
                        newItem.picture_small=JSON.parse(item.picture_small)[0]
                        this.orderlist.push(newItem);
                    })
                }
            })

            // 加载未完成订单历史数据
            // 暂时没有未完成订单接口？？？？
        },
        onClickLeft(){
            window.history.back();
        },
        // 通过订单跳转到详情页，需要查找产品id来获取产品，暂定
        toDetail(){
            this.$router.push("/details")
        }
    }
}
</script>
<style scoped>
.containerOeder .title{
    font-size: 24px;
    font-weight: 700;
    color:#484848;
    margin-top: 46px;
    padding:15px 20px 25px;;
}
.containerOeder .hidetext{
    width:100%;height:250px;
    text-align: center;
    color:#484848;
    font-size: 20px;
    font-weight: 600;
    padding-top:100px;

}
.containerOeder .hidetext div{
    border-bottom: 1px solid #eee;
    width:170px;
    padding-bottom: 5px;
    margin:0 auto;
}
.containerOeder .navOrder{
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding:20px 15px;
    width:100%;
}
.containerOeder .navOrder .navText{
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size:13px;
    color:#7d7e80;
}
.containerOeder .navOrder .navText span{margin: 1px 0;}
.containerOeder .navOrder .navText span:first-child{font-size:14px;font-weight: 700;color:#484848;}
.containerOeder .navOrder .navImg{
    width:120px;height:75px;
}
.containerOeder .navOrder .navImg img{width:100%;height:100%;}
</style>


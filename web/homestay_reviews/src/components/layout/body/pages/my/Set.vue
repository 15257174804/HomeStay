<template>
    <div class="containerSet">
        <van-nav-bar
        title="设置"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
        />
        <van-collapse v-model="activeNames">
        <van-collapse-item title="关于我们" name="1">一款提供真实房源可靠房源的民宿短租app，只为您的出行更安心。</van-collapse-item>
        <van-collapse-item title="意见反馈" name="2">如遇到任何问题，请联系客服400-800-123456</van-collapse-item>
        </van-collapse>
        <div class="down"><button @click="handleOut">退出登陆</button></div>
    </div>
</template>
<script>

export default {
    data(){
        return {
            activeNames:['']
        }
    },
    methods:{
        onClickLeft() {
            window.history.back();
            // this.$router.push("/my")
        },
        handleOut(){
            this.$messagebox.confirm("是否确认退出")
            .then(res=>{this.$router.push("/login")}) 
            .catch(err=>{})
            
        }
    }
}
</script>
<style scoped>
.van-nav-bar .van-icon{color:#006c70;}
.down{position: fixed;bottom:5px;width:100%;text-align: center;}
button{
    width:95%;height:40px;
    border:1px solid #eee;
    background:#fff;
    text-align: center;
    line-height: 40px;
    color:#323233;
    padding:0;
    border-radius: 5px;
}
.mint-msgbox-confirm /deep/ {color:#006c70;}
</style>

<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="transition"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    
    return {
      transitionName: "fold-left"
    }
  },
  mounted () 
 {
    this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
    })
},
  watch: {
    $route(to, from) {
      const routeDeep = ["/home","/Scenic","/Date","/Diary/1","/Diary/1","/Diary/2","/Diary/3","/Diary/4","/Diary/5","/Diary/6","/my","/Set","/login","/register","/Mylike","/Info","/Myorder","/Unorder","/Story","/Protocol","/search","/Detail","/comment_content","/pay","/people"];
      const toDepth = routeDeep.indexOf(to.path);
      const fromDepth = routeDeep.indexOf(from.path);
      this.transitionName = toDepth > fromDepth ? "fold-left" : "fold-right";
    }
  }
};
</script>

<style>
.transition{
  position: absolute;
  width: 100%;
}
* {
  margin: 0;
  padding: 0;
}

.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: .5s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: .5s;
}
@keyframes fold-left-in {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    /* visibility: visible; */
  }
  /*50% {
      transform: translate3d(50%, 0, 0);
    }*/
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  /*50% {
      transform: translate3d(-50%, 0 , 0);
    }*/
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    /* visibility: hidden; */
  }
}

.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: .5s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: .5s;
}
@keyframes fold-right-in {
  0% {
    width: 100%;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    /* visibility: visible; */
  }
  /*50% {
      transform: translate3d(50%, 0, 0);
    }*/
  100% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out {
  0% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  /*50% {
      transform: translate3d(-50%, 0 , 0);
    }*/
  100% {
    width: 100%;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    /* visibility: hidden; */
  }
}
  @font-face{
    font-family: 'FZShenYMXSJW';
    src:url('../static/font/FZShenYMXSJW.ttf') format('truetype')
  }
</style>


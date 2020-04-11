<template>
  <div class="District">
    <!--    <van-field-->
    <!--      readonly-->
    <!--      clickable-->
    <!--      label="城市"-->
    <!--      :value="value"-->
    <!--      placeholder="选择城市"-->
    <!--     -->
    <!--    />-->
    <span @click="showPicker = true">{{ $store.state.district|| "请选择城区"}}</span>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'District',
    data () {
      return {
        value: '',
        showPicker: false,
        columns: ['上城区', '下城区', '江干区', '西湖区', '拱墅区', '余杭区']
      }
    },
    methods: {
      onConfirm (val) {
        this.$store.commit('changeDistrict', val)
        this.showPicker = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .District {

  }
</style>
<style>
  .van-picker__cancel, .van-picker__confirm {
    color: #006c70 !important;
  }
</style>

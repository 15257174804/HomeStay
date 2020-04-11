<template>
  <div class="index">
    <sBody></sBody>
    <sFoot></sFoot>
  </div>
</template>

<script>
import sBody from './body/index'
import sFoot from './foot/index'

export default {
  name: 'index',
  data () {
    return {}
  },
  components: {
    sBody,
    sFoot
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>

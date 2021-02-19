<template>
  <div class="seconds">
    <sechead></sechead>
    <seclist :secondsList="seconds"></seclist>
  </div>
</template>

<script>
import sechead from './secondshead'
import seclist from './secondslist'
export default {
  name: 'seconds',
  props: ['seconds'],
  components: {
    sechead,
    seclist
  }
}
</script>

<style lang="scss" scoped>
.seconds {
  overflow: hidden;
  max-width: 1300px;
  min-width: 780px;
  margin: 0 auto;
  /*background-color: #e2f828;*/
}
</style>

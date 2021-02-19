<template>
  <div class="box">
    <hot1></hot1>
    <hot2 :hotList="list_r"></hot2>
  </div>
</template>

<script>
import hot1 from './hot1'
import hot2 from './hot2'
export default {
  name: 'hotRecommend',
  props: ['list_r'],
  components: {
    hot1,
    hot2
  }
}
</script>

<style scoped lang="scss">
.box {
}
</style>

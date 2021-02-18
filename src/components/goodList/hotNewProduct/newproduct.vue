<template>
  <div class="box">
    <Product-Head></Product-Head>
    <Product-List :list_x="list_x"></Product-List>
  </div>
</template>

<script>
import ProductHead from './productHead'
import ProductList from './productList'
export default {
  name: 'hotNewProduct',
  props: ['list_x'],
  data () {
    return {
    }
  },
  components: {
    ProductHead,
    ProductList
  }
}
</script>

<style scoped lang="scss">
.box {
  overflow: hidden;
  max-width: 1300px;
  min-width: 780px;
  margin: 0 auto;
  /*background-color: #f8f8f8;*/
}
</style>

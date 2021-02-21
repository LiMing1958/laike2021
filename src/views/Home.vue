<template>
  <div class="home">
    <HeadList></HeadList>
    <logo></logo>
    <foot></foot>
  </div>
</template>

<script>
// @ is an alias to /src
import HeadList from '../components/head/headList'
import logo from '../components/logoLine/logo'
import foot from '../components/footer/footer'
export default {
  name: 'Home',
  components: {
    HeadList,
    logo,
    foot
  }
}
</script>

<style scoped lang="scss">
  .home {
    background: #F6F6F6;
  }
</style>

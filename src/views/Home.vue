<template>
  <div class="home">
    <HeadList></HeadList>
    <logo></logo>
  </div>
</template>

<script>
// @ is an alias to /src
import HeadList from '../components/head/headList'
import logo from '../components/logoLine/logo'
export default {
  name: 'Home',
  components: {
    HeadList,
    logo
  }
}
</script>

<template>
  <div class="logo">
    <logoTitle></logoTitle>
    <navLine></navLine>
  </div>
</template>

<script>
import logoTitle from './logoTitle'
import navLine from './navList'
export default {
  name: 'logo',
  components: {
    logoTitle,
    navLine
  }

}
</script>

<style scoped lang="scss">
  .logo {
    width: 100%;
    height: 165px;
    background-color: #e5ffeb;
  }
</style>

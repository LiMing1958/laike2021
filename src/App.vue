<template>
  <div id="app">
    <transition>
      <router-view/>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .v-enter{
    transform: translateX(-100%);
    opacity: 0;
    position: absolute;
  }
  .v-leave-to{
    transform: translateX(100%);
    opacity: 0;
    position: absolute;
  }
  .v-leave-active,
  .v-enter-active{
    transition: all 0.7s ease;
  }
</style>

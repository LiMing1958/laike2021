<template>
    <div class="box">
      <div class="nav-box">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <span class="breadcrumb-link" @click="toHome">{{ $store.state.products.title }}</span>
          </a-breadcrumb-item>
          <span slot="separator">
            <a-icon style="color: #acacac;font-size: 12px" type="right" />
          </span>
          <a-breadcrumb-item>{{$store.state.products.products.product_title}}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
</template>

<script>
export default {
  name: 'productdetails',
  data () {
    return {
    }
  },
  methods: {
    toHome () {
      this.$store.commit('toHome', 'HomeList')
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  width: 1280px;
  margin: 0 auto;
  overflow: hidden;
  padding-left: 10px;
  /*background-color: #a2ff35;*/
  .nav-box {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    /*background-color: #62ffe1;*/
    .breadcrumb-link {
      color: #303133;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>

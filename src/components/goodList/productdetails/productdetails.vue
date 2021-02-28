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
    <div class="product-list">
      <div class="images-list">
        <div class="left-images">
          <div class="large-img">
            <img src="" alt="">
          </div>
          <div class="list-img">
            <img src="" alt="">
          </div>
        </div>
        <div class="right-msg"></div>
      </div>
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
      font-family: "Microsoft YaHei";
    }
  }
  .product-list {
    width: 100%;
    background-color: #ff956d;
    .images-list {
      width: 100%;
      min-height: 570px;
      position: relative;
      .left-images {
        position: absolute;
        width: 490px;
        height: 100%;
        left: 0;
        background-color: #ff8144;
        .large-img {
          width: 100% ;
          height: 478px;
          background-color: #ff4a45;
        }
        .list-img {
          width: 100%;
          height: 76px;
          position: absolute;
          bottom: 0;
          background-color: #ffd722;
        }
      }
      .right-msg {
        position: absolute;
        width: 730px;
        height: 100%;
        right: 0;
        background-color: #b7cfff;
      }
    }
  }
}
</style>

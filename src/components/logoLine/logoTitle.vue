<template>
  <div class="logoTitle">
    <div class="logo-img">
      <img class="imgContain" src="../../assets/images/logo.png" alt="logo">
      <div class="iconList">
        <span class="iconfont">&#xe78b;</span>
        <span class="iconfont">&#xe645;</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'logoTitle'
}
</script>

<style scoped lang="scss">
  .logoTitle {
    width: 100%;
    height: 60px;
    /*background-color: #fff9af;*/
    .logo-img {
      max-width: 1220px;
      min-width: 660px;
      margin: 0 auto;
      text-align: center;
      .imgContain {
        margin-left: 80px;
      }
      .iconList {
        float: right;
        padding-top: 15px;
        .iconfont {
          font-size: 30px!important;
          color: #989898;
          &:nth-child(1) {
            margin-right: 20px;
          }
        }
      }

    }
  }
</style>

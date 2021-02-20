<template>
    <div class="box">
      <div class="SecondTop">
        <div class="top-content">
          <div class="top-content-left">
            <img src="../../../../assets/images/Seconds_icon.png" alt="">
            <img src="../../../../assets/images/Seconds2_icon.png" alt="">
          </div>
          <div class="top-content-right">
            <h2>距离开始</h2>
            <timer></timer>
          </div>
        </div>
      </div>
      <div class="container">
        333
      </div>
    </div>
</template>

<script>
import timer from '../timer'
export default {
  name: 'secondcontainer',
  data () {
    return {}
  },
  components: {
    timer
  }
}
</script>

<style scoped lang="scss">
.box {
  width: 900px;
  min-height: calc( 100vh - 762px );
  padding: -20px 0px 0px 0px!important;
  /*margin: 0 auto;*/
  .SecondTop {
    width: 500px;
    height: 100px;
    background-color: #8fff22;
    margin: 0 auto;
    .top-content {
      width: 400px;
      height: 100px;
      background-color: #ff016f;
      .top-content-left {
        float: left;
      }
      .top-content-right {
        float: right;
      }
    }
  }
}
</style>

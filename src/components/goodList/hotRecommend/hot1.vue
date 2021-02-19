<template>
    <div class="hotRecommend">
      <div class="headLine">
        <div class="left">
          <img src="https://v3pro.houjiemeishi.com/PC/static/home-img/rexiao.png" alt="">
          <img src="https://v3pro.houjiemeishi.com/PC/static/images/rexiao_bottom.png" alt="">
          <div class="titleText">
            <p>热销推荐</p>
            <p>Hot Products</p>
          </div>
        </div>
        <div class="right">
          <p>更多热销 ></p>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'hotRecommendHead',
  data () {

  },
  methods: {

  }

}
</script>

<style scoped lang="scss">
  .hotRecommend {
    max-width: 1275px;
    min-width: 780px;
    margin: 0 auto;
    /*background-color: #ffc027;*/
    .headLine {
      position: relative;
      width: 100%;
      height: 55px;
      margin-bottom: 19px;
      margin-top: 35px;
      /*background-color: #29ff18;*/
      .left {
        width: 200px;
        position: relative;
        float: left;
        p:nth-child(1) {
          font-size: 30px;
        }
        p:nth-child(2) {
          position: absolute;
          font-size: 14px;
          bottom: -12px;
        }
        img:nth-child(1) {
          float: left;
          margin-top: 5px;
        }
        img:nth-child(2) {
          float: right;
          position: absolute;
          bottom: 0px;
          right: 31px;
          z-index: 0;
        }
        .titleText {
          position: absolute;
          left: 40px;
          z-index: 99;
          margin-left: 10px;
        }
      }
      .right {
        p {
          position: absolute;
          bottom: 0;
          right: 0;
          cursor: pointer;
        }
      }
    }
  }
</style>

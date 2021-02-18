<template>
  <div class="second-box">
    <div class="pc-img">
      <img :src="secondsList.pcAdImg" alt="">
      <div class="current-time">
        <p>
          <span>20:00</span>
          <span>点场</span>
        </p>
        <p class="miaosha-back"></p>
        <p>倒计时</p>
        <p>
          <timer :timer="secondsList.current_time"></timer>
        </p>
        <button>更多抢购></button>
      </div>
    </div>
    <div class="second-list">
      <ul>
        <li v-for="item in secondsList.pro_list" :key="item.id">
          <img :src="item.imgurl" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import timer from './timer'
export default {
  name: 'secondslist',
  props: ['secondsList'],
  data () {
    return {
    }
  },
  components: {
    timer
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.second-box {
  width: 1275px;
  margin: 0 auto;
  overflow: hidden;
  .pc-img {
    float: left;
    position: relative;
    .current-time {
      text-align: center;
      position: absolute;
      width: 200px;
      height: 280px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      /*background-color: rgba(0, 0, 0, 0.4);*/
      p:nth-child(1) {
        color: #705747;
        margin-top: 40px;
        span:nth-child(1) {
          font-size: 30px;
        }
      }
      p:nth-child(2) {
        display: inline-block;
        margin-top: 10px;
        width: 28px;
        height: 3px;
        background: #BD946D;
      }
      p:nth-child(3) {
        margin-top: 15px;
        font-size: 16px;
      }
      p:nth-child(4) {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #705C47;
        font-size: 18px;
        margin-top: 10px;
      }
      button {
        margin-top: 40px;
        width: 112px;
        height: 32px;
        background: #BD946D;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 400;
        border: 0;
        outline: 0;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
  }
  .second-list {
    width: calc(100% - 252px);
    height: 399px;
    /*background-color: #55ff7c;*/
    float: left;
    overflow: hidden;
    li {
      width: 474px;
      height: 199.5px;
      line-height: 199.5px;
      padding: 0 29px 0 15px;
      float: left;
      &:nth-child(1),&:nth-child(2) {
        border-top: 1px solid #E6E6E6;
        border-right: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;
      }
      &:nth-child(3),&:nth-child(4) {
        border-right: 1px solid #E6E6E6;
        border-bottom: 1px solid #E6E6E6;
      }
      img {
        width: 160px;
        height: 150px;
      }
    }
  }
}
</style>

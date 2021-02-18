<template>
  <div class="box">
    <dl v-for="item in hotList" :key="item.id">
      <dt>
        <img :src="item.imgurl" alt="">
        <div class="coverContent" v-if="item.status === '3'">
          已下架
        </div>
      </dt>
      <dd>
        <p>
          <img :src="item.logo" alt="">
          {{item.mch_name}}
        </p>
        <p>{{item.product_title}}</p>
        <p>{{item.price}}</p>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'hotRecommendList',
  props: ['hotList'],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  overflow: hidden;
  max-width: 1300px;
  min-width: 780px;
  margin: 0 auto;
  /*&:after {*/
  /*  content: '.';*/
  /*  */
  /*}*/
  dl {
    display: block;
    position: relative;
    width: 288px;
    height: 390px;
    /*这里父元素必须清楚浮动，不然会布局塌陷*/
    float: left;
    margin: 8px 18.5px;
    &:hover {
      box-shadow: rgb(228, 228, 228) 0px 0px 5px 2px;
      dd {
        background-color: rgb(238, 238, 238);
      }
    }
  }
  dt {
    width: 288px;
    height: 288px;
    position: relative;
    top: 0;
    padding-top: 31.5px;
    background-color: #ffffff;
    .coverContent {
      font-size: 18px;
      color: #ffffff;
      line-height: 200px;
      text-align: center;
      position: absolute;
      width: 200px;
      height: 200px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: block;
      margin: auto;
      border-radius: 200px;
      background-color: rgba(0, 0, 0, 0.4);
    }
    img {
      bottom: 0;
      left: 0;
      right: 0;
      display: block;
      width: 225px;
      height: 227px;
      margin: auto;
    }
  }
  dd {
    width: 288px;
    text-align: center;
    height: 102px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      width: 288px;
      height: 18px;
      /*display: flex;*/
      /*flex-direction: row;*/
      /*justify-content: center;*/
      /*align-items: center;*/
      margin-bottom: 3px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:nth-child(3) {
        color: red;
      }
    }
    img {
      width: 19px;
      height: 18px;
      margin-right: 3px;
    }
  }
}
</style>

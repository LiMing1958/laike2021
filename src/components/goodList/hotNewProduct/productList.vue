<template>
  <div class="productList">
    <ul>
      <li v-for="item in list_x" :key="item.id">
          <div class="imgContent">
            <img :src="item.imgurl" alt="">
            <div class="coverContent" v-if="item.status === '3'">
              已下架
            </div>
          </div>
          <div class="messageBox">
            <p>
              <img :src="item.logo" alt="">
              {{item.mch_name}}
            </p>
            <p>{{item.product_title}}</p>
            <p>{{item.price}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hotNewProductList',
  props: ['list_x'],
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.productList {
  max-width: 1275px;
  min-width: 780px;
  margin: 0 auto;
  /*background-color: #ffc027;*/
  .messageBox {
    height: 77.99px;
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 35px;
    background-color: #fff;
      p {
        /*display: flex;*/
        /*flex-direction: row;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        margin-bottom: 3px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:nth-child(2) {
          width: 432px;
          font-size: 20px;
          font-weight: bold;
          color: black;
        }
        &:nth-child(3) {
          color: red;
        }
      }
      img {
        width: 19px!important;
        height: 18px!important;
        margin-right: 3px;
      }
  }
  li {
    float: left;
    margin-right: 9px;
    margin-bottom: 12px;
    background-color: #fff;
    cursor: pointer;
  }
  li:nth-child(1) {
    width: 432px;
    height: 432px;
    .imgContent {
      width: 432px;
      height: 432px;
      position: relative;
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
    }
    .messageBox {
      height: 155.99px;
    }
    img {
      width: 432px;
      height: 432px;
    }
  }
  li:last-child {
    display: none;
  }
  li:nth-child(n+2) {
    width: 269px;
    height: 288px;
    .imgContent {
      width: 269px;
      height: 210px;
      position: relative;
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
    }
    p:nth-child(2) {
      width: 269px;
      font-weight: bold;
      font-size: 14px;
      font-weight: bold;
      color: black;
    }
    img {
      width: 269px;
      height: 210px;
    }
  }
  /*li + li {*/
  /*  float: left;*/
  /*  width: 244px;*/
  /*  height: 288px;*/
  /*  background-color: #ff537b;*/
  /*  img {*/
  /*    width: 244px;*/
  /*    height: 210px;*/
  /*  }*/
  /*}*/
}
</style>

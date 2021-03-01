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
            <img :src="largeImg" alt="">
          </div>
          <div class="list-img">
            <span class="icon-left" @click="leftClick">
              <a-icon type="left" />
            </span>
            <div class="img-container-box">
              <ul>
                <li v-for="(item, index) in proImgArr" :key="index" @click="handleclickImg(item, index)">
                  <img :src="item" alt="">
                </li>
              </ul>
            </div>
            <span class="icon-right" @click="rightClick">
              <a-icon type="right" />
            </span>
          </div>
        </div>
        <div class="right-msg">
          <div class="title-box">
            <span>新品</span>
            <span>热销</span>
            <span>推荐</span>
            <span>{{pro.name}}</span>
          </div>
          <div class="price-box">
            <p>
              <span>价格</span>
              <span>￥{{pro.price + '.00'}}</span>
            </p>
          </div>
          <div class="color-list">
            <span>颜色</span>
            <span class="color-item" :class="{ colorItemDefault: index === 0 && isDefault}" v-for="(item, index) in skuBeanList" :key="item.cid" @click="handleClickColor(item)">{{item.name}}</span>
          </div>
          <div class="quantity">
            <span>数量</span>
            <div class="quantity-btn">
              <span class="decrease" @click.stop="decrease" ref="decreasecount"><a-icon type="minus" /></span>
              <input type="text" v-model="num" ref="inputTag">
              <span class="add" @click.stop="addCount" ref="addcount"><a-icon type="plus" /></span>
            </div>
          </div>
          <div class="hr"></div>
          <div class="end">
            <a-button type="danger" class="addToCart">
              加入购物车
            </a-button>
            <a-button class="buyNow" type="danger" ghost>
              立即购买
            </a-button>
            <span class="Favorites">
              <div>
                <p><a-icon type="star" /></p>
                <p>收藏</p>
              </div>
            </span>
          </div>
          <div class="shareBox">
            <span>分享</span>
            <span>
              <a-icon type="wechat" />
            </span>
            <span>
              <a-icon type="chrome" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'productdetails',
  data () {
    return {
      largeImg: null,
      pro: null,
      skuBeanList: null,
      currentIndex: -1,
      proImgArr: null,
      isClickItem: false,
      ClickIndex: null,
      isDefault: true,
      num: 1,
      count: null
    }
  },
  mounted () {
    this.getProductsDetail()
  },
  methods: {
    addCount () {
      if (this.num < this.count) {
        this.num++
        this.$refs.inputTag.value = this.num
        if (this.num === this.count) {
          this.$refs.addcount.style.cursor = 'not-allowed'
        }
        if (this.num > 0) {
          this.$refs.decreasecount.style.cursor = 'pointer'
        }
      }
    },
    decrease () {
      if (this.num > 0) {
        this.num--
        this.$refs.inputTag.value = this.num
        if (this.num === 0) {
          this.$refs.decreasecount.style.cursor = 'not-allowed'
        }
        if (this.num < this.count) {
          this.$refs.addcount.style.cursor = 'pointer'
        }
      }
    },
    leftClick () {
      this.currentIndex--
      if (this.currentIndex >= 0) {
        this.largeImg = this.proImgArr[this.currentIndex]
      }
      if (this.currentIndex <= -1) {
        this.currentIndex = this.proImgArr.length - 1
        this.largeImg = this.proImgArr[this.currentIndex]
      }
      this.setLiNodeBorder()
    },
    rightClick () {
      this.currentIndex++
      this.largeImg = this.proImgArr[this.currentIndex]
      if (this.currentIndex === this.proImgArr.length) {
        this.currentIndex = 0
        this.largeImg = this.proImgArr[this.currentIndex]
      }
      this.setLiNodeBorder()
    },
    setLiNodeBorder () {
      const target = window.event.currentTarget
      const childNodeList = target.parentNode.childNodes
      // console.log(liNode)
      const liArr = []
      childNodeList.forEach(item => {
        if (item.nodeName === 'DIV') {
          const liNode = item.childNodes[0].childNodes
          console.log(liNode)
          liNode.forEach(item => {
            item.style.border = 'none'
            liArr.push(item)
          })
        }
      })
      liArr[this.currentIndex].style.border = '2px solid red'
    },
    handleClickColor (item) {
      this.largeImg = item.imgurl
      const target = window.event.currentTarget
      const siblingElements = target.parentNode.childNodes
      siblingElements.forEach(item => {
        item.style.border = 'none'
      })
      this.isDefault = false
      target.style.border = '1px solid #D3272D'
    },
    handleclickImg (item, index) {
      this.currentIndex = index
      this.largeImg = item
      const target = window.event.currentTarget
      target.parentNode.childNodes.forEach(item => {
        item.style.border = 'none'
      })
      target.style.border = '2px solid red'
    },
    getProductsDetail () {
      const params = {
        module: 'app_pc',
        action: 'product',
        m: 'index',
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I',
        pro_id: this.$store.state.products.products.id,
        language: null
      }
      api.getProductsDetail(params).then(res => {
        this.pro = res.data.data.pro
        console.log(res.data.data)
        const imgData = res.data.data.skuBeanList
        this.skuBeanList = imgData
        this.largeImg = imgData[0].imgurl
        this.count = parseInt(imgData[0].count)
        this.proImgArr = res.data.data.pro.img_arr
      })
    },
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
    /*background-color: #ff956d;*/
    .images-list {
      width: 100%;
      min-height: 570px;
      position: relative;
      .left-images {
        position: absolute;
        width: 490px;
        height: 100%;
        left: 0;
        /*background-color: #ff8144;*/
        .large-img {
          width: 100% ;
          height: 478px;
          /*background-color: #ff4a45;*/
          img {
            width: 100%;
            height: 100%;
          }
        }
        .list-img {
          width: 100%;
          height: 76px;
          position: absolute;
          bottom: 0;
          /*background-color: #ffd722;*/
          li {
            width: 76px;
            height: 76px;
            margin-right: 13.3px;
            /*background-color: #b8ff63;*/
            float: left;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
            &:first-child {
              margin-left: 13.5px;
            }
            /*&:last-child {*/
            /*  margin: 0;*/
            /*}*/
          }
          .img-container-box {
            position: absolute;
            left: 15px;
            width: calc(100% - 30px);
            height: 100%;
            /*background-color: #ffc896;*/
            overflow: hidden;
          }
          .icon-right {
            position: absolute;
            right: 0;
            top: 0;
          }
          .icon-left {
            position: absolute;
            left: 0;
          }
          span {
            height: 100%;
            width: 15px;
            cursor: pointer;
            background-color: #e6e6e6;
            display: inline-block;
            font-size: 12px;
            color: #9c9c9c;
            text-align: center;
            line-height: 76px;
          }
        }
      }
      .right-msg {
        position: absolute;
        width: 730px;
        height: 100%;
        right: 0;
        /*background-color: #b7cfff;*/
        .title-box {
          span {
            padding: 0 5px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            color: #FFFEFE;
            margin-right: 9px;
            display: inline-block;
            &:nth-child(1) {
              background-color: #FF6A30;
            }
            &:nth-child(2) {
              background-color: rgb(212, 40, 45);
            }
            &:nth-child(3) {
              background-color: rgb(212, 40, 45);
            }
            &:nth-child(4) {
              font-size: 16px;
              color: #020202;
              font-weight: bold;
              font-family: "Microsoft YaHei";
            }
          }

        }
        .price-box {
          width: 100%;
          height: 108px;
          margin: 24px 0;
          padding: 25px 0 0 10px;
          background-color: #ebebeb;
          p {
            position: relative;
            span:nth-child(1) {
              margin-right: 32px;
            }
            span:nth-child(2) {
              position: absolute;
              top: -2px;
              font-size: 24px!important;
              line-height: 24px!important;
              font-weight: bold;
              font-family: "Microsoft YaHei";
              color: #D4282D;
            }
          }
        }
        .color-list {
          width: 100%;
          height: 50px;
          line-height: 50px;
          /*background-color: #42ffba;*/
          span:nth-child(1) {
            margin-right: 55px;
          }
          .colorItemDefault {
            border: 1px solid #D3272D!important;
          }
          .color-item {
            display: inline-block;
            min-width: 56px;
            padding: 0 10px;
            height: 32px;
            margin-right: 10px;
            border: 1px solid #DCDFE6;
            text-align: center;
            line-height: 32px;
            cursor: pointer;
            &:hover {
              border: 1px solid #D3272D;
            }
          }
        }
        .quantity {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          /*line-height: 50px;*/
          /*background-color: #42ffba;*/
          .quantity-btn {
            margin-left: 56px;
            /*margin-top: 20px;*/
            display: inline-block;
            border-radius: 4px;
            width: 130px;
            height: 32px;
            border: 1px solid #DCDFE6;
            input {
              height: 100%;
              width: calc(100% - 66px);
              text-align: center;
              background-color: transparent;
              border-left: 1px solid #DCDFE6;
              border-right: 1px solid #DCDFE6;
            }
            .decrease {
              cursor: pointer;
              display: inline-block;
              float: left;
              width: 33px;
              font-size: 12px;
              height: 100%;
              color: #9c9c9c;
              font-family: Andalus;
              font-weight: normal;
              line-height: 32px;
              text-align: center;
            }
            .add {
              cursor: pointer;
              display: inline-block;
              float: right;
              width: 33px;
              height: 100%;
              font-size: 14px;
              color: #9c9c9c;
              font-family: Andalus;
              line-height: 30px;
              text-align: center;
            }
          }
        }
        .hr {
          width: 100%;
          height: 1px;
          margin-top: 30px;
          background-color: #e4e4e4;
        }
        .end {
          width: 100%;
          height: 50px;
          margin-top: 28px;
          /*background-color: #ff9166;*/
          .Favorites {
            float: right;
            margin-right: 320px;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #DDDDDD;
            font-size: 14px;
            color: #888888;
            text-align: center;
            box-sizing: border-box;
            cursor: pointer;
            &:hover {
              background-color: #D4282D;
              color: white;
            }
            p {
              font-size: 14px;
            }
          }
          .buyNow {
            height: 100%;
            width: 168px;
            font-weight: bold;
            margin-left: 12px;
          }
          .addToCart {
            height: 100%;
            width: 168px;
            font-weight: bold;
            background-color: #D4282D;
            border: none;
          }
          .addToCart:hover {
            background-color: rgba(255, 20, 42, 0.64) !important;
          }
        }
        .shareBox {
          position: absolute;
          display: flex;
          bottom: 0;
          color: #878787;
          align-items: center;
          padding-top: 10px;
          margin-top: auto;
          span:nth-child(2) {
            display: inline-block;
            background-color: #acacac;
            text-align: center;
            line-height: 19px;
            width: 18px;
            height: 18px;
            color: white;
            font-size: 12px;
            border-radius: 18px;
            margin-left: 60px;
            cursor: pointer;
            &:hover {
              background-color: #1cb637;
            }
          }
          span:nth-child(3) {
            display: inline-block;
            background-color: #acacac;
            text-align: center;
            padding-right: 0.5px;
            line-height: 18px;
            width: 18px;
            height: 18px;
            color: white;
            font-size: 12px;
            border-radius: 18px;
            margin-left: 15px;
            cursor: pointer;
            &:hover {
              background-color: #1cb637;
            }
          }
        }
      }
    }
  }
}
</style>

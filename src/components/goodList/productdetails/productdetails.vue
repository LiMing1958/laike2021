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
            <bigimg :imgurl="largeImg"></bigimg>
            <div class="coverContent" v-if="this.$store.state.products.products.status === '3'">
              已下架
            </div>
<!--            <img :src="largeImg" alt="">-->
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
            <span>{{name}}</span>
          </div>
          <div class="price-box">
            <p>
              <span>价格</span>
              <span>￥{{price + '.00'}}</span>
            </p>
            <p>
              <a-modal v-model="visible"
                       :footer="null"
                       width="420px"
                       title="领券"
                       :centered=true
                       :destroyOnClose="true">
                <div v-for="item in couponList" :key="item.id" style="
                          width: 80%;
                          height: 151px;
                          text-align: center;
                          margin: 0 auto;
                          overflow: hidden;
                          position: relative;
                          box-shadow: #e7e7e7 1px 1px 8px 1px;
                     ">
                    <div style="position: absolute;left: 242px;top: -11px;width: 20px;height: 20px;border-radius: 20px;background-color: #e6e6e6;"></div>
                    <div style="position: absolute;left: 242px;top: 142px;width: 20px;height: 20px;border-radius: 20px;background-color: #e6e6e6;"></div>
                    <div style="width: 253px;
                                height: 100%;
                                padding: 20px 26px;
                                text-align: left;
                                border-right: 1px dashed #cdcdcd;
                                float: left">
                      <p style="width: 100%;
                                height: 28px;
                                display: flex;
                                align-items: flex-end;
                                font-size: 18px;
                                line-height: 18px;
                                color: #D4282D;">
                        <span style="font-weight: bold;
                                    font-size: 34px;
                                    color: #d4282d;
                                    line-height: 28px;">
                          {{parseInt(item.discount) > 0 ? parseInt(item.discount) : '1'}}
                        </span>
                        折
                        <span style="padding: 4px 5px;
                                    background-color: #FEEDED;
                                    color: #D4282D;
                                    font-size: 12px;
                                    line-height: 12px;
                                    margin-left: 8px;">
                          {{item.limit}}
                        </span>
                      </p>
                      <p style="color: black;margin-top: 15px;">{{item.coupon_name}}</p>
                      <p style="color: #999999;margin-top: 15px;">{{'有效期 ' + item.start_time + '-' + item.end_time}}</p>
                    </div>
                    <div style="width: 44px;
                                height: 100%;
                                float: right;
                                color: #D4282D;
                                font-weight: bold;
                                cursor: pointer;
                                display: flex;
                                padding: 0 10px;
                                align-items: center;
                                justify-content: center;
                    ">
                      立即领取
                    </div>
                </div>
              </a-modal>
              <span class="get-coupon" v-if="couponStr">领券</span>
              <span v-if="couponStr" class="coupon-str-box" @click="getCoupon">
                <span class="coupon-str">{{couponStr}}</span>
                <img src="https://v3pro.houjiemeishi.com/PC/static/images/lq_bg.png" alt="">
              </span>
            </p>
          </div>
        <div class="attrList-list" v-for="(item, indexPa) in attrList" :key="item.id">
          <span class="attrName">{{item.attrName}}</span>
          <span class="attrList">
              <span class="color-item" :class="{ colorItemDefault: index === 0, stockClass: count === 0}" v-for="(items, index) in item.attr" :key="index"  @click="handleClickColor(items,item, index, indexPa)">{{items.attributeValue}}</span>
          </span>
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
          <a-button ref="addCart" type="danger" class="addToCart" :class="{ offShelf: $store.state.products.products.status === '3' || count === 0 }" @click="addToShopCart">
            加入购物车
          </a-button>
          <a-button class="buyNow" :class="{ offShelfBuy: $store.state.products.products.status === '3' || count === 0 }" type="danger" ghost @click="buyNow">
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
          <a-modal v-model="visibleShare"
                   :footer="null"
                   width="25%"
                   height="400px"
                   :centered=true
                   :destroyOnClose="true">
            <div style="text-align: center;padding-top: 25px;display: flex;
                          align-items: center;
                          justify-content: center">
              <div style="width: 200px;
                          height: 220px;
                          padding-top: 15px;
                          background-color: #fff;">
                <img class="modal-code" src="@/assets/images/H5.png"/>
                <h2 style="font-weight: bold!important;
                              color: #000000!important;
                              padding-top: 20px!important;">
                  扫码进入来客电商H5
                </h2>
              </div>
            </div>
          </a-modal>
          <span>分享</span>
          <span class="iconfont" @click="visibleShare=!visibleShare">
            &#xe65b;
          </span>
          <span class="iconfont" @click="visibleShare=!visibleShare">
            &#xe659;
          </span>
        </div>
      </div>
    </div>
     <div class="product-details">
       <div class="product-details-left">
         <a-tabs v-model="activeKey" @change="getcomment(activeKey)">
           <a-tab-pane key="1" tab="商品详情">
             <div class="product-container" v-html="content"></div>
           </a-tab-pane>
           <a-tab-pane key="2" :tab="comments ? comments : '商品评价（0）'" force-render>
             <div class="product-review" @click="handleClickComment">
               <span @click="all">全部评价（{{commenttotal}}）</span>
               <span @click="handleHasImg">有图（{{commentImg ? commentImg : '0'}}）</span>
               <span @click="handleHasZhuiPing">有追评（{{commentZhui ? commentZhui : '0'}}）</span>
             </div>
             <div class="comment-list" v-for="item in commentlist" :key="item.id">
               <div class="username">
                 <img :src="item.headimgurl" alt="">
                 <span>{{item.user_name}}</span>
               </div>
               <div class="comment-msg">
                 <div>
                   <span class="comment-type-img" v-for="items in item.CommentTypeArr" :key="items">
                     <img src="../../../assets/images/pj.png" alt="">
                   </span>
                 </div>
                 <div class="comment-content">{{item.content}}</div>
                 <span class="comment-images" v-for="items in item.images" :key="items.url" @click="handleClickImages(items)">
                   <a-modal v-model="commentvisible"
                            :footer="null"
                            width="90%"
                            :centered=true
                            :destroyOnClose="true">
                   <div style="text-align: center;padding-top: 25px;" @click="commentvisible = !commentvisible">
                     <img style="width: 600px;" class="modal-code" :src="imgurl" alt="">
                   </div>
                 </a-modal>
                     <img src="https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1604977168293.png" alt="">
                   </span>
                 <div class="comment-time">
                   <span>{{item.attribute_str}}</span>
                   {{item.add_time}}
                 </div>
               </div>
             </div>
             <div class="pagination">
               <a-pagination v-model="current" :total="length" show-less-items />
             </div>
           </a-tab-pane>
         </a-tabs>
       </div>
       <div class="product-details-right">
         <a-affix>
           <div class="shop-list" id="shop">
             <div class="nav-item">
               <img :src="shoplistLogo" alt="">
               <span>{{shoplist.shop_name}}</span>
               <a-button class="to-shop-btn">进店逛逛</a-button>
             </div>
             <ul>
               <li>
                 <h2>{{shoplist.quantity_on_sale}}</h2>
                 <span>在售商品</span>
               </li>
               <li>
                 <h2>{{shoplist.quantity_sold}}</h2>
                 <span>已售</span>
               </li>
               <li>
                 <h2>{{shoplist.collection_num}}</h2>
                 <span>关注人数</span>
               </li>
             </ul>
           </div>
         </a-affix>
         <div class="related-recommendations">
           <div class="nav-title">
             <span></span>
             <span>相关推荐</span>
             <span></span>
           </div>
           <div class="recommendations-list" v-for="item in relatedRecommendations" :key="item.id" @click="handleRecommendations(item)">
             <img :src="item.imgurl" alt="">
             <div class="recommendations-msg">
               <h1>{{item.product_title}}</h1>
               <p>{{item.price}}</p>
             </div>
           </div>
         </div>
       </div>
     </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import bigimg from './bigimg/largeimg'
import mixin from '@/assets/js/scrollTop'
import Event from '@/assets/js/event'
export default {
  name: 'productdetails',
  mixins: [mixin],
  data () {
    return {
      // 以后都不能赋值为null,模板会渲染报错
      items: null,
      visible: false,
      visibleShare: false,
      current: 1,
      length: 1,
      commentvisible: false,
      largeImg: null,
      pro: null,
      name: '',
      price: '',
      content: '',
      skuBeanList: null,
      attrList: null,
      currentIndex: -1,
      proImgArr: null,
      isClickItem: false,
      ClickIndex: null,
      isDefault: true,
      num: null,
      count: null,
      couponStr: null,
      couponList: null,
      activeKey: '1',
      commentstotal: null,
      commenttotal: null,
      comments: null,
      commentImg: null,
      commentZhui: null,
      commentlist: null,
      shoplist: {},
      shoplistLogo: '',
      relatedRecommendations: null,
      imgurl: null,
      proImagesUrl: null,
      isToTop: false,
      addCartsList: null,
      colorIndex: null,
      colorIndexPa: null
    }
  },
  components: {
    bigimg
  },
  mounted () {
    this.getProductsDetail()
    window.addEventListener('scroll', this.scrollHandle)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandle)
  },
  methods: {
    findCid () {
      let cartsStr = ''
      this.attrList.forEach(item => {
        item.attr.forEach(items => {
          if (items.select) {
            cartsStr += items.attributeValue
          }
        })
      })
      console.log(cartsStr)
      let attributeid = Number
      const skuBeanList = this.skuBeanList
      skuBeanList.forEach(list => {
        if (list.name === cartsStr) {
          attributeid = parseInt(list.cid)
        }
      })
      return attributeid
    },
    buyNow () {
      if (this.$store.state.products.products.status === '3') {
        this.$message.warning('抱歉，该宝贝已下架！')
        return false
      }
      if (this.count === 0) {
        this.$message.warning('抱歉，暂时无库存！')
        return false
      }
      if (this.$store.state.products.products.status === '3' || this.count === 0) {
        return false
      } else {
        const params = {
          module: 'app_pc',
          action: 'product',
          m: 'immediately_cart',
          access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTUwMTM4NDQsImV4cCI6MTYxNTA1NzA0NCwianRpIjoiMGI0N2UzN2UwZGYyZjdmYTdlMDYzODU0NDNmYjE2OWQifQ.R0su61vqB8SaFICIAv7gNL5-Z0iGM1T9Edp090-NuQg',
          product: JSON.stringify([
            { pid: this.$store.state.products.products.id },
            { cid: this.findCid() },
            { num: this.$refs.inputTag.value }
          ]),
          language: null
        }
        api.buyNow(params).then(res => {
          if (res.status === 200) {
            if (localStorage.getItem('username')) {
              this.$message.success('恭喜您，抢购成功！')
            } else {
              this.$store.commit('ChangeLoginComponent', 'LoginContainer')
              this.$message.error('请先登录！')
              this.$router.push('/login')
            }
          }
        })
      }
    },
    addToShopCart () {
      const params = {
        module: 'app_pc',
        action: 'product',
        m: 'add_cart',
        access_id: localStorage.getItem('token'),
        pro_id: this.$store.state.products.products.id,
        num: this.$refs.inputTag.value,
        attribute_id: this.findCid(),
        language: null
      }
      if (this.$store.state.products.products.status === '3') {
        this.$message.warning('抱歉，该宝贝已下架！')
        return false
      }
      if (this.count === 0) {
        this.$message.warning('抱歉，暂时无库存！')
        return false
      }
      if (this.$store.state.products.products.status === '3' || this.count === 0) {
        return false
      } else {
        api.addToShopCart(params).then(res => {
          if (res.status === 200) {
            if (localStorage.getItem('username')) {
              Event.$emit('getCatsNumber')
              this.$message.success('成功加入购物车！')
            } else {
              this.$message.error('请登录')
              this.$router.push('/login')
            }
          }
        })
      }
    },
    all () {
      const type = 0
      this.getcomments(type)
    },
    handleHasImg () {
      const type = 1
      this.getcomments(type)
    },
    handleHasZhuiPing () {
      const type = 2
      this.getcomments(type)
    },
    handleClickImages (items) {
      // this.imgurl = items.url
      this.imgurl = 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1604977168293.png'
      this.commentvisible = !this.commentvisible
    },
    scrollHandle () {
      const tabNode = document.getElementsByClassName('ant-tabs-nav-container')
      var obj = tabNode[1]
      var t = 0
      while (obj) {
        t = t + obj.offsetTop
        obj = obj.offsetParent
      }
      var a = parseInt(document.documentElement.scrollTop)
      var p = parseInt(t - a)
      // console.log(t, a, p)
      if (tabNode[1]) {
        if (p < -1) {
          tabNode[1].style.position = 'fixed'
          tabNode[1].style.top = '0'
        }
        if (a < 938) {
          tabNode[1].style.position = 'unset'
        }
      }
    },
    handleRecommendations (item) {
      this.isToTop = !this.isToTop
      this.$store.commit('sendProductDetails', { products: item, title: '相关推荐' })
      this.getProductsDetail()
      this.scrolltotop()
    },
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
    handleClickColor (item, itemPa, index, indexPa) {
      const skuBeanList = this.skuBeanList
      const clickItem = skuBeanList.find((items) => {
        return items.name.includes(item.attributeValue)
      })
      if (itemPa.attrName !== '尺码') {
        this.largeImg = clickItem.imgurl
      }
      const target = window.event.currentTarget
      const siblingElements = target.parentNode.childNodes
      siblingElements.forEach(item => {
        item.style.border = '1px solid #DCDFE6'
        item.style.color = '#000000A6'
      })
      // this.isDefault = false
      target.style.border = '1px solid #D3272D'
      target.style.color = '#d3272d'
      // console.log('index=', index, 'indexPa=', indexPa, item, itemPa)
      itemPa.attr.forEach(it => {
        if (item.attributeValue === it.attributeValue) {
          item.select = true
        } else {
          it.select = false
        }
      })
      console.log(this.attrList)
      this.colorIndex = index
      this.colorIndexPa = indexPa
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
        this.name = res.data.data.pro.name
        this.price = res.data.data.pro.price
        this.content = res.data.data.pro.content
        // console.log('lala', this.pro.name)
        this.attrList = res.data.data.attrList
        const imgData = res.data.data.skuBeanList
        this.skuBeanList = imgData
        this.largeImg = imgData[0].imgurl
        this.count = parseInt(imgData[0].count)
        if (this.count > 0) {
          this.num = 1
        } else {
          this.num = 0
        }
        this.couponStr = parseInt(res.data.data.coupon_str[0])
        this.proImgArr = res.data.data.pro.img_arr
        this.commenttotal = res.data.data.comments_num
        this.comments = '商品评价（' + res.data.data.comments_num + '）'
        this.shoplistLogo = res.data.data.shop_list.shop_logo
        this.relatedRecommendations = res.data.data.related_recommendations
        for (let i = 0; i < this.attrList.length; i++) {
          for (let j = 0; j < this.attrList[i].attr.length; j++) {
            this.attrList[i].attr[0].select = true
          }
        }
        console.log(this.attrList)
      })
    },
    getCoupon () {
      // console.log(this.$store.state.products.products.id)
      const params = {
        module: 'app_pc',
        action: 'coupon',
        m: 'pro_coupon',
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I',
        pro_id: this.$store.state.products.products.id,
        language: null
      }
      api.getCoupon(params).then(res => {
        //
        const couponList = res.data.list
        this.couponList = couponList
        this.visible = !this.visible
      })
    },
    getcomments (type) {
      const params = {
        module: 'app_pc',
        action: 'product',
        m: 'getcomment',
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzMzc0MTAsImV4cCI6MTYxMjM4MDYxMCwianRpIjoiY2NjZDg2MmIxY2QzZDEyM2NiY2RkMGY0MDI2NWQ5NTQifQ.Okmp89OJPGtfjPGntbnEnhvCPe10OWT-PFhLyPkN31I',
        pid: this.$store.state.products.products.id,
        type: type,
        language: null
      }
      api.getcomment(params).then(res => {
        // this.commentstotal = '商品评价（' + res.data.data.comments_total + '）'
        this.comments = '商品评价（' + res.data.data.comments_total + '）'
        this.commenttotal = res.data.data.comments_total
        this.commentImg = res.data.data.comments_image
        this.commentZhui = res.data.data.comments_zhui
        const List = res.data.data.list
        const listLength = List.length
        for (let j = 0; j < listLength; j++) {
          const CommentTypeLength = parseInt(List[j].CommentType)
          const arr = []
          for (let i = 0; i < CommentTypeLength; i++) {
            arr.push(i)
          }
          List[j].CommentTypeArr = arr
        }
        this.commentlist = List
      })
    },
    getcomment (activeKey) {
      if (activeKey === '2') {
        const type = 0
        this.getcomments(type)
      }
    },
    handleClickComment () {
      const ev = window.event
      const target = ev.target || ev.srcElement
      if (target.nodeName === 'SPAN') {
        const childs = target.parentNode.childNodes
        childs.forEach(item => {
          item.style.border = '1px solid rgba(221,221,221,1)'
          item.style.color = '#010101'
          item.style.fontWeight = 'normal'
        })
        target.style.border = '1px solid #D3272D'
        target.style.color = '#D3272D'
      }
    },
    toHome () {
      this.$store.commit('toHome', 'HomeList')
    }
  }
}
</script>

<style scoped lang="scss">
  ::v-deep img {
    max-width: 100% !important;
  }
  ::v-deep .ant-tabs-nav .ant-tabs-tab-active {
    font-weight: bold;
    font-size: 16px;
  }
  ::v-deep .ant-tabs-nav-container  {
    width: 900px;
    background-color: #eaeaea;
    z-index: 999;
  }
  ::v-deep .ant-modal-content {
      width: 100%!important;
      background: none;
      box-shadow: none;
    }
  ::v-deep .ant-modal-close-x {
    font-size: 24px;
  }
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
      min-height: 580px;
      position: relative;
      .left-images {
        position: absolute;
        width: 490px;
        height: 100%;
        left: 0;
        /*background-color: #ff8144;*/
        .large-img {
          width: 100% ;
          height: 490px;
          border: 1px solid #e4e4e4;
          /*position: absolute;*/
          /*overflow: hidden;*/
          /*background-color: #ff4a45;*/
          img {
            width: 100%;
            height: 100%;
          }
          .coverContent {
            font-size: 18px;
            color: #ffffff;
            line-height: 250px;
            text-align: center;
            position: absolute;
            width: 250px;
            height: 250px;
            top: -70px;
            bottom: 0;
            left: 0;
            right: 0;
            display: block;
            margin: auto;
            border-radius: 200px;
            background-color: rgba(0, 0, 0, 0.4);
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
        /*overflow-y: scroll;*/
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
          .coupon-str-box {
            display: inline-block;
            width: 32px;
            height: 22px;
            position: relative;
            cursor: pointer;
            .get-coupon {
              margin-right: 32px;
              float: left;
            }
            .coupon-str {
              position: absolute;
              font-size: 14px!important;
              line-height: 14px!important;
              font-weight: normal!important;
              top: 8px;
              left: 7px;
              z-index: 80;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            position: relative;
            &:nth-child(1) {
              margin-bottom: 10px;
            }
            &:nth-child(2) {
              height: 25px;
              line-height: 25px;
            }
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
        .attrList-list {
          width: 100%;
          margin-bottom: 10px;
          /*height: 50px;*/
          /*line-height: 50px;*/
          /*background-color: #42ffba;*/
          .attrName {
            /*margin-right: 55px;*/
            display: inline-block;
            float: left;
            height: 100%;
            width: 70px;
          }
          .attrList {
            display: inline-block;
            width: calc(100% - 70px);
            height: 100%;
            .stockClass {
              color: #DCDFE6;
              border: 1px solid #DCDFE6!important;
              cursor: not-allowed!important;
            }
            span {
              margin-bottom: 10px;
            }
          }
          .color-item {
            display: inline-block;
            /*min-width: 56px;*/
            padding: 0 10px;
            height: 32px;
            margin-right: 10px;
            border: 1px solid #DCDFE6;
            text-align: center;
            line-height: 32px;
            cursor: pointer;
          }
          .color-item:hover {
            border: 1px solid #D3272D!important;
          }
          .colorItemDefault {
            box-sizing: border-box!important;
            border: 1px solid #D3272D;
            color: #d3272d;
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
            margin-left: 42px;
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
          margin-top: 10px;
          background-color: #e4e4e4;
        }
        .end {
          width: 100%;
          height: 50px;
          margin-top: 20px;
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
          .offShelfBuy {
            cursor: not-allowed;
          }
          .addToCart {
            height: 100%;
            width: 168px;
            font-weight: bold;
            background-color: #D4282D;
            border: none;
          }
          .offShelf {
            background-color: rgba(255, 20, 42, 0.64) !important;
            cursor: not-allowed!important;
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
            text-align: center;
            font-size: 18px;
            margin-left: 60px;
            cursor: pointer;
            &:hover {
             color: #1cb637;
            }
          }
          span:nth-child(3) {
            display: inline-block;
            text-align: center;
            font-size: 20px;
            margin-left: 15px;
            cursor: pointer;
            &:hover {
             color: #1cb637;
            }
          }
        }
      }
    }
  }
  .product-details {
    width: 100%;
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    /*background-color: #ffcf94;*/
    ::v-deep .product-details-left {
      width: 900px;
      /*float: left;*/
      .product-container{
        width: 100%;
        padding: 15px 0;
        img {
          width: 100%;
        }
      }
      .product-review {
        width: 100%;
        padding: 15px 0;
        span {
          display: inline-block;
          margin-right: 10px;
          padding: 0 10px;
          height: 28px;
          line-height: 27px;
          border: 1px solid rgba(221,221,221,1);
          border-radius: 2px;
          box-sizing: border-box;
          font-size: 14px;
          color: #010101;
          cursor: pointer;
          &:nth-child(1) {
            font-weight: bold;
            color: #D3272D;
            border-color: #D3272D;
          }
        }
      }
      .comment-list {
        width: 100%;
        min-height: 160px;
        padding: 15px 0 35px 0;
        /*display: flex;*/
        /*align-items: center;*/
        border-bottom: 1px solid #d9d9d9;
        /*background-color: #ffc9d0;*/
        .username {
          width: 130px;
          height: 100%;
          display: inline-block;
          position: absolute;
          /*background-color: #ff56f3;*/
          img {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 0;
          }
          span {
            position: absolute;
            top: 7px;
            left: 31px;
            display: inline-block;
            font-size: 12px;
            height: 30px;
            /*line-height: 8px;*/
            color: #666666;
            margin-left: 9px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .comment-msg {
          display: inline-block;
          width: calc(100% - 130px);
          height: 100%;
          margin-left: 130px;
          /*background-color: #2991ff;*/
         .comment-images {
            cursor: pointer;
            img {
              width: 80px;
            }
          }
          .comment-type-img {
            margin-right: 5px;
          }
          .comment-content {
            margin-top: 15px;
            font-size: 14px;
            color: #020202;
          }
          .comment-time {
            font-size: 12px;
            color: #999999;
            line-height: 12px;
            margin: 20px 0;
            span {
              margin-right: 10px;
            }
          }
        }
      }
      .pagination {
        width: 100%;
        text-align: center;
        margin-top: 35px;
      }
    }
    .product-details-right {
      width: calc(100% - 920px);
      /*background-color: #ffb3c9;*/
      .shop-list {
        width: 350px;
        height: 120px;
        padding: 10px 20px;
        background-color: rgba(255, 227, 255, 0.8);
        ul {
          width: 100%;
          height: 36px;
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          li {
            width: 33%;
            height: 100%;
            line-height: 100%;
            text-align: center;
            display: inline-block;
            border-right: 1px solid #bfbfbf;
            h2 {
              margin-bottom: 10px;
              font-size: 16px;
              color: #010101;
              font-weight: bold;
            }
            /*background-color: #ffe125;*/
            &:last-child {
              border: none;
            }
          }
        }
        .nav-item {
          width: 100%;
          height: 30px;
          font-size: 16px;
          color: #020202;
          line-height: 30px;
          /*background-color: #ff0e4b;*/
          img {
            width: 29px;
            height: 29px;
            margin-right: 10px;
          }
          .to-shop-btn {
            float: right;
            color: #D4282D;
            border: 1px solid #D4282D;
            margin-right: 10px;
            &:hover {
              border: 1px solid #ff7175;
            }
          }
        }
      }
      .related-recommendations {
        width: 100%;
        /*height: 500px;*/
        margin-top: 23px;
        padding: 5px 23px 10px 23px;
        border: 1px solid #dedede;
        .nav-title {
          width: 100%;
          height: 70px;
          /*background-color: #d9ffa1;*/
          display: flex;
          margin-bottom: 15px;
          justify-content: space-between;
          align-items: center;
          span {
            display: inline-block;
            &:nth-child(2) {
              color: #010101;
              font-weight: bold;
              font-size: 20px;
              line-height: 20px;
              padding: 25px 0;
              text-align: center;
            }
            &:nth-child(1) {
              width: 62px;
              height: 1px;
              background-color: #dedede;
            }
            &:nth-child(3) {
              width: 62px;
              height: 1px;
              background-color: #dedede;
            }
          }
        }
        .recommendations-list {
          width: 100%;
          cursor: pointer;
          img {
            width: 100%;
          }
          .recommendations-msg {
            padding: 15px 15px 20px 15px;
            width: 100%;
            /*height: 80px;*/
            /*background-color: #ffe095;*/
            text-align: center;
            h1 {
              font-size: 14px;
              line-height: 14px;
              font-weight: bold;
              color: #020202;
              width: 85%;
              margin: 20px auto 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p {
              font-size: 14px;
              color: #D4282D;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

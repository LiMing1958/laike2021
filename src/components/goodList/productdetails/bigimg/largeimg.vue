<template>
  <div ref="box" class="box1" id="box1" @mousemove="handlemousemove()" @mouseenter="handlemouseenter" @mouseleave="handlemouseleave">
    <div class="small" id = "small">
      <img :src="imgurl" width="100%" height="100%" alt="">
      <div ref="mas" class="mask" id="mas" v-show="isMask"></div>
    </div>
    <div class="big" id="bi" v-show="isBi" ref="bi">
      <div class="big-img" ref="bigimg">
        <img :src="imgurl" alt="" id="bigImage" ref="bigImage">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'largeimg',
  props: ['imgurl'],
  data () {
    return {
      isMask: false,
      isBi: false
    }
  },
  mounted () {
  },
  methods: {
    handlemouseenter () {
      this.isMask = !this.isMask
      this.isBi = !this.isBi
    },
    handlemouseleave () {
      this.isMask = !this.isMask
      this.isBi = !this.isBi
    },
    handlemousemove () {
      const e = window.event
      var obj = this.$refs.box
      var t = 0
      var l = 0
      while (obj) {
        t = t + obj.offsetTop
        l += obj.offsetLeft
        obj = obj.offsetParent
        //  1. offsetParent定义：那么offsetParent就是距离该子元素最近的进行过定位的父元素（position：absolute  relative fixed），如果其父元素中不存在定位则offsetParent为：body元     素
        //  2. 根据定义分别存在以下几种情况
        // 【1】元素自身有fixed定位，父元素不存在定位，则offsetParent的结果为null（firefox中为：body，其他浏览器返回为null）
        // 【2】元素自身无fixed定位，且父元素也不存在定位，offsetParent为<body>元素
        // 【3】元素自身无fixed定位，且父元素存在定位，offsetParent为离自身最近且经过定位的父元素
        // 【4】<body>元素的offsetParent是null
      }
      var maskX = e.pageX - l
      var maskY = e.pageY - t
      maskX = maskX - this.$refs.mas.offsetWidth / 2
      maskY = maskY - this.$refs.mas.offsetHeight / 2
      this.$refs.mas.style.left = maskX + 'px'
      this.$refs.mas.style.top = maskY + 'px'
      // 把mask限制在box1中
      // 1、最小移动距离
      maskX = maskX < 0 ? 0 : maskX
      maskY = maskY < 0 ? 0 : maskY
      // // 1、最大移动距离
      maskX = maskX > this.$refs.box.offsetWidth - this.$refs.mas.offsetWidth ? this.$refs.box.offsetWidth - this.$refs.mas.offsetWidth : maskX
      maskY = maskY > this.$refs.box.offsetHeight - this.$refs.mas.offsetHeight ? this.$refs.box.offsetHeight - this.$refs.mas.offsetHeight : maskY
      // console.log('终' + maskX, maskY)
      this.$refs.mas.style.left = maskX + 'px'
      this.$refs.mas.style.top = maskY + 'px'
      // 3、当mask移动的时侯，让大图片big移动
      // 公式：mask的移动距离 / mask的最大移动距离 = 大图的移动距离 / 大图最大的移动距离
      // mask 最大移动距离
      var maskMax = this.$refs.box.offsetWidth - this.$refs.mas.offsetWidth
      // 定义大图最大的移动距离
      var bigImageMax = this.$refs.bigimg.offsetWidth - this.$refs.bi.offsetWidth
      // 算出大图的移动距离
      var bigImageX = maskX * bigImageMax / maskMax
      var bigImageY = maskY * bigImageMax / maskMax
      // 设置 position 偏移量
      this.$refs.bigimg.style.left = -bigImageX + 'px'
      this.$refs.bigimg.style.top = -bigImageY + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
  .box1 {
    width: 100%;
    height: 488px;
    /*border: 1px solid #ccc;*/
    /*position: relative;*/
    .small {
      height: 488px;
      position: relative;
      overflow: hidden;
      .mask {
        width: 200px;
        height: 200px;
        background: rgba(191, 191, 191, 0.4);
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(90deg, rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%),linear-gradient(rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
        background-size: 6px 6px;
        cursor: move;
      }
    }
    .big {
      width: 488px;
      height: 490px;
      position: absolute;
      padding: 10px;
      top: 0;
      left: 500px;
      /*background-color: #afff6c;*/
      border: 1px solid #ccc;
      overflow: hidden;
      z-index: 1000;
      .big-img {
        width: 1200px;
        height: 1200px;
        position: absolute;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>

<template>
  <div id="slider">
    <!-- img-container -->
    <div
      class="slider-imgcontainer"
      ref="container"
    >
      <img v-for="(img, index) in banner" :src="img.image" alt="index" :key="index">
    </div>
    <!-- index -->
    <div class="slider-buttons">
      <span v-for="(button,index) in banner"
            class="slider-imgindex"
            :key="index"
            :class="{ 'slider-imgindex-active': currentIndex === index }"
            @mouseover="doTheAnimate(index)"
            @mouseout="autoAnimate"
      ></span>
    </div>
    <!-- left right button -->
    <div class="slider-move">
      <span class="to-left" @click="doTheAnimate('left')"><i class="iconfont">&#xe637;</i></span>
      <span class="to-right" @click="doTheAnimate('right')"><i class="iconfont">&#xe70a;</i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderIndex',
  props: ['banner'],
  data () {
    return {
      currentIndex: 0,
      buttons: [0, 1, 2, 3, 4],
      timer: null
    }
  },
  methods: {
    move () {
      const left = `-${this.currentIndex * 100}%`
      this.$refs.container.style.left = left
    },
    doTheAnimate (arg) {
      console.log(this.banner.length)
      clearInterval(this.timer)
      this.timer = null
      // 鼠标悬停
      if (typeof (arg) === 'number') {
        this.currentIndex = arg
        // 鼠标点击
      } else if (typeof (arg) === 'string') {
        if (arg && arg === 'left' && this.currentIndex <= this.banner.length) {
          this.currentIndex++
        } else if (arg && arg === 'right' && this.currentIndex >= 1) {
          this.currentIndex--
        }
        if (!this.timer) {
          this.autoAnimate()
        }
      }
      this.move()
    },
    autoAnimate () {
      this.timer = setInterval(() => {
        if (this.currentIndex === 4) {
          this.currentIndex = 0
        } else {
          this.currentIndex++
        }
        this.move()
      }, 4000)
    }
  },
  mounted () {
    this.autoAnimate()
  }
}
</script>

<style scoped lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 847125 */
    src: url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.eot');
    src: url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.woff') format('woff'),
    url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_847125_qhbkbwtxr2.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family:"iconfont";
    font-size:16px;
    font-style:normal;
  }
  #slider{
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 45.25vh;
  }
  .slider-imgcontainer {
    position: absolute;
    left: 0;
    width: 500%;
    height: 300px;
    transition: left .5s linear;
  }
  img {
    width: 20%;
    height: 45.25vh;
  }
  .slider-buttons {
    position: absolute;
    width: 30%;
    left: 35%;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .slider-imgindex {
    cursor: pointer;
    width: 14px;
    height: 14px;
    margin: 0 10px;
    background-color: rgba(255, 248, 248, 0.98);
    border-radius: 7px;
    transition: width .3s linear;
  }
  .slider-imgindex-active {
    width: 60px;
  }
  .slider-move {
    position: absolute;
    top: 40%;
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .to-left {
    margin-left: 10%;
  }
  .to-right {
    margin-right: 10%;
  }
  .slider-move span {
    cursor: pointer;
    text-align: center;
    color: #fff;
    line-height: 60px;
    width: 50px;
    background-color: rgba(8,1,1,0.62);
  }
  .slider-move span:hover{
    background-color: rgba(8,1,1,0.9);
  }
</style>

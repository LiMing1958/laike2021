<template>
  <div class="time-Box">
    <span>{{hour? hourString: '00'}}</span>
    <span>：</span>
    <span>{{minute ? minuteString : '00'}}</span>
    <span>：</span>
    <span>{{second ? secondString : '00'}}</span>
  </div>
</template>

<script>
export default {
  name: 'timer',
  data () {
    return {
      hour: '',
      minute: '',
      second: '',
      promiseTimer: ''
    }
  },
  props: ['timer'],
  mounted () {
    if (this.timer > 0) {
      this.hour = Math.floor((this.timer / 3600) % 24)
      this.minute = Math.floor((this.timer / 60) % 60)
      this.second = Math.floor(this.timer % 60)
      this.countDowm()
    }
  },
  methods: {
    countDowm () {
      var self = this
      clearInterval(this.promiseTimer)
      this.promiseTimer = setInterval(function () {
        if (self.hour === 0) {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59
            self.minute -= 1
          } else if (self.minute === 0 && self.second === 0) {
            self.second = 0
            self.$emit('countDowmEnd', true)
            clearInterval(self.promiseTimer)
          } else {
            self.second -= 1
          }
        } else {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59
            self.minute -= 1
          } else if (self.minute === 0 && self.second === 0) {
            self.hour -= 1
            self.minute = 59
            self.second = 59
          } else {
            self.second -= 1
          }
        }
      }, 1000)
    },
    formatNum (num) {
      return num < 10 ? '0' + num : '' + num
    }
  },
  computed: {
    hourString () {
      return this.formatNum(this.hour)
    },
    minuteString () {
      return this.formatNum(this.minute)
    },
    secondString () {
      return this.formatNum(this.second)
    }
  }
}
</script>
<style scoped lang="scss">
.time-Box {
  span {
    color: #ffffff;
    font-size: 18px;
    line-height: 32px;
    margin-right: 5px;
    &:nth-child(1) {
      display: inline-block;
      width: 32px;
      height: 32px;
      text-align: center;
      /*line-height: 32;*/
      background-color: rgba(112, 92, 71);
    }
    &:nth-child(2) {
      font-size: 20px;
      /*font-weight: inherit;*/
      color: rgb(112, 92, 71);
    }
    &:nth-child(3) {
      text-align: center;
      /*line-height: 32;*/
      display: inline-block;
      width: 32px;
      height: 32px;
      background-color: rgba(112, 92, 71);
    }
    &:nth-child(4) {
      font-size: 20px;
      color: rgb(112, 92, 71);
    }
    &:nth-child(5) {
      display: inline-block;
      width: 32px;
      height: 32px;
      text-align: center;
      /*line-height: 32;*/
      background-color: rgb(112, 92, 71);
    }
  }
}
</style>

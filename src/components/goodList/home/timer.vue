<template>
  <div class="time-Box">
    <span v-if="hour" class="has-hourStr">
      <span v-for="item in hourString" :key="item">{{item}}</span>
    </span>
    <span v-else class="no-hourStr">
      <span>0</span>
      <span>0</span>
    </span>
    <span class="count">：</span>
    <span v-if="minute" class="has-minuteStr">
      <span v-for="item in minuteString" :key="item">{{item}}</span>
    </span>
    <span v-else class="no-minuteStr">
      <span>0</span>
      <span>0</span>
    </span>
    <span class="count">：</span>
    <span v-if="hour" class="has-secondStr">
      <span v-for="item in hourString" :key="item">{{item}}</span>
    </span>
    <span v-else class="no-secondStr">
      <span>0</span>
      <span>0</span>
    </span>
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
      return [...new Set(this.formatNum(this.hour))]
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
  .count {
    font-size: 24px;
    font-weight: 400;
    color: #333333;
  }
  .no-hourStr {
    span {
      background-color: #333333;
      font-size: 24px;
      color: #ffffff;
      padding: 2.5px 9.329px;
      margin: 0 4px;
      border-radius: 2px;
    }
  }
  .no-minuteStr {
    span {
      background-color: #333333;
      font-size: 24px;
      color: #ffffff;
      padding: 2.5px 9.329px;
      margin: 0 4px;
      border-radius: 2px;
    }
  }
  .no-secondStr {
    span {
      background-color: #333333;
      font-size: 24px;
      color: #ffffff;
      padding: 2.5px 9.329px;
      margin: 0 4px;
      border-radius: 2px;
    }
  }
}
</style>

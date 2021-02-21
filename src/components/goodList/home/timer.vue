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
    <span v-if="second" class="has-secondStr">
      <span v-for="item in secondString" :key="item">{{item}}</span>
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
      promiseTimer: '',
      timer: this.$store.state.secondTime
    }
  },
  mounted () {
    if (this.ramaintime > 0) {
      this.hour = Math.floor((this.ramaintime / 3600) % 24)
      this.minute = Math.floor((this.ramaintime / 60) % 60)
      this.second = Math.floor(this.ramaintime % 60)
      this.countDowm()
    }
  },
  methods: {
    countDowm () {
      const self = this
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
    ramaintime: function () {
      console.log(this.timer.current_time[0].endtime)
      const endTime = this.timer.current_time[0].endtime
      // const startTime = this.secondsList.current_time[0].starttime
      const endTimeArr = endTime.split(':')
      // const startTimeArr = startTime.split(':')
      var endtime = parseInt(endTimeArr[0]) * 3600 + parseInt(endTimeArr[1]) * 60 + parseInt(endTimeArr[2])
      // var starttime = parseInt(startTimeArr[0]) * 3600 + parseInt(startTimeArr[1]) * 60 + parseInt(startTimeArr[2])
      const curDate = new Date()
      var curHour = curDate.getHours()
      var curMinute = curDate.getMinutes()
      var curSec = curDate.getSeconds()
      var starttime = curHour * 3600 + curMinute * 60 + curSec
      return endtime - starttime - 1.0
    },
    hourString () {
      return this.formatNum(this.hour).split('') // 此处不能用es6 的 [...new Set(str)] ,会被去重
    },
    minuteString () {
      return this.formatNum(this.minute).split('') // 此处不能用es6 的 [...new Set(str)] ,会被去重
    },
    secondString () {
      return this.formatNum(this.second).split('') // 此处不能用es6 的 [...new Set(str)] ,会被去重
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
  .has-hourStr {
    span {
      background-color: #333333;
      font-size: 24px;
      color: #ffffff;
      padding: 2.5px 9.329px;
      margin: 0 4px;
      border-radius: 2px;
    }
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
  .has-minuteStr {
    span {
      background-color: #333333;
      font-size: 24px;
      color: #ffffff;
      padding: 2.5px 9.329px;
      margin: 0 4px;
      border-radius: 2px;
    }
  }
  .has-secondStr {
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

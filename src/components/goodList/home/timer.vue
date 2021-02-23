<template>
  <div class="time-Box">
    <span v-if="hour" class="has-hourStr">
      <span v-for="(item, index) in hourString" :key="index" >{{item}}</span>
    </span>
    <span v-else class="no-hourStr">
      <span>0</span>
      <span>0</span>
    </span>
    <span class="count">：</span>
    <span v-if="minute" class="has-minuteStr">
      <span v-for="(item, index) in minuteString" :key="index">{{item}}</span>
    </span>
    <span v-else class="no-minuteStr">
      <span>0</span>
      <span>0</span>
    </span>
    <span class="count">：</span>
    <span v-if="second" class="has-secondStr">
      <span v-for="(item, index) in secondString" :key="index">{{item}}</span>
    </span>
    <span v-else class="no-secondStr">
      <span>0</span>
      <span>0</span>
    </span>
  </div>
</template>

<script>
// import Event from '../../../assets/js/event'
export default {
  name: 'timer',
  props: ['hour', 'minute', 'second', 'hourString', 'minuteString', 'secondString'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
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

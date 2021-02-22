<template>
  <div class="time-Box">
    <span class="no-hourStr">
      <span>0</span>
      <span>0</span>
    </span>
    <span class="count">：</span>
    <span class="no-minuteStr">
      <span>0</span>
      <span>0</span>
    </span>
    <span class="count">：</span>
    <span class="no-secondStr">
      <span>0</span>
      <span>0</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'overtime',
  data () {
    return {
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

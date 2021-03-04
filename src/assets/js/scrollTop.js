export default function scr () {
  let timerId = null
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
  timerId = setInterval(function () {
    // 步进，每次移动的距离
    var step = 50
    // 目标位置
    var target = 0
    // 获取当前位置
    var current = document.documentElement.scrollTop
    alert(current)
    // 判断当前位置大于目标位置时，将步进变成负值
    if (current > target) {
      step = -Math.abs(step)
    }
    if (Math.abs(current - target) <= Math.abs(step)) {
      clearInterval(timerId)
      document.body.scrollTop = target
      document.documentElement.scrollTop = target
    } else {
      current += step
      document.body.scrollTop = current
      document.documentElement.scrollTop = current
    }
  }, 5)
}

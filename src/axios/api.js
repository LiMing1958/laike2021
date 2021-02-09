import service from './request'
export const getPersonInfo = data => {
  return service({
    url: '/index.php',
    method: 'post',
    data
  })
}

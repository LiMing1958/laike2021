<template>
  <div class="navList">
    <a-tabs default-active-key="1" v-model = "$store.state.activeKey" @change="callback">
      <a-tab-pane v-for = "item in navList" :key="item.id">
        <div slot="tab" @click="toHome">
          <p>
            {{item.pname}}
          </p>
          <p>
            {{item.english_name}}
          </p>
        </div>
        <div class="tabContain">
          <home v-if="item.id === 0" @getcartsNumber="getNavList"></home>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import api from '../../api/api'
import home from '../goodList/goodList'
export default {
  name: 'navList',
  data () {
    return {
      navList: null,
      images: null
    }
  },
  components: {
    home
  },
  created () {

  },
  mounted () {
    this.getNavList()
  },
  methods: {
    callback () {
      console.log(this.activeKey)
    },
    getNavList () {
      const params = {
        module: 'app_pc',
        action: 'index',
        m: 'index',
        access_id: localStorage.getItem('token'),
        language: null
      }
      api.postFormAPI(params).then(res => {
        if (res.status === 200) {
          // 数据处理
          const cartList = res.data.data
          this.$store.commit('getCartList', cartList)
          const title_ = {
            cid: '2',
            english_name: 'HOME',
            pname: '首页'
          }
          const listData = res.data.data.class_list.splice(0, 7)
          listData.unshift(title_)
          for (let i = 0; i < listData.length; i++) {
            listData[i].id = i
          }
          this.navList = listData
          // console.log(this.navList)
        }
      }).catch(err => console.log(err))
    },
    toHome () {
      this.$store.commit('toHome', 'HomeList')
    }
  }
}
</script>
<style scoped lang="scss">
  .navList {
    max-width: 100%;
    min-width: 660px;
    margin: 0 auto;
    margin-top: 35px;
    .tabContain {
      width: 100%!important;
      min-height: calc( 100vh - 580px );
      padding: -20px 0px 0px 0px!important;
    }
    /*.tab-p {*/
      p {
        text-align: center;
        &:nth-child(1) {
          font-size: 16px;
          font-weight: bold;
          line-height: 16px;
          margin-bottom: 1px;
          /*color: #020202;*/
        }
      }
    /*}*/

  }
</style>

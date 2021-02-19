<template>
  <div class="navList">
    <a-tabs default-active-key="1" :size="small">
      <a-tab-pane v-for = "item in navList" :key="item.id">
<!--        <div class="tab-p" >-->
          <p slot="tab">
            {{item.pname}}
          </p>
          <p slot="tab">
            {{item.english_name}}
          </p>
<!--        </div>-->
        <div class="tabContain">
          <goodList :itemId="item.id"></goodList>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import api from '../../api/api'
import goodList from '../goodList/goodList'
export default {
  name: 'navList',
  data () {
    return {
      navList: null,
      images: null
    }
  },
  components: {
    goodList
  },
  created () {

  },
  mounted () {
    this.getNavList()
  },
  methods: {
    getNavList () {
      const params = {
        module: 'app_pc',
        action: 'index',
        m: 'index',
        access_id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIyNjU5NjEsImV4cCI6MTYxMjMwOTE2MSwianRpIjoiMWUwYjcwMjMxZjJiNjJlYjg5ZGI4ZjFkNDllODYyZDEifQ.ggO9qA_Cm7sT9wqg_aHjIyyqFx--3btCrc_0Ssn3mpo'
      }
      api.postFormAPI(params).then(res => {
        if (res.status === 200) {
          // 数据处理
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
        }
      }).catch(err => console.log(err))
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
      /*height:100%!important;*/
      padding: -20px 0px 0px 0px!important;
      /*background-color: #ffd63e !important;*/
    }
    /*.tab-p {*/
      p {
        text-align: center;
        &:nth-child(1) {
          font-size: 16px;
          font-weight: bold;
          line-height: 16px;
          margin-bottom: 1px;
        }
      }
    /*}*/

  }
</style>

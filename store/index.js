import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    // nuxtServerInit在渲染页面之前执行
    async nuxtServerInit({
      commit
    }, {req, app}) {
      // 此时没有dom对象 但是有app的实例
      const { 
        status,
        data: {
          province,
          city
        }} = await app.$axios.get('/geo/getPosition')
        // 将获取到的数据提交到vuex里
      commit('geo/setPosition',status===200?{city,province}:{city:'',province:''})
        // 重命名status
      const {status:status2,data:{menu}}=await app.$axios.get('geo/menu')
      commit('home/setMenu',status2===200?menu:[])
      const {status:status3,data:{result}}=await app.$axios.get('/search/hotPlace',{
        params:{
          city: app.store.state.geo.position.city.replace('市','')
        }
      })
      commit('home/setHotPlace',status3===200?result:[])
    }
  }
})

export default store

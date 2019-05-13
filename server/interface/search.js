import Router from 'koa-router';
import axios from './utils/axios'
import Poi from '../dbs/models/poi'
import Yantai from '../dbs/models/yantai'
import sign from './utils/sign'

let router = new Router({prefix: '/search'})

router.get('/top', async (ctx) => {
  /* try {
    let top = await Poi.find({
      'name': new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  } */
  let {status, data: {
      top
    }} = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200
      ? top
      : []
  }
})

router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  try {
    let result = await Poi.find({
      city,
      type: ctx.query.type || '丽人'
    }).limit(10)
  //
    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
  //let city = ctx.store
    //? ctx.store.geo.position.city
    //: ctx.query.city
  //let {status, data: {
    //  result
    //}} = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    //params: {
     // sign,
     // city
    //}
  //})
  //ctx.body = {
    //result: status === 200? result: []
  //}
})

router.get('/resultsByKeywords', async (ctx) => {
  const {city, keyword} = ctx.query;
  let foodslist = ['甜点', '火锅', '拉面', '小吃快餐', '自助餐', "饮品"]
  if(city === '烟台'|| city === '烟台市'){
    let results= await Yantai.find({})
    if(keyword === '景点'||keyword === '旅游'){
      ctx.body = {
        code: 0,
        count: results[0].count,
        datas: results[0].pois
      }
    }else if(keyword === '美食'){
      ctx.body = {
        code: 0,
        count: results[0].count,
        datas: results[0].foods
      }
    }else if(keyword === '丽人'){
      ctx.body = {
        code: 0,
        count: results[0].count,
        datas: results[0].spas
      }
    }else if(keyword === '电影'){
      ctx.body = {
        code: 0,
        count: results[0].count,
        datas: results[0].cinemas
      }
    }else if(foodslist.includes(keyword)){
      let arr = results[0].foods.filter(item =>{
        return item.tag.includes(keyword)
      })
      ctx.body = {
        code: 0,
        count: results[0].count,
        datas: arr
      }
    }else{
      let alldata = results[0].pois.concat(results[0].foods, results[0].cinemas, results[0].spas)
      let res = alldata.filter( item => {
        return item.name === keyword
      })
      ctx.body = {
        code: 0,
        count: results[0].count,
        datas: res
      }
    }
  }else {
    let {
      status,
      data: {
        count,
        pois
      }
    } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
      params: {
        city,
        keyword,
        sign //第三方接口数据密钥
      }
    })
    ctx.body = {
      count: status === 200 ? count : 0,
      pois: status === 200
        ? pois
        : []
    }
  }
})

router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword || '旅游'
  console.log(keyword)
  // let city = ctx.query.city || '烟台'
  let results= await Yantai.find({})
  if(keyword){
    let alldata = results[0].pois.concat(results[0].foods, results[0].cinemas, results[0].spas)
    let arr = alldata.filter( item => {
      return item.name === keyword
    })
    ctx.body = {
      product: arr[0],
      more: ctx.isAuthenticated() ? arr: [],
      login: ctx.isAuthenticated()
    }
  }
  
  
  /* let {
    status,
    data: {
      product,
      more
    }
  } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city,
      sign
    }
  }) */
  /* if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more: [],
      login: ctx.isAuthenticated()
    }
  }else{
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more: [],
      login: ctx.isAuthenticated()
    }
  } */
})

export default router

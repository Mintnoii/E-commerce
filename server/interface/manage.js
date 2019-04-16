import Router from 'koa-router';
import axios from './utils/axios'
import Users from '../dbs/models/users'

let router = new Router({prefix: '/manage'})

router.get('/crumbs',async (ctx)=>{

  let {status,data:{areas,types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
    params:{
      city:ctx.query.city.replace('市','') || "北京",
      sign
    }
  })
  ctx.body={
    areas: status===200?areas:[],
    types: status===200?types:[]
  }
})

router.get('/users',async (ctx)=>{
  let users = await Users.find({})
  ctx.body = {
    code: 0,
    users
  }
})


export default router;

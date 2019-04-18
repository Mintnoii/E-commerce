import Router from 'koa-router';
import axios from './utils/axios'
import Users from '../dbs/models/users'
import Orders from '../dbs/models/users'

let router = new Router({prefix: '/manage'})

router.get('/users',async (ctx)=>{
  let users = await Users.find({identity: 'user'})
  ctx.body = {
    code: 0,
    users
  }
})

router.get('/orders',async (ctx)=>{
  let orders = await Orders.find().populate({path: 'user'})
  ctx.body = {
    code: 0,
    orders
  }
})


export default router;

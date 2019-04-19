import Router from 'koa-router';
import axios from './utils/axios'
import Users from '../dbs/models/users'
import Orders from '../dbs/models/order'

let router = new Router({prefix: '/manage'})

router.get('/users',async (ctx)=>{
  let users = await Users.find({role: 'user'})
  ctx.body = {
    code: 0,
    users
  }
})

router.get('/orders',async (ctx)=>{
  let orders = await Orders.aggregate([
    {
      $lookup:
        {
          from: "Users",
          localField: "user",
          foreignField: "_id",
          as: "order_user"
        }
    }
  ])
  ctx.body = {
    code: 0,
    orders
  }
})


export default router;

import Router from 'koa-router';
import axios from './utils/axios'
import Users from '../dbs/models/users'
import Yantai from '../dbs/models/yantai'
import Orders from '../dbs/models/order'
import { async } from 'q';

let router = new Router({prefix: '/manage'})

router.get('/users',async (ctx)=>{
  let users = await Users.find({role: 'user'})
  ctx.body = {
    code: 0,
    users
  }
})
router.get('/admins',async (ctx)=>{
  let admins = await Users.find({role: 'admin'})
  ctx.body = {
    code: 0,
    admins
  }
})
router.get('/shops',async (ctx)=>{
  let result = await Yantai.find({})
  ctx.body = {
    code: 0,
    count: result[0].count,
    shops: result[0].pois
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
router.post('/updateshop', async ctx =>{
  await Yantai.where({
    id: ctx.request.body.id
  }).update({
    name: ctx.request.body.name,
    cityname: ctx.request.body.city,
    address: ctx.request.body.address,
    tel: ctx.request.body.city.concat
  })
  ctx.body = {
    code: 0
  }
})
router.post('/addadmin', async (ctx) => {
  const {username, password, phone, email} = ctx.request.body
  // 调用查询并操作数据库
  let user = await Users.find({username})
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已添加过该管理员'
    }
    return
  }
  let nadmin = await Users.create({username, password, phone, email, role: 'admin'})
  if(nadmin){
    ctx.body = {
      code: 0,
      msg: '添加成功'
    }
  }
})
router.post('/deladmin', async ctx => {
  await Users.where({
    _id: ctx.request.body.id
  }).remove()
  ctx.body={
    code: 0,
    msg: '删除成功'
  }
})

export default router;

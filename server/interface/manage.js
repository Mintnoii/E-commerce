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
    shops: result[0].pois.concat(result[0].spas, result[0].cinemas, result[0].foods),
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
router.post('/addshop', async ctx =>{
  let name = ctx.request.body.name
  let cityname = ctx.request.body.city+'市'
  let tag = ctx.request.body.tag
  let address = ctx.request.body.address
  let photos = ctx.request.body.photos
  let tel = ctx.request.body.concat
  let cost = ctx.request.body.cost
  let type = ctx.request.body.type
  let date = ctx.request.body.date
  let desc = ctx.request.body.desc
  if(type === "风景名胜"){
    await Yantai.update({
      "_id" : "5cb15a963432b418431ba9e3"
    },{$push:{"pois":{
      $each: [{
        id: (Number(ctx.request.body.concat)+Math.random()).toString(36).substr(1).replace('.','').toUpperCase(),
        name,
        cityname,
        tag, 
        address,
        tel,
        biz_ext: {
          "rating": "4.5",
          "cost": cost
        },
        photos,
        type,
        date,
        desc
      }],
      $position: 0
    }}})
  }else if(type === "美食餐厅"){
    await Yantai.update({
      "_id" : "5cb15a963432b418431ba9e3"
    },{$push:{"foods":{
      $each: [{
        id: (Number(ctx.request.body.concat)+Math.random()).toString(36).substr(1).replace('.','').toUpperCase(),
        name,
        cityname,
        tag, 
        address,
        tel,
        biz_ext: {
          "rating": "4.5",
          "cost": cost
        },
        photos,
        type,
        date,
        desc
      }],
      $position: 0
    }}})
  }else if(type === "电影娱乐"){
    await Yantai.update({
      "_id" : "5cb15a963432b418431ba9e3"
    },{$push:{"cinemas":{
      $each: [{
        id: (Number(ctx.request.body.concat)+Math.random()).toString(36).substr(1).replace('.','').toUpperCase(),
        name,
        cityname,
        tag, 
        address,
        tel,
        biz_ext: {
          "rating": "4.5",
          "cost": cost
        },
        photos,
        type,
        date,
        desc
      }],
      $position: 0
    }}})
  }else if(type === "生活服务"){
    await Yantai.update({
      "_id" : "5cb15a963432b418431ba9e3"
    },{$push:{"spas":{
      $each: [{
        id: (Number(ctx.request.body.concat)+Math.random()).toString(36).substr(1).replace('.','').toUpperCase(),
        name,
        cityname,
        tag, 
        address,
        tel,
        photos,
        biz_ext: {
          "rating": "4.5",
          "cost": cost
        },
        type,
        date,
        desc
      }],
      $position: 0
    }}})
  }
  ctx.body = {
    code: 0
  }
})
router.post('/delshop', async ctx => {
  let type = ctx.request.body.type
  if(type === '风景名胜'){
    await Yantai.update({
      "_id" : "5cb15a963432b418431ba9e3"
    },{
      $pull:{
        "pois":{"id": ctx.request.body.id}
      }
    })
  }else if(type === '美食餐厅'){
    await Yantai.update({
      "_id" : "5cb15a963432b418431ba9e3"
    },{
      $pull:{
        "foods":{"id": ctx.request.body.id}
      }
    })
  }else if(type === '电影娱乐'){
    await Yantai.update({
      "_id" : "5cb15a963432b418431ba9e3"
    },{
      $pull:{
        "cinemas":{"id": ctx.request.body.id}
      }
    })
  }else if(type === '生活服务'){
    await Yantai.update({
      "_id" : "5cb15a963432b418431ba9e3"
    },{
      $pull:{
        "spas":{"id": ctx.request.body.id}
      }
    })
  }
  ctx.body={
    code: 0,
    msg: '删除成功'
  }
})
router.post('/updateshop', async ctx =>{
  let type = ctx.request.body.type
  if(type === '风景名胜'){
    await Yantai.update({
      "pois.id": ctx.request.body.id
    },{
      $set:{
        "pois.$.name": ctx.request.body.name,
        "pois.$.cityname": ctx.request.body.city,
        "pois.$.address": ctx.request.body.address,
        "pois.$.tel": ctx.request.body.concat
      }
    })
  }else if(type === "美食餐厅"){
    await Yantai.update({
      "foods.id": ctx.request.body.id
    },{
      $set:{
        "foods.$.name": ctx.request.body.name,
        "foods.$.cityname": ctx.request.body.city,
        "foods.$.address": ctx.request.body.address,
        "foods.$.tel": ctx.request.body.concat
      }
    })
  }else if(type === "电影娱乐"){
    await Yantai.update({
      "cinemas.id": ctx.request.body.id
    },{
      $set:{
        "cinemas.$.name": ctx.request.body.name,
        "cinemas.$.cityname": ctx.request.body.city,
        "cinemas.$.address": ctx.request.body.address,
        "cinemas.$.tel": ctx.request.body.concat
      }
    })
  }else if(type === "生活服务"){
    await Yantai.update({
      "spas.id": ctx.request.body.id
    },{
      $set:{
        "spas.$.name": ctx.request.body.name,
        "spas.$.cityname": ctx.request.body.city,
        "spas.$.address": ctx.request.body.address,
        "spas.$.tel": ctx.request.body.concat
      }
    })
  }
  
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

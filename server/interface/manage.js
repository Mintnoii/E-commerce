import Router from 'koa-router';
import axios from './utils/axios'
import Users from '../dbs/models/users'

let router = new Router({prefix: '/manage'})

router.get('/users',async (ctx)=>{
  let users = await Users.find({identity: 'user'})
  ctx.body = {
    code: 0,
    users
  }
})


export default router;

export default {
  // 连接mongodb数据库ecommerce
  dbs:'mongodb://127.0.0.1:27017/ecommerce',
  redis:{
    get host(){
      return '127.0.0.1'
    },
    get port(){
      return 6379
    }
  },
  // QQ邮箱smtp服务配置信息
  smtp:{
    get host(){
      return 'smtp.qq.com'
    },
    get user(){
      return 'sunburst.wang@qq.com'
    },
    get pass(){
      return 'ntrspxiyruqibhga'
    },
    // 随机生成字母与数字组合的四位验证码
    get code(){
      return ()=>{
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    // 设置验证码的过期时间
    get expire(){
      return ()=>{
        return new Date().getTime()+60*60*1000
      }
    }
  }
}

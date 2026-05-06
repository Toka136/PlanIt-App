// const redis =require("redis");
// const client=redis.createClient({
//   url:process.env.REDIS_URL
// })
// client.on("error",(err)=>console.log("redisError",err))
// const connectRedis=async()=>{
//     await client.connect()
// }
const { Redis } = require("@upstash/redis");
const client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})
module.exports={
    client,
}
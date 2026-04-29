const redis =require("redis");
const client=redis.createClient({
  url:process.env.REDIS_URL
})
client.on("error",(err)=>console.log("redisError",err))
const connectRedis=async()=>{
    await client.connect()
    console.log("redis connected")
}
module.exports={
    client,connectRedis
}
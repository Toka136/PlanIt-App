const { client } = require("../config/redis");

const deleteCache = async (userId) => {
  const pattern = `tasks:${userId}:*`;
  try{
    for await (const key of client.scanIterator({
        MATCH: pattern,
        COUNT: 100 
    })) {
        if (key ) {
        await client.del(key);
     }
    }  }catch(err){
        console.error("Error deleting cache:", err);
    }
};

module.exports = { deleteCache };
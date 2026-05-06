const { client } = require("../config/redis");

const deleteCache = async (userId) => {
  const pattern = `tasks:${userId}*`;
  const keys = await client.keys(pattern);
  if (keys.length === 0) {
    // console.log("No cache keys found for pattern:", pattern);
    return;
  }
  try{
        const response = await client.del(...keys);
        // console.log(`Deleted ${response} cache keys for pattern:`, pattern);
     }
    catch(err){
        console.error("Error deleting cache:", err);
    }
};

module.exports = { deleteCache };
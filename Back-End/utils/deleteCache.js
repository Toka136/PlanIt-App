const { client } = require("../config/redis");

const deleteCache = async (userId) => {
  const pattern = `tasks:${userId}:*`;
    for await (const key of client.scanIterator({
        MATCH: pattern,
        COUNT: 100 
    })) {
        await client.del(key);
        console.log(`Deleted: ${key}`);
    }
};

module.exports = { deleteCache };
const Redis = require("ioredis");
const redis = new Redis();

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err.message);
});

module.exports = redis;

const redis = require("redis")

const REDIS_PORT = process.env.REDIS_PORT || 6379

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
})

client.connect();

client.on('connect', () => {
    console.log("Connected to redis . . .")
})

client.on("error", (err) => {
    console.error(err)
})

client.on('ready', () => {
    console.log("Connected to redis and ready to use")
})

client.on('end', () => {
    console.log("Database ended")
})

module.exports = client
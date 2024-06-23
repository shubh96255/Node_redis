const express = require("express");

const app = express();
const redis = require("redis");

let redisClient;
(async () => {
    redisClient = redis.createClient();
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    await redisClient.connect();
})();

/* set data in to redis*/
app.get("/set_data", async (req,res) => {
    await redisClient.set("hello", JSON.stringify({data : "ok1"}));
    res.send("Data set successfully");
});
/* Get data from redis */
app.get("/get_data", async (req,res) => {
    const data1 =  await redisClient.get("hello");
    res.send({data : JSON.parse(data1)});
});
/* Delete data from redis */
app.get("/delete_data", async (req,res) => {
    const data1 =  await redisClient.del("hello");
    res.send("Data deleted successfully");
});
    

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
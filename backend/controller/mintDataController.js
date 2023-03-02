const redis = require("redis");
const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
  },
});

// establishing redis connection
client
  .on("connect", () => {
    console.log("redis connection successful!");
  })
  .on("error", (err) => {
    console.log("redis error", err);
  });

client.connect();

// function to get stored mint data
const getMintData = async (req, res) => {
  const userAddress = req.params.uid;
  let oldDatas = await client.get(userAddress);
  let parsedData = oldDatas ? JSON.parse(oldDatas) : [];
  res.send(parsedData);
};

// function to store mint data
const setMintData = async (req, res) => {
  const { userAddress, recieverAddress, amount } = req.body;
  let oldDatas = await client.get(userAddress);
  let updatedData = oldDatas ? JSON.parse(oldDatas) : [];
  updatedData.push({ address: recieverAddress, amount: amount }),
    await client.set(userAddress, JSON.stringify(updatedData));
  let a = await client.get(userAddress);
  res.status(200).send(a);
};

module.exports = {
  getMintData,
  setMintData,
};

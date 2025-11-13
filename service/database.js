const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const logCollection = db.collection('logs');

// This will asynchronously test the connection and exit the process if it fails, for testing hehe
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

// log takes the form of "id":____, "name":___, "hours":___
async function addLog(log) {
  return logCollection.insertOne(log);
}

async function getLogs(userEmail) {
  const query = { userEmail: userEmail};
  const cursor = logCollection.find(query);
  const logs = await cursor.toArray();
  return logs;
}

async function updateLog(log){
  return await logCollection.updateOne(
    {id: log.id, userEmail: log.userEmail},
    {$set: {name: log.name, hours: log.hours}}
  )
}

async function getLeaderboard() {
  const result = await logCollection.aggregate([
    {
      $sort: { hours: -1 }
    },
    {
      $group: {
        _id: '$userEmail',
        maxHours: { $first: '$hours' },
        skillName: { $first: '$name' }
      }
    },
    {
      $sort: { maxHours: -1 }
    },
    {
      $limit: 10
    },
    {
      $project: {
        _id: 0,
        userEmail: '$_id',
        hours: '$maxHours',
        name: '$skillName'
      }
    }
  ]).toArray();
  
  return result;
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addLog,
  getLeaderboard,
  getLogs,
  updateLog
};

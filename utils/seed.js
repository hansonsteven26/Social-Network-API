const connection = require('../config/connection');
const Thought = require('../models/Thoughts');
const User = require('../models/User');
const { getRandomUser, getRandomEmail, getRandomThoughts} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];
  const thoughts = getRandomThoughts(10);

  for (let index = 0; index < 20; index++) {
    const username = getRandomUser();
    const email = getRandomEmail();

    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
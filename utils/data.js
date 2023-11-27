// chatgpt generated the users, emails, reactions, and thoughts
const users = [
  'QuantumJester',
  'LunarSpectre',
  'BlazePioneer',
  'CelestialWhisper',
  'NebulaNomad',
  'PhoenixRhythm',
  'MysticByte',
  'RadiantEcho',
  'CipherGazer',
  'VelvetVortex'
];

const emails = [
  'QuantumJester@email.com',
  'LunarSpectre@email.com',
  'BlazePioneer@email.com',
  'CelestialWhisper@email.com',
  'NebulaNomad@email.com',
  'PhoenixRhythm@email.com',
  'MysticByte@email.com',
  'RadiantEcho@email.com',
  'CipherGazer@email.com',
  'VelvetVortex@email.com'
];

const thoughts = [
  "Wow, this is absolutely stunning! 😍",
  "I can't believe I didn't see this earlier. Mind blown! 🔥",
  "Incredible! How did you even come up with this? 👏",
  "This is the content I live for! Pure genius. 👌",
  "My jaw just hit the floor. Speechless! 😱",
  "Bravo! I need to know the story behind this. Tell us more! 🤔",
  "I can't stop staring at this. It's like art in digital form. 🎨",
  "This just made my day 100 times better. Thank you for sharing! 🌟",
  "Mind officially blown. Is there anything you can't do? 🚀",
  "I wish I could like this a thousand times. Absolutely amazing! ❤️"
];

const reactions = [
  'Impressive!',
  'Wow!',
  'Epic!',
  'Awesome!',
  'Fantastic!',
  'Incredible!',
  'Amazing!',
  'Brilliant!',
  'Stunning!',
  'Mind-blowing!'
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () => getRandomArrItem(users);

const getRandomEmail = () => getRandomArrItem(emails)

const getRandomThoughts = (int) => {
  let thoughtsArray = [];
  for (let index = 0; index < int; index++) {
    thoughtsArray.push({
      thoughtText: getRandomArrItem(thoughts),
      username: getRandomUser(),
      reactions: [...getReaction(3)] 
    });
  }
  return thoughtsArray;
};

const getReaction = (int) => {
  if (int == 1) {
    return getRandomArrItem(reactions);
  }
  let reactionArray = []
  for (let index = 0; index < int; index++) {
    reactionArray.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomUser()
    });
  }
  return reactionArray;
}

module.exports = { getRandomUser, getRandomThoughts, getRandomEmail };
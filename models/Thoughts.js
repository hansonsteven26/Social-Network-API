const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: format,
    },
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: format,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

function setTwoDigits(num) {
  let twoDigits = num.toString().padStart(2, '0');
  return twoDigits;
}

function format(date) {
  return (
    [
      setTwoDigits(date.getMonth() + 1), // because January returns 0
      setTwoDigits(date.getDate()), // day
      date.getFullYear(),
    ].join('/') + ' ' + // put them together separated by a /
    [
      setTwoDigits(date.getHours()),
      setTwoDigits(date.getMinutes()),
      setTwoDigits(date.getSeconds()),
    ].join(':') // separate them with a :
  );
}
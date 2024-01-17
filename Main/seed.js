// seed.js

const mongoose = require('mongoose');
const { User, Thought } = require('./models');

mongoose.connect('mongodb://127.0.0.1:27017/socialmedia');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create users
    const user1 = await User.create({
      username: 'user1',
      email: 'user1@example.com',
    });

    const user2 = await User.create({
      username: 'user2',
      email: 'user2@example.com',
    });

    // Create thoughts
    const thought1 = await Thought.create({
      thoughtText: 'This is a sample thought from user1.',
      username: user1.username,
    });

    const thought2 = await Thought.create({
      thoughtText: 'Another thought, but this time from user2.',
      username: user2.username,
    });

    // Add reactions to thoughts
    await Thought.findByIdAndUpdate(
      thought1._id,
      {
        $push: {
          reactions: {
            reactionBody: 'Interesting!',
            username: user2.username,
          },
        },
      },
      { new: true }
    );

    await Thought.findByIdAndUpdate(
      thought2._id,
      {
        $push: {
          reactions: {
            reactionBody: 'I agree!',
            username: user1.username,
          },
        },
      },
      { new: true }
    );

    console.log('Seed data successfully added to the database.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();

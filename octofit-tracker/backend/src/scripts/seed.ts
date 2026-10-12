import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { activity } from '../models/activity.js';
import { leaderboard } from '../models/leaderboard.js';
import { team } from '../models/team.js';
import { user } from '../models/user.js';
import { workout } from '../models/workout.js';

const sampleUsernames = ['maya.chen', 'jordan.rivera', 'alex.morgan'];
const sampleTeamNames = ['Trail Blazers', 'Power Octopi'];
const sampleWorkoutTitles = ['Easy Park Run', 'Full-body Strength Circuit', 'Weekend Trail Ride'];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    const previousUsers = await user.find({ username: { $in: sampleUsernames } }).select('_id');
    const previousUserIds = previousUsers.map(({ _id }) => _id);
    await Promise.all([
      user.deleteMany({ username: { $in: sampleUsernames } }),
      team.deleteMany({ name: { $in: sampleTeamNames } }),
      activity.deleteMany({ user: { $in: previousUserIds } }),
      leaderboard.deleteMany({ user: { $in: previousUserIds } }),
      workout.deleteMany({ title: { $in: sampleWorkoutTitles } }),
    ]);

    const users = await user.insertMany([
      {
        username: 'maya.chen',
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        age: 16,
        fitnessLevel: 'intermediate',
      },
      {
        username: 'jordan.rivera',
        name: 'Jordan Rivera',
        email: 'jordan.rivera@example.com',
        age: 17,
        fitnessLevel: 'beginner',
      },
      {
        username: 'alex.morgan',
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        age: 16,
        fitnessLevel: 'advanced',
      },
    ]);

    const teams = await team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'A team that enjoys outdoor runs and exploring local trails.',
        members: [users[0]._id, users[1]._id],
        points: 320,
      },
      {
        name: 'Power Octopi',
        description: 'A team focused on strength, consistency, and supporting each other.',
        members: [users[2]._id],
        points: 245,
      },
    ]);

    await user.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { team: teams[1]._id } } },
    ]);

    await activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 32,
        distanceKm: 4.8,
        calories: 290,
        points: 120,
        completedAt: new Date('2026-10-10T15:30:00.000Z'),
      },
      {
        user: users[1]._id,
        type: 'walking',
        durationMinutes: 45,
        distanceKm: 3.2,
        calories: 180,
        points: 80,
        completedAt: new Date('2026-10-11T16:00:00.000Z'),
      },
      {
        user: users[2]._id,
        type: 'strength training',
        durationMinutes: 40,
        calories: 260,
        points: 135,
        completedAt: new Date('2026-10-11T17:15:00.000Z'),
      },
    ]);

    await leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 185, rank: 1, period: 'October 2026' },
      { user: users[2]._id, team: teams[1]._id, points: 160, rank: 2, period: 'October 2026' },
      { user: users[1]._id, team: teams[0]._id, points: 135, rank: 3, period: 'October 2026' },
    ]);

    await workout.insertMany([
      {
        title: 'Easy Park Run',
        description: 'A relaxed run at a pace that makes it easy to hold a conversation.',
        activityType: 'running',
        durationMinutes: 25,
        difficulty: 'beginner',
        recommendedFor: [users[1]._id],
      },
      {
        title: 'Full-body Strength Circuit',
        description: 'A balanced circuit of bodyweight squats, push-ups, lunges, and planks.',
        activityType: 'strength training',
        durationMinutes: 35,
        difficulty: 'intermediate',
        recommendedFor: [users[0]._id, users[2]._id],
      },
      {
        title: 'Weekend Trail Ride',
        description: 'Build endurance with a steady bike ride on a safe local trail.',
        activityType: 'cycling',
        durationMinutes: 45,
        difficulty: 'intermediate',
        recommendedFor: [users[0]._id, users[1]._id],
      },
    ]);
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();

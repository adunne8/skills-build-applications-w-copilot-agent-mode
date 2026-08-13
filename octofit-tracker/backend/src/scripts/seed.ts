import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Activity.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Alex Rivera',
        email: 'alex.rivera@octofit.dev',
        fitnessLevel: 'intermediate',
        points: 410,
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@octofit.dev',
        fitnessLevel: 'advanced',
        points: 560,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@octofit.dev',
        fitnessLevel: 'beginner',
        points: 220,
      },
      {
        name: 'Sofia Mendes',
        email: 'sofia.mendes@octofit.dev',
        fitnessLevel: 'intermediate',
        points: 375,
      },
      {
        name: 'Jordan Kim',
        email: 'jordan.kim@octofit.dev',
        fitnessLevel: 'advanced',
        points: 640,
      },
    ]);

    await Team.insertMany([
      {
        name: 'Cardio Crew',
        members: [users[0]._id, users[1]._id, users[4]._id],
      },
      {
        name: 'Strength Squad',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 35,
        caloriesBurned: 320,
        performedAt: new Date('2026-08-10T07:10:00.000Z'),
      },
      {
        user: users[0]._id,
        type: 'strength',
        durationMinutes: 45,
        caloriesBurned: 280,
        performedAt: new Date('2026-08-11T18:00:00.000Z'),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        durationMinutes: 50,
        caloriesBurned: 420,
        performedAt: new Date('2026-08-09T06:45:00.000Z'),
      },
      {
        user: users[2]._id,
        type: 'walking',
        durationMinutes: 30,
        caloriesBurned: 150,
        performedAt: new Date('2026-08-10T19:20:00.000Z'),
      },
      {
        user: users[3]._id,
        type: 'strength',
        durationMinutes: 40,
        caloriesBurned: 300,
        performedAt: new Date('2026-08-12T12:00:00.000Z'),
      },
      {
        user: users[4]._id,
        type: 'running',
        durationMinutes: 60,
        caloriesBurned: 540,
        performedAt: new Date('2026-08-12T05:50:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany(
      users.map((user) => ({
        user: user._id,
        points: user.points,
      }))
    );

    await Workout.insertMany([
      {
        user: users[0]._id,
        title: 'Lunch Break Tempo Run',
        difficulty: 'medium',
        exercises: ['5 min warm-up jog', '25 min tempo run', '5 min cooldown walk'],
      },
      {
        user: users[1]._id,
        title: 'Hill Climb Ride',
        difficulty: 'hard',
        exercises: ['10 min spin-up', '6 hill repeats', '10 min recovery spin'],
      },
      {
        user: users[2]._id,
        title: 'Starter Strength Circuit',
        difficulty: 'easy',
        exercises: ['Bodyweight squats', 'Knee push-ups', 'Plank holds'],
      },
      {
        user: users[3]._id,
        title: 'Full Body Dumbbell Day',
        difficulty: 'medium',
        exercises: ['Goblet squats', 'Bent-over rows', 'Overhead press'],
      },
      {
        user: users[4]._id,
        title: '5K Prep Intervals',
        difficulty: 'hard',
        exercises: ['Dynamic warm-up', '8 x 400m intervals', 'Cooldown and stretching'],
      },
    ]);

    const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      LeaderboardEntry.countDocuments(),
      Workout.countDocuments(),
    ]);

    console.log('Seed summary:', {
      users: userCount,
      teams: teamCount,
      activities: activityCount,
      leaderboardEntries: leaderboardCount,
      workouts: workoutCount,
    });

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

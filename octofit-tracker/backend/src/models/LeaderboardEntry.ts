import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export type LeaderboardEntryDocument = InferSchemaType<typeof leaderboardEntrySchema>;

const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
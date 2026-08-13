import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'walking', 'strength', 'cycling', 'other'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    performedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = model('Activity', activitySchema);

export default Activity;
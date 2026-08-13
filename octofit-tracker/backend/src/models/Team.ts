import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    members: [{ type: Types.ObjectId, ref: 'User', default: [] }],
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = model('Team', teamSchema);

export default Team;
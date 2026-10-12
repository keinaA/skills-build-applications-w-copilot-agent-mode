import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;
export const team = mongoose.model('Team', teamSchema);

import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: { type: String, enum: ['running', 'walking', 'strength training', 'cycling'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export const workout = mongoose.model('Workout', workoutSchema);

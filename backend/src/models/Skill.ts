import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  userId: mongoose.Types.ObjectId;
  category: string;
  skills: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      trim: true,
    },
    skills: {
      type: [String],
      required: [true, 'Skills array is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one skill is required',
      },
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient sorting
skillSchema.index({ order: 1 });

export default mongoose.model<ISkill>('Skill', skillSchema);

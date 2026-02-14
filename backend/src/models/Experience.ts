import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  userId: mongoose.Types.ObjectId;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  description: string;
  achievements: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      default: null,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    achievements: {
      type: [String],
      default: [],
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
experienceSchema.index({ order: 1, startDate: -1 });

export default mongoose.model<IExperience>('Experience', experienceSchema);

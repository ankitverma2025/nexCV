import mongoose, { Document, Schema } from 'mongoose';

export interface IEducation extends Document {
  userId: mongoose.Types.ObjectId;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  gpa: string;
  achievements: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const educationSchema = new Schema<IEducation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },
    field: {
      type: String,
      required: [true, 'Field of study is required'],
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
    gpa: {
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
educationSchema.index({ order: 1, startDate: -1 });

export default mongoose.model<IEducation>('Education', educationSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
  image: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, 'Technologies array is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one technology is required',
      },
    },
    link: {
      type: String,
      trim: true,
      default: '',
    },
    github: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
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

// Index for efficient sorting and featured filtering
projectSchema.index({ featured: -1, order: 1 });

export default mongoose.model<IProject>('Project', projectSchema);

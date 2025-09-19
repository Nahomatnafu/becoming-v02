import mongoose from 'mongoose';

const brainCellSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    min: 0,
    max: 89
  },
  color: {
    type: String,
    required: true,
    default: '#e5e7eb',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  note: {
    type: String,
    maxlength: [200, 'Note cannot exceed 200 characters'],
    default: ''
  }
}, { _id: false });

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    maxlength: [100, 'Template name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cells: {
    type: [brainCellSchema],
    validate: {
      validator: function(cells) {
        return cells.length === 90;
      },
      message: 'Template must have exactly 90 cells'
    }
  },
  backgroundColor: {
    type: String,
    default: '#f8fafc',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
  },
  backgroundImage: {
    type: String,
    default: null
  },
  category: {
    type: String,
    enum: ['health', 'productivity', 'learning', 'fitness', 'mindfulness', 'custom'],
    default: 'custom'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  targetDays: {
    type: Number,
    default: 90,
    min: [1, 'Target days must be at least 1'],
    max: [365, 'Target days cannot exceed 365']
  },
  streak: {
    current: {
      type: Number,
      default: 0,
      min: 0
    },
    longest: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  stats: {
    totalCompleted: {
      type: Number,
      default: 0,
      min: 0
    },
    completionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    lastActivity: {
      type: Date,
      default: null
    }
  }
}, {
  timestamps: true
});

// Initialize cells if not provided
templateSchema.pre('save', function(next) {
  if (!this.cells || this.cells.length === 0) {
    this.cells = Array.from({ length: 90 }, (_, i) => ({
      id: i,
      color: '#e5e7eb',
      completed: false,
      completedAt: null,
      note: ''
    }));
  }
  next();
});

// Update stats before saving
templateSchema.pre('save', function(next) {
  if (this.cells && this.cells.length > 0) {
    const completedCells = this.cells.filter(cell => cell.completed);
    this.stats.totalCompleted = completedCells.length;
    this.stats.completionRate = Math.round((completedCells.length / this.cells.length) * 100);
    
    if (completedCells.length > 0) {
      this.stats.lastActivity = new Date();
    }
  }
  next();
});

// Index for better query performance
templateSchema.index({ user: 1, createdAt: -1 });
templateSchema.index({ user: 1, name: 1 });
templateSchema.index({ isPublic: 1, category: 1 });

const Template = mongoose.model('Template', templateSchema);

export default Template;

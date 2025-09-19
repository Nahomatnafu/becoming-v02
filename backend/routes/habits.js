import express from 'express';
import Template from '../models/Template.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/habits/stats
// @desc    Get user's habit statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const templates = await Template.find({ user: req.user.userId });
    
    const stats = {
      totalTemplates: templates.length,
      totalCellsCompleted: 0,
      totalCells: templates.length * 90,
      averageCompletion: 0,
      streaks: {
        current: 0,
        longest: 0
      },
      categories: {}
    };

    templates.forEach(template => {
      stats.totalCellsCompleted += template.stats.totalCompleted;
      stats.streaks.current += template.streak.current;
      stats.streaks.longest = Math.max(stats.streaks.longest, template.streak.longest);
      
      // Count categories
      if (stats.categories[template.category]) {
        stats.categories[template.category]++;
      } else {
        stats.categories[template.category] = 1;
      }
    });

    if (stats.totalCells > 0) {
      stats.averageCompletion = Math.round((stats.totalCellsCompleted / stats.totalCells) * 100);
    }

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

// @route   GET /api/habits/progress/:templateId
// @desc    Get progress data for a specific template
// @access  Private
router.get('/progress/:templateId', auth, async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.templateId,
      user: req.user.userId
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    const completedCells = template.cells.filter(cell => cell.completed);
    const progressData = {
      templateId: template._id,
      templateName: template.name,
      totalCells: template.cells.length,
      completedCells: completedCells.length,
      completionRate: template.stats.completionRate,
      streak: template.streak,
      startDate: template.startDate,
      targetDays: template.targetDays,
      daysElapsed: Math.floor((new Date() - template.startDate) / (1000 * 60 * 60 * 24)),
      lastActivity: template.stats.lastActivity,
      completionHistory: completedCells.map(cell => ({
        cellId: cell.id,
        completedAt: cell.completedAt,
        note: cell.note
      })).sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))
    };

    res.json({
      success: true,
      progress: progressData
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching progress'
    });
  }
});

export default router;

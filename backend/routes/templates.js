import express from 'express';
import { body, validationResult } from 'express-validator';
import Template from '../models/Template.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/templates
// @desc    Get all templates for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const templates = await Template.find({ user: req.user.userId })
      .sort({ updatedAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: templates.length,
      templates
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching templates'
    });
  }
});

// @route   GET /api/templates/:id
// @desc    Get a specific template
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).select('-__v');

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    res.json({
      success: true,
      template
    });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching template'
    });
  }
});

// @route   POST /api/templates
// @desc    Create a new template
// @access  Private
router.post('/', [
  auth,
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Template name must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .optional()
    .isIn(['health', 'productivity', 'learning', 'fitness', 'mindfulness', 'custom'])
    .withMessage('Invalid category'),
  body('backgroundColor')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Invalid background color format'),
  body('targetDays')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('Target days must be between 1 and 365')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const templateData = {
      ...req.body,
      user: req.user.userId
    };

    const template = new Template(templateData);
    await template.save();

    res.status(201).json({
      success: true,
      message: 'Template created successfully',
      template
    });
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating template'
    });
  }
});

// @route   PUT /api/templates/:id
// @desc    Update a template
// @access  Private
router.put('/:id', [
  auth,
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Template name must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('backgroundColor')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Invalid background color format')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const template = await Template.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    res.json({
      success: true,
      message: 'Template updated successfully',
      template
    });
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating template'
    });
  }
});

// @route   PUT /api/templates/:id/cells/:cellId
// @desc    Update a specific cell in a template
// @access  Private
router.put('/:id/cells/:cellId', [
  auth,
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Invalid color format'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
  body('note')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Note cannot exceed 200 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id, cellId } = req.params;
    const cellIdNum = parseInt(cellId);

    if (cellIdNum < 0 || cellIdNum > 89) {
      return res.status(400).json({
        success: false,
        message: 'Cell ID must be between 0 and 89'
      });
    }

    const template = await Template.findOne({
      _id: id,
      user: req.user.userId
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    // Find and update the specific cell
    const cellIndex = template.cells.findIndex(cell => cell.id === cellIdNum);
    if (cellIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Cell not found'
      });
    }

    // Update cell properties
    if (req.body.color !== undefined) {
      template.cells[cellIndex].color = req.body.color;
    }
    
    if (req.body.completed !== undefined) {
      template.cells[cellIndex].completed = req.body.completed;
      template.cells[cellIndex].completedAt = req.body.completed ? new Date() : null;
    }
    
    if (req.body.note !== undefined) {
      template.cells[cellIndex].note = req.body.note;
    }

    await template.save();

    res.json({
      success: true,
      message: 'Cell updated successfully',
      template
    });
  } catch (error) {
    console.error('Update cell error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating cell'
    });
  }
});

// @route   DELETE /api/templates/:id
// @desc    Delete a template
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const template = await Template.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    res.json({
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting template'
    });
  }
});

export default router;

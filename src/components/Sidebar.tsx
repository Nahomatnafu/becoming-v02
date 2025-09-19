import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Settings, Palette, Image } from 'lucide-react';
import ColorPicker from './ColorPicker';

interface Template {
  id: string;
  name: string;
  cells: Array<{ id: number; color: string; completed: boolean }>;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
  currentTemplate: Template | null;
  onTemplateSelect: (template: Template) => void;
  onTemplateAdd: () => void;
  onTemplateRename: (templateId: string, newName: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onBackgroundImageChange: (image: File) => void;
  backgroundColor: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  templates,
  currentTemplate,
  onTemplateSelect,
  onTemplateAdd,
  onTemplateRename,
  onBackgroundColorChange,
  onBackgroundImageChange,
  backgroundColor,
  className = ''
}) => {
  const [editingTemplate, setEditingTemplate] = React.useState<string | null>(null);
  const [editName, setEditName] = React.useState('');

  const handleRename = (templateId: string) => {
    if (editName.trim()) {
      onTemplateRename(templateId, editName.trim());
      setEditingTemplate(null);
      setEditName('');
    }
  };

  const startEditing = (template: Template) => {
    setEditingTemplate(template.id);
    setEditName(template.name);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Habit Templates</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Templates Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700">My Templates</h3>
                <button
                  onClick={onTemplateAdd}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      currentTemplate?.id === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => onTemplateSelect(template)}
                  >
                    {editingTemplate === template.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleRename(template.id);
                            if (e.key === 'Escape') setEditingTemplate(null);
                          }}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={() => handleRename(template.id)}
                          className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">{template.name}</h4>
                          <p className="text-sm text-gray-500">
                            {template.cells.filter(c => c.completed).length}/90 completed
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(template);
                          }}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Settings size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Customization Section */}
            <div className="p-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Customization</h3>
              
              {/* Background Color */}
              <div className="mb-4">
                <label className="flex items-center gap-3 text-sm font-medium text-gray-600 mb-2">
                  <Palette size={16} />
                  Background Color
                </label>
                <ColorPicker
                  color={backgroundColor}
                  onChange={onBackgroundColorChange}
                />
              </div>

              {/* Background Image */}
              <div className="mb-4">
                <label className="flex items-center gap-3 text-sm font-medium text-gray-600 mb-2">
                  <Image size={16} />
                  Background Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onBackgroundImageChange(file);
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;

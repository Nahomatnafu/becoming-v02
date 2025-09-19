import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  presetColors?: string[];
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  presetColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    '#f43f5e', '#64748b', '#374151', '#1f2937'
  ],
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Color trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200"
        style={{ backgroundColor: color }}
        aria-label="Pick a color"
      />

      {/* Color picker dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
          >
            {/* Preset colors */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Colors</h4>
              <div className="grid grid-cols-5 gap-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => {
                      onChange(presetColor);
                      setIsOpen(false);
                    }}
                    className="w-8 h-8 rounded-md border border-gray-300 hover:scale-110 transition-transform duration-150"
                    style={{ backgroundColor: presetColor }}
                    aria-label={`Select color ${presetColor}`}
                  />
                ))}
              </div>
            </div>

            {/* Custom color picker */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Color</h4>
              <HexColorPicker color={color} onChange={onChange} />
            </div>

            {/* Color input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#000000"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close picker */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ColorPicker;

import React, { useState } from 'react';

interface Cell {
  id: number;
  completed: boolean;
}

function App() {
  const [cells, setCells] = useState<Cell[]>(
    Array.from({ length: 90 }, (_, i) => ({ id: i + 1, completed: false }))
  );

  const toggleCell = (id: number) => {
    setCells(cells.map(cell =>
      cell.id === id ? { ...cell, completed: !cell.completed } : cell
    ));
  };

  const completedCount = cells.filter(cell => cell.completed).length;
  const progressPercentage = Math.round((completedCount / 90) * 100);
  const currentDay = completedCount + 1;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Becoming</span>
          </div>

          <nav className="flex space-x-8">
            <a href="#" className="text-blue-600 font-medium">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Templates</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Progress</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Community</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-400 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-normal mb-2">
            Good morning, Jane! ⭐
          </h1>
          <p className="text-purple-100 mb-8">
            You're on day {currentDay} of your transformation journey
          </p>

          <div className="flex justify-center space-x-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 min-w-[120px]">
              <div className="text-2xl font-semibold">{completedCount}</div>
              <div className="text-sm text-purple-100">Days Complete</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 min-w-[120px]">
              <div className="text-2xl font-semibold">{90 - completedCount}</div>
              <div className="text-sm text-purple-100">Days Remaining</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 min-w-[120px]">
              <div className="text-2xl font-semibold">{progressPercentage}%</div>
              <div className="text-sm text-purple-100">Consistency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-center">
          {/* Main Content Area - Brain Visualization */}
          <div className="w-full max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Your 90-Day Brain Transformation
                </h2>
                <p className="text-gray-600">
                  Click on areas of the brain to mark days complete and watch your progress grow
                </p>
              </div>

              {/* Brain SVG Container */}
              <div className="flex justify-center">
                <img
                  src="/Brain-Main.svg"
                  alt="Brain Transformation"
                  className="w-96 h-96 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

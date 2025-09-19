import React, { useState } from 'react';

interface Cell {
  id: number;
  completed: boolean;
}

function App() {
  const [cells, setCells] = useState<Cell[]>(
    Array.from({ length: 90 }, (_, i) => ({ id: i + 1, completed: false }))
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
      >
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${sidebarOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 pt-20">
          {/* Current Habit Card */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Current Habit</h3>
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg p-4 text-white">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm opacity-90">Day {currentDay} of 90</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium">Morning Workout</h4>
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>



          {/* My Templates */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">My Templates</h3>
              <button className="text-blue-600 hover:text-blue-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Morning Workout</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Daily Reading</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Meditation</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-gray-700">Journaling</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

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

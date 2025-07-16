import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="relative mb-8">
        {/* Floating icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-8xl animate-bounce" style={{ animationDelay: '0s' }}>📝</div>
          <div className="absolute text-4xl animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
          <div className="absolute text-3xl animate-pulse" style={{ animationDelay: '2s' }}>🚀</div>
        </div>
        
        {/* Main icon */}
        <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
          🎯
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">
        Ready to get organized?
      </h3>
      
      <p className="text-purple-200 text-lg mb-6 max-w-md mx-auto">
        Start by adding your first task. Every great achievement begins with a single step!
      </p>
      
      {/* Animated dots */}
      <div className="flex justify-center gap-2 mb-6">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
      
      <div className="text-sm text-purple-300">
        <p className="mb-2">💡 <span className="gradient-text">Pro tip:</span> Start with small, achievable tasks</p>
        <p>🎉 <span className="gradient-text">Coming soon:</span> AI-powered task suggestions</p>
      </div>
    </div>
  );
};

export default EmptyState; 